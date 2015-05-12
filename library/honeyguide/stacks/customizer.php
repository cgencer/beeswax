<?php
return new stacks_customizer();

class stacks_customizer {

	protected $theParent;
	public $themeBlocks;
	private $pri = 45;
	private $me;
	private $vendors;
	private $vendorsUrl;
	private $stackMeta;
	private $enabledStacks;

	public function saveRef($id) {
		$this->theParent = $id;
	}

	public function __construct() {
		add_action('customize_preview_init', array($this, 'honeyguide_stacks_scripts') );
		add_action('customize_register', array($this, 'honeyguide_customize_register'));
		$this->me = dirname(dirname(dirname(dirname(__FILE__))));
		$this->vendors = dirname(dirname(__FILE__)) . '/vendor';
		$this->vendorsUrl = get_template_directory_uri() . '/library/honeyguide/stacks/js/vendor/';
		$this->stacksUrl = get_template_directory_uri() . '/library/honeyguide/stacks/';

		if ( ! class_exists( 'Spyc' ) ) require_once ($this->vendors . '/spyc/Spyc.php');
		$this->stackMeta = Spyc::YAMLLoad(dirname(__FILE__) . '/fields_meta.yaml');
		$this->enabledStacks = Spyc::YAMLLoad(dirname(__FILE__) . '/enabled.yaml');

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
		wp_enqueue_script('customize-inline-editing-preview', $this->stacksUrl() . '/js/customize-preview.js', array('jquery', 'customize-preview'));
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
		wp_enqueue_script( 'stack-scripts', $this->stacksUrl . '/js/stacks.js', array('jquery', 'customize-preview') );
//		wp_enqueue_script( 'stack-scripts-xeditable', $this->vendorUrl . '/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js', array('jquery', 'customize-preview') );
//		wp_enqueue_style( 'stack-styles-xeditable', $this->vendorUrl . '/x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css');
	}

	// grabs the dirs out of fields_meta and distributes them into 2 arrays according to the 1st line of each template file
	public function distributeTemplates() {
		$dirs = array();
		$dirs['GROUP'] = array();
		$dirs['ITEM'] = array();
		preg_match_all("/\[DIR\:([\/a-zA-Z0-9]*),FILTER/", file_get_contents(dirname(__FILE__) . '/fields_meta.yaml'), $m);

		$fn = $this->me . array_unique($m[1])[0];
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

//		$arr = $this->theParent->themeBlocks;
		$dearr = array();

		$dr = $this->distributeTemplates();

		foreach ($this->enabledStacks as $v) {
			array_push($dearr, $v);

			$wp_customize->add_section(
				'stacks_'.$v, array(
					'title'			=> "stack: ".$v,
					'capability'	=> 'edit_theme_options',
					'priority'		=> $this->pri++,
			));

			if(file_exists(dirname(__FILE__) . '/admin/' . $v . '.php')) {
				$stackAtr = require_once(dirname(__FILE__) . '/admin/' . $v . '.php');
				if($stackMeta[$v]){
					foreach ($stackMeta[$v] as $tmpK => $tmpV) {

						$wp_customize->add_setting(
							'stacks_'.$v.'_options['.$tmpK.']', array(
								'capability'	=> 'edit_theme_options',
								'type'			=> 'option',
								'default'		=> $tmpV,
						));

						// if source is available, it is 2-way select-list, use the appr. array otherwise use a blank array anyway
						$add = (!$stackMeta['template'][$tmpK]['source']) ? array() : ('ITEM' == $filter) ? $dr['ITEM'] : $dr['GROUP'];

						$wp_customize->add_control(
							'stacks_'.$v.'_options_'.$stackMeta['template'][$tmpK]['type'].'_['.$tmpK.']', array_merge($add, array(
								'label'			=> $tmpK,
								'settings'		=> 'stacks_'.$v.'_options['.$tmpK.']',
								'section'		=> 'stacks_'.$v,
								'type'			=> $stackMeta['template'][$tmpK]['type']
							))
						);


					}
				}
			}
		}


	}
}