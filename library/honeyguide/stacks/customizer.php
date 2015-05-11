<?php
return new stacks_customizer();

class stacks_customizer {

	protected $theParent;
	public $themeBlocks;
	private $pri = 45;

	public function saveRef($id) {
		$this->theParent = $id;
	}

	public function __construct() {
		add_action('customize_preview_init', array($this, 'honeyguide_stacks_scripts') );
		add_action('customize_register', array($this, 'honeyguide_customize_register'));

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
		wp_enqueue_script('customize-inline-editing-pane', get_template_directory_uri() . '/library/honeyguide/stacks/js/customize-pane.js', array('jquery', 'customize-preview'));
		$this->export_script_data('customize-inline-editing-pane', '_CustomizeInlineEditingPane_exports', array(
			'settingElementSelectors' => $this->get_theme_support(),
			'l10n' => array('shiftClickNotice' => __( 'Shift + Click to edit inline.', 'customize-inline-editing' )),
		));
	}

	public function customize_preview_scripts() {
		wp_enqueue_script('customize-inline-editing-preview', get_template_directory_uri() . '/library/honeyguide/stacks/js/customize-preview.js', array('jquery', 'customize-preview'));
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
		wp_enqueue_script( 'stack-scripts', get_template_directory_uri() . '/library/honeyguide/stacks/js/stacks.js', array('jquery', 'customize-preview') );
//		wp_enqueue_script( 'stack-scripts-xeditable', get_template_directory_uri() . '/library/honeyguide/stacks/js/vendor/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js', array('jquery', 'customize-preview') );
//		wp_enqueue_style( 'stack-styles-xeditable', get_template_directory_uri() . '/library/honeyguide/stacks/js/vendor/x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css');
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
		$arr = array('header', 'services', 'item_services', 'banners', 'team', 'counter');
		$dearr = array();
		foreach ($arr as $v) {
			$dearr[$v] = $v;
			$wp_customize->add_section(
				'stacks_'.$v, array(
					'title'			=> "stack: ".$v,
					'capability'	=> 'edit_theme_options',
					'priority'		=> $this->pri++,
			));

		if ( ! class_exists( 'Spyc' ) ) require_once (dirname(dirname(__FILE__)).'/vendor/spyc/Spyc.php');

		$stackMeta = Spyc::YAMLLoad(dirname(__FILE__) . '/fields_meta.yaml');

			if(file_exists(dirname(__FILE__) . '/admin/' . $v . '.php')) {
				$stackAtr = require_once(dirname(__FILE__) . '/admin/' . $v . '.php');
				if($stackAtr['template']){
					foreach ($stackAtr['template'] as $tmpK => $tmpV) {

						$wp_customize->add_setting(
							'stacks_'.$v.'_options['.$tmpK.']', array(
								'capability'	=> 'edit_theme_options',
								'type'			=> 'option',
								'default'		=> $tmpV,
						));
						// if source is a DIR command:
						if ('array' == gettype($stackMeta['template'][$tmpK]['source']) && "DIR" == substr($stackMeta['template'][$tmpK]['source'][0], 0, 3)) {

							// filter files into proper pulldown trough FILTER:
							$filter = ('FILTER' == substr($stackMeta['template'][$tmpK]['source'][1], 0, 6)) ? substr($stackMeta['template'][$tmpK]['source'][1], 7) : "";

							$path = dirname(dirname(dirname(dirname(__FILE__)))) . substr($stackMeta['template'][$tmpK]['source'][0], 4);
							$addG = array('choices'=>array());
							$addI = array('choices'=>array());
							if (is_dir($path)) {
								foreach (scandir($path) as $file) {
									if ('.' === $file || '..' === $file || '.DS_Store' === $file) continue;
									if ('select' == $stackMeta['template'][$tmpK]['type'])
										$m = array();
										preg_match('/\{{2}\![isa]+:([GROUP|ITEM]+)\}{2}/', file($path . '/' . $file)[0], $m);
										if('GROUP' == $m[1])
											array_push($addG['choices'], pathinfo($file, PATHINFO_FILENAME));											
										if('ITEM' == $m[1])
											array_push($addI['choices'], pathinfo($file, PATHINFO_FILENAME));											
								}
							}
						}
						// if source is available, it is 2-way select-list, use the appr. array otherwise use a blank array anyway
						$add = (!$stackMeta['template'][$tmpK]['source']) ? array() : ('ITEM' == $filter) ? $addI : $addG;

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