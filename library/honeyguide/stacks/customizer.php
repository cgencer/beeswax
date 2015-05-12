<?php
return new stacks_customizer();

class stacks_customizer {

	protected $theParent;
	public $themeBlocks;
	private $pri = 45;
	private $mePath;
	private $stacksPath;
	private $stacksUrl;
	private $vendorsPath;
	private $vendorsUrl;
	private $stackMeta;
	private $enabledStacks;

	public function saveRef($id) {
		$this->theParent = $id;
	}

	public function __construct() {
		add_action('customize_preview_init', array($this, 'honeyguide_stacks_scripts') );
		add_action('customize_register', array($this, 'honeyguide_customize_register'));
		$this->mePath = dirname(dirname(dirname(dirname(__FILE__))));
		$this->vendorsPath = dirname(dirname(__FILE__)) . '/vendor/';
		$this->vendorsUrl = get_template_directory_uri() . '/library/honeyguide/stacks/js/vendor/';
		$this->stacksPath = dirname(dirname(dirname(dirname(__FILE__)))) . '/library/honeyguide/stacks/';
		$this->stacksUrl = get_template_directory_uri() . '/library/honeyguide/stacks/';

		if ( ! class_exists( 'Spyc' ) ) require_once ($this->vendorsPath . '/spyc/Spyc.php');
		$this->stackMeta = Spyc::YAMLLoad(dirname(__FILE__) . '/fields_meta.yaml');
		$this->enabledStacks = Spyc::YAMLLoad(dirname(__FILE__) . '/enabled.yaml')['stacks'];
//		echo('<pre>');var_dump($this->enabledStacks);echo('</pre>');

//		add_action( 'customize_controls_enqueue_scripts', array( $this, 'customize_pane_scripts' ) );
//		add_action( 'customize_preview_init', array( $this, 'customize_preview_init' ) );
	}

	public function getStacks() {
		return $this->theParent->themeBlocks;
	}

	public function get_theme_support() {
		return array(
			'blogname'			=> '.site-title',
			'blogdescription'	=> '.site-description'
		);
	}

	public function customize_preview_init() {
		add_action( 'wp_enqueue_scripts', array( $this, 'customize_preview_scripts' ) );
	}

	public function customize_pane_scripts() {
		wp_enqueue_script('customize-inline-editing-pane', $this->stacksUrl . '/js/customize-pane.js', array('jquery', 'customize-preview'));
		$this->export_script_data('customize-inline-editing-pane', '_CustomizeInlineEditingPane_exports', array(
			'settingElementSelectors' => $this->get_theme_support(),
			'l10n' => array('shiftClickNotice' => __( 'Shift + Click to edit inline.', 'customize-inline-editing' )),
		));
	}

	public function customize_preview_scripts() {
		wp_enqueue_script('customize-inline-editing-preview', $this->stacksUrl() . 'js/customize-preview.js', array('jquery', 'customize-preview'));
		$this->export_script_data('customize-inline-editing-preview', '_CustomizeInlineEditingPreview_exports', array(
			'settingElementSelectors' => $this->get_theme_support(),
			'l10n' => array('shiftClickNotice' => __( 'Shift + Click to edit inline.', 'customize-inline-editing' ))
		));
	}

	public function export_script_data( $handle, $exported_name, $exported_data ) {
		global $wp_scripts;
		$serialized = json_encode( $exported_data );
		$data = sprintf( 'window.%s = %s;', $exported_name, $serialized );
		$wp_scripts->add_data( $handle, 'data', $data );
	}

	public function honeyguide_stacks_scripts() {
		wp_enqueue_script( 'stack-scripts', $this->stacksUrl . 'js/stacks.js', array('jquery', 'customize-preview') );
//		wp_enqueue_script( 'stack-scripts-xeditable', $this->vendorUrl . 'x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js', array('jquery', 'customize-preview') );
//		wp_enqueue_style( 'stack-styles-xeditable', $this->vendorUrl . 'x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css');
	}

	// grabs the dirs out of fields_meta and distributes them into 2 arrays according to the 1st line of each template file
	public function distributeTemplates() {
		$dirs = array();
		$dirs['GROUP'] = array();
		$dirs['ITEM'] = array();
		preg_match_all("/\[DIR\:([\/a-zA-Z0-9]*),FILTER/", file_get_contents($this->stacksPath.'fields_meta.yaml'), $m);

		$fn = $this->mePath . array_unique($m[1])[0];

		foreach (scandir($fn) as $file) {
			if ('.' === $file || '..' === $file || '.DS_Store' === $file) continue;
			$n = array();
			preg_match('/\{{2}\![isa]+:([GROUP|ITEM]+)\}{2}/', file($fn . '/' . $file)[0], $n);
			if( is_string($n[1]) )
				if('GROUP' == $n[1] || 'ITEM' == $n[1])
					array_push($dirs[$n[1]], pathinfo($file, PATHINFO_FILENAME));												
		}
		return($dirs);
	}

	public function honeyguide_customize_register($wp_customize){

		$wp_customize->add_section(
			'stacks-section', array(
				'title'			=> __("Stacks", 'honeyguide'),
				'capability'	=> 'edit_theme_options',
				'priority'		=> $this->pri++,
				'description'	=> __("Allows you to edit your theme's stacks.", 'honeyguide')
		));

		$dr = $this->distributeTemplates();
//		echo('<pre>');var_dump($dr);echo('</pre>');


		foreach ($this->enabledStacks as $v) {
			$fs = (file_exists($this->stacksPath . 'depot/' . $v . '/fieldset.yaml')) ? 
				Spyc::YAMLLoad($this->stacksPath . 'depot/' . $v . '/fieldset.yaml') : array();

			$wp_customize->add_section(
				'stacks_'.$v, array(
					'title'			=> "stack: ".$v,
					'capability'	=> 'edit_theme_options',
					'priority'		=> $this->pri++,
			));


			if(count($fs) > 0){
				foreach ($fs as $fse=>$fsk) {
					foreach ($fsk['fields'] as $kk=>$ll) {


						$wp_customize->add_setting(
							'stacks_'.$v.'_options['.$ll['id'].']', array(
								'capability'	=> 'edit_theme_options',
								'type'			=> 'option',
						));

						$add = (!$this->stackMeta['template'][$kk]['source']) ? array() : ('ITEM' == $filter) ? $dr['ITEM'] : $dr['GROUP'];

						$wp_customize->add_control(
							'stacks_'.$v.'_options_'.$ll['id'], array_merge(array(), array(
								'label'			=> $ll['name'],
								'settings'		=> 'stacks_'.$v.'_options['.$ll['id'].']',
								'section'		=> 'stacks_'.$v,
								'type'			=> $ll['type']
							))
						);


					}
				}
			}


		}


	}
}