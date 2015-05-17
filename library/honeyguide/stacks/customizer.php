<?php
return new stacks_customizer();

class stacks_customizer {

	protected $theParent;
	public $themeBlocks;
	private $pri = 45;
	private $templates;
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
		$this->mePath = dirname(dirname(dirname(dirname(__FILE__))));
		$this->vendorsPath = dirname(dirname(__FILE__)) . '/vendor/';
		$this->vendorsUrl = get_template_directory_uri() . '/library/honeyguide/stacks/js/vendor/';
		$this->stacksPath = dirname(dirname(dirname(dirname(__FILE__)))) . '/library/honeyguide/stacks/';
		$this->stacksUrl = get_template_directory_uri() . '/library/honeyguide/stacks/';

		require_once(dirname($this->stacksPath) . '/customizer_customcontrols.php');
		require_once($this->stacksPath . 'custom-controls/customizer_layoutpicker.php');
		$files = glob($this->vendorsPath . 'customizer-custom-controls/*.php');
		foreach ($files as $file) {
			require_once($file);
		}
		require_once($this->vendorsPath . 'wpthemecustomizer-custom-controls/select/google-font-dropdown-custom-control.php');

		add_action('customize_preview_init', array(&$this, 'honeyguide_stacks_scripts') );
		add_action('customize_register', array(&$this, 'honeyguide_customize_register'));

		if ( ! class_exists( 'Spyc' ) ) require_once ($this->vendorsPath . '/spyc/Spyc.php');
		$this->enabledStacks = Spyc::YAMLLoad(dirname(__FILE__) . '/enabled.yaml')['stacks'];

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
		foreach (scandir($this->stacksPath . 'depot/') as $names) {
			if ('.' === $names || '..' === $names || '.DS_Store' === $names) continue;
			if(is_dir($this->stacksPath . 'depot/' . $names)) {
				$files = glob($this->stacksPath . 'depot/' . $names . '/*.js');
				foreach ($files as $file) {
					wp_enqueue_script( 'stack-scripts-' . $names . '-' . pathinfo($file, PATHINFO_FILENAME), $this->stacksUrl . 'depot/' . $names . '/' . pathinfo($file, PATHINFO_FILENAME) . '.' . pathinfo($file, PATHINFO_EXTENSION), array('jquery', 'customize-preview') );
				}
			}
		}
	}

	// grabs the dirs out of fields_meta and distributes them into 2 arrays according to the 1st line of each template file
	public function distributeTemplates() {
		$dirs = array();
		$dirs['COLLECTIONS'] = array();
		$dirs['ITEMS'] = array();
		$dirs['PANELS'] = array();
		$dirs['STACKS'] = array();
		$tra = array();
		$flat = array();

		foreach (scandir($this->stacksPath . 'depot/') as $names) {
			if ('.' === $names || '..' === $names || '.DS_Store' === $names) continue;
			if(is_dir($this->stacksPath . 'depot/' . $names)) {

				//load the template file... if it has ISA command dristribute its name into COLLECTIONS or ITEMS
				$files = glob($this->stacksPath . 'depot/' . $names . '/*.tpl');
				foreach ($files as $file) {
					$n = array();
					preg_match('/\{{2}\!isa+:([COLLECTION|ITEM]+)\}{2}/', file($file)[0], $n);
					if( is_string($n[1]) )
						if('COLLECTION' == $n[1] || 'ITEM' == $n[1])
//							array_push($dirs[$n[1].'S'], $names . '/' . pathinfo($file, PATHINFO_FILENAME));
							$dirs[$n[1].'S'][$names . '/' . pathinfo($file, PATHINFO_FILENAME)] = $names . '/' . pathinfo($file, PATHINFO_FILENAME);
							$dirs['STACKS'][$names] = ucwords($names);
				}

				if(file_exists($this->stacksPath . 'depot/' . $names . '/panel.yaml'))
				$dirs['PANELS'][$names] = (file_exists($this->stacksPath . 'depot/' . $names . '/panel.yaml')) ?
					Spyc::YAMLLoad($this->stacksPath . 'depot/' . $names . '/panel.yaml') : array();

				if(is_array($dirs['PANELS'][$names]))
					array_walk_recursive($dirs['PANELS'][$names], function($val, $key) use (&$flat) {
						$flat[] = $key;
						$flat[] = $val;
					});
			}
		}
		return($dirs);
	}

	public function honeyguide_customize_register($wp_customize){

		$this->templates = $this->distributeTemplates();

		$wp_customize->add_section(
			'stacks', array(
				'title'			=> "Stacks",
				'capability'	=> 'edit_theme_options',
				'priority'		=> $this->pri++,
				'description'	=> __("Allows you to edit your theme's stacks.", 'honeyguide')
		));

		$wp_customize->add_setting(
			'stacks-options-page', array(
			'capability'	=> 'edit_theme_options',
			'type'			=> 'option',
		));

		$wp_customize->add_control(
			'stacks_options_addToPage', array_merge( array(
				'label'			=> "Select a page to add stacks to",
				'settings'		=> 'stacks-options-page',
				'section'		=> 'stacks',
				'type'			=> 'select'
			), array('choices' => array('front' => 'Front Page')))
		);

		$wp_customize->add_setting(
			'stacks-options-settings', array(
			'capability'	=> 'edit_theme_options',
			'type'			=> 'option',
		));

		$wp_customize->add_control(
			'stacks_options_addStack', array_merge( array(
				'label'			=> "Select a stack to be added",
				'settings'		=> 'stacks-options-settings',
				'section'		=> 'stacks',
				'type'			=> 'select'
			), array('choices' => $this->templates['STACKS']))
		);

		$wp_customize->add_setting(
			'stacks-enabled', array(
			'capability'	=> 'edit_theme_options',
			'type'			=> 'option',
		));

		$wp_customize->add_control(
			'stacks_options_enabledStacks', array_merge( array(
				'label'			=> "Enabled stacks",
				'settings'		=> 'stacks-enabled',
				'section'		=> 'stacks',
				'type'			=> 'multiselect'
			), array('choices' => array()))
		);

//		echo('<pre>');var_dump($dr);echo('</pre>');

		foreach ($this->enabledStacks as $v) {

			$fs = (file_exists($this->stacksPath . 'depot/' . $v . '/fieldset.yaml')) ? 
				Spyc::YAMLLoad($this->stacksPath . 'depot/' . $v . '/fieldset.yaml') : null;

			$sp = (file_exists($this->stacksPath . 'depot/' . $v . '/panel.yaml')) ?
				Spyc::YAMLLoad($this->stacksPath . 'depot/' . $v . '/panel.yaml') : null;

			$wp_customize->add_section(
				'stacks_'.$v, array(
					'title'			=> "stack: ".$v,
					'capability'	=> 'edit_theme_options',
					'priority'		=> $this->pri++,
			));

			if($sp){
				if(array_keys($sp)[0]==$v) {		// first line of yaml matches the template dir name

					$custTypes = array('layout', 'tags', 'taxonomy', 'posts', 'posttypes', 'googlefonts', 'datepicker');
					ccc($wp_customize, $sp, $v, $custTypes);

					foreach ($sp[$v] as $fieldKey => $fieldData) {

						if(!in_array($fieldKey, $custTypes)) {

							$wp_customize->add_setting(
								'stacks_'.$v.'_options['.$fieldKey.']', array(
									'capability'	=> 'edit_theme_options',
									'type'			=> 'option',
									'default'		=> $fieldData['default'],
							));

							$filter = explode(':', $fieldData['source'][1]); $filter = $filter[1];
							$SelectOptions = ('select' != $fieldData['type']) ? 
								array() : ('ITEM' == $filter) ? 
									array('choices'=>$this->templates['ITEMS']) : array('choices'=>$this->templates['COLLECTIONS']);

							$wp_customize->add_control(
								'stacks_'.$v.'_options_fields_'.$fieldKey, array_merge(array(
									'label'			=> $fieldData['label'],
									'settings'		=> 'stacks_'.$v.'_options['.$fieldKey.']',
									'section'		=> 'stacks_'.$v,
									'type'			=> $fieldData['type']
								), $SelectOptions)
							);
						}
					}
				}
			}
		}
	}
}