<?php
return new stacks_customizer();

class stacks_customizer {

	protected $theParent;
	public $themeBlocks;
	private $pri = 45;
	private $templates;
	private $dasModel;
	public $stackMenu;

	private $stackMeta;

	public function saveRef($id) {
		$this->theParent = $id;
		$this->dasModel = $this->theParent->dasModel;

		$this->loadStuff();

		add_action('customize_preview_init', array(&$this, 'honeyguide_stacks_scripts') );
		add_action('customize_register', array(&$this, 'honeyguide_customize_register'));
//		add_action('customize_controls_enqueue_scripts', array('CustomizeControl_stackList', 'live_preview') ); 
	}

	public function cCommCtrlInit() {
        wp_register_script('honeyguide-cCommCtrl', $this->dasModel->stacksUrl . 'js/cCommController.js', array('customize-controls'));
        wp_enqueue_script('honeyguide-cCommCtrl');
	}

	public function cCommPrvwInit() {
        wp_register_script('honeyguide-cCommPrvw', $this->dasModel->stacksUrl . 'js/cCommPreviewer.js', array('customize-preview-widgets'));
        wp_enqueue_script('honeyguide-cCommPrvw');
	}

	public function loadStuff() {
		require_once($this->dasModel->stacksPath . 'customizer_customcontrols.php');
		require_once($this->dasModel->stacksPath . 'custom-controls/customizer_layoutpicker.php');
		foreach (glob($this->dasModel->vendorsPath . 'customizer-custom-controls/*.php') as $file) {
			require_once($file);
		}

		add_action('customize_controls_enqueue_scripts', array($this, 'cCommCtrlInit'));
		add_action('wp_enqueue_scripts', array($this, 'cCommPrvwInit'));

		foreach(glob($this->dasModel->vendorsPath . 'Honeyguide_WPCustomControls/*', GLOB_ONLYDIR) as $f) {
			if('vendor' != substr($f, -6)) {
				foreach (glob($f . '/class_*.php') as $file) {
					require_once($file);
//					if(method_exists(__CLASS__, 'do_enqueue'))
//						add_action('customize_controls_enqueue_scripts', array(__CLASS__, 'do_enqueue'));


/*
					$r = require_once($file);
					if(method_exists($r, 'live_preview'))
						add_action('customize_controls_enqueue_scripts', array($r->className, 'live_preview') );
					if(method_exists($r, 'admin_panels'))
						add_action('customize_controls_enqueue_scripts', array($r->className, 'admin_panels') );
*/
				}
			}
		}
	}

	public function __construct() {
//		add_action( 'customize_controls_enqueue_scripts', array( $this, 'customize_pane_scripts' ) );
//		add_action( 'customize_preview_init', array( $this, 'customize_preview_init' ) );
	}


	public function getStacks() {
		return $this->dasModel->stackedPages;
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
		wp_enqueue_script('customize-inline-editing-pane', $this->dasModel->stacksUrl . '/js/customize-pane.js', array('jquery', 'customize-preview'));
		$this->export_script_data('customize-inline-editing-pane', '_CustomizeInlineEditingPane_exports', array(
			'settingElementSelectors' => $this->get_theme_support(),
			'l10n' => array('shiftClickNotice' => __( 'Shift + Click to edit inline.', 'customize-inline-editing' )),
		));
	}

	public function customize_preview_scripts() {
		wp_enqueue_script('customize-inline-editing-preview', $this->dasModel->stacksUrl() . 'js/customize-preview.js', array('jquery', 'customize-preview'));
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
		wp_enqueue_script( 'stack-scripts', $this->dasModel->stacksUrl . 'js/stacks.js', array('jquery', 'customize-preview') );
//		wp_enqueue_script( 'stack-scripts-xeditable', $this->vendorUrl . 'x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js', array('jquery', 'customize-preview') );
//		wp_enqueue_style( 'stack-styles-xeditable', $this->vendorUrl . 'x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css');
		foreach (scandir($this->dasModel->stacksPath . 'depot/') as $names) {
			if ('.' === $names || '..' === $names || '.DS_Store' === $names) continue;
			if(is_dir($this->dasModel->stacksPath . 'depot/' . $names)) {
				$files = glob($this->dasModel->stacksPath . 'depot/' . $names . '/*.js');
				foreach ($files as $file) {
					wp_enqueue_script( 'stack-scripts-' . $names . '-' . pathinfo($file, PATHINFO_FILENAME), $this->stacksUrl . 'depot/' . $names . '/' . pathinfo($file, PATHINFO_FILENAME) . '.' . pathinfo($file, PATHINFO_EXTENSION), array('jquery', 'customize-preview') );
				}
			}
		}
	}

	// grabs the dirs out of fields_meta and distributes them into 2 arrays according to the 1st line of each template file
	public function honeyguide_customize_register($wp_customize){

      // We can also change built-in settings by modifying properties. For instance, let's make some stuff use live preview JS...
      // $wp_customize->get_setting( 'blogname' )->transport = 'postMessage';
      // $wp_customize->get_setting( 'blogdescription' )->transport = 'postMessage';

		$this->templates = $this->dasModel->distributeTemplates();

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

//		echo('<pre>');var_dump($this->templates);echo('</pre>');

		$wp_customize->add_control(
			'stacks_options_addToPage', array_merge( array(
				'label'			=> "Select a page to add stacks to",
				'settings'		=> 'stacks-options-page',
				'section'		=> 'stacks',
				'type'			=> 'select'
			), array('choices' => array(
				'front' => 'Front Page'
			)))
		);

		$wp_customize->add_setting(
			'stacks-options-addedStacks', array(
			'capability'	=> 'edit_theme_options',
			'type'			=> 'option',
//			'transport' 	=> 'postMessage',
			'default'		=> array()
		));

		$vv = array();
		foreach (array_keys($this->templates['PARAM']) as $vvv) $vv[$vvv] = $vvv;

		$stackIcons = array(
			'banner_full'	=>	'fa-caret-square-o-right',
			'banner_half'	=>	'fa-caret-square-o-right',
			'counter'		=>	'fa-caret-square-o-right',
			'header'		=>	'fa-caret-square-o-right',
			'services'		=>	'fa-caret-square-o-right',
			'teammembers'	=>	'fa-caret-square-o-right'
		);

		if(!class_exists('Honeyguide_WPCustomControls_StackList'))
			echo('StackList Class does NOT exist');
		if(class_exists('Honeyguide_WPCustomControls_StackList'))
			$wp_customize->add_control(
				new Honeyguide_WPCustomControls_StackList($wp_customize, 'stacks', array(
					'label'    => "Select a stack to be added",
					'settings' => 'stacks-options-addedStacks',
					'section'  => 'stacks',
					'type'     => 'addfromAtoB',
					'size'		=> 6,
					'choices' 	=> $vv,
					'icons'		=> $stackIcons,
					'enabled'	=> array()
				))
			);


		$t = $this->dasModel->enabledStacks;
		foreach ($t as $v) {

			$this->dasModel->loadStackPanel($v);
			$fs = $this->dasModel->panelSet[$v]['fs'];
			$sp = $this->dasModel->panelSet[$v]['sp'];

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