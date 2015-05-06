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
		$arr = array('header', 'services', 'banners', 'team', 'counter');
		$dearr = array();
		foreach ($arr as $v) {
			$dearr[$v] = $v;
			$wp_customize->add_section(
				'stacks_'.$v, array(
					'title'			=> "stack: ".$v,
					'capability'	=> 'edit_theme_options',
					'priority'		=> $this->pri++,
			));

			$wp_customize->add_setting(
				'stacks_'.$v.'_options[enable]', array(
					'capability'	=> 'edit_theme_options',
					'type'			=> 'option',
					'default'		=> '1',
			));

			$wp_customize->add_control(
				'stacks_'.$v.'_options[enable]', array(
					'label'			=> 'stack editing',
					'section'		=> 'stacks_'.$v,
					'type'			=> 'text',
			));

		}

		$wp_customize->add_setting(
			'stacks_options[addStack]', array(
				'capability'	=> 'edit_theme_options',
				'type'			=> 'option',
				'default'		=> '1',
		));


		$wp_customize->add_control(
			'stacks_options[addStack]', array(
				'label'			=> __("Add a stack:", 'honeyguide'),
				'section'		=> 'stacks_section',
				'type'			=> 'select',
				'choices'		=> $dearr
		));

		$wp_customize->add_setting(
			'stacks_options[text]', array(
				'capability'	=> 'edit_theme_options',
				'type'			=> 'option',
				'default'		=> 'Custom text',
		));
		
		$wp_customize->add_control(
			'stacks_options[text]', array(
				'label'			=> 'Custom text',
				'section'		=> 'stacks_section',
				'type'			=> 'text',
		));

	}
}