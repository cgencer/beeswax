<?php
return new stacks_customizer();

class stacks_customizer {

	protected $theParent;
	public $themeBlocks;
	private $pri = 45;
	private $templates;
	private $dasModel;

	private $stackMeta;
	private $scripts;
	private $hooks = array(
		'preview' => 'wp_enqueue_scripts',					// to appear on the front end
		'xxxxxxx' => 'customize_controls_init', 			// Fires when Customizer controls are initialized, before scripts are enqueued
		'control' => 'customize_controls_enqueue_scripts',	//  action hook triggered after the WP Theme Customizer after customize_controls_init was called
		'stacks' => 'customize_preview_init',				// to enqueue assets (such as javascript files) directly in the Theme Customizer only
		'register' => 'customize_register'					// to customize and manipulate the Theme Customization admin screen (adding custom controls, etc)
	);

	public function saveRef($id) {
		$this->theParent = $id;
		$this->dasModel = $this->theParent->dasModel;

		$this->scripts = array(
			'preview' => array(
				'honeyguide-cCommPrvw' => array(
					'path' => $this->dasModel->stacksUrl . 'js/cCommPreviewer.js',
					'required' => array('customize-preview-widgets')
				),
				'honeypot-util' => array(
					'path' => $this->dasModel->stacksUrl . 'js/honeyPot/util.js',
					'required' => array('jquery', 'customize-preview-widgets')
				),
				'honeypot-editor' => array(
					'path' => $this->dasModel->stacksUrl . 'js/honeyPot/editor.js',
					'required' => array('jquery', 'honeypot-util', 'customize-preview-widgets')
//				),
				// https://github.com/xwp/wp-customize-inline-editing
//				'customize-inline-editing-preview' => array(
//					'path' => $this->dasModel->stacksUrl . 'js/customize-preview.js',
//					'required' => array('jquery', 'customize-preview')
				),
				// 
				'slidereveal' => array(
					'path' => $this->dasModel->themeUrl . '/bower_components/slidereveal/dist/jquery.slidereveal.min.js',
					'required' => array('jquery', 'customize-preview')
				),
				'preview-slidePanel' => array(
					'path' => $this->dasModel->stacksUrl . 'js/customize-preview-slidepanel.js',
					'required' => array('jquery', 'customize-preview', 'bootstrap')
				),
				'preview-stackMenus' => array(
					'path' => $this->dasModel->stacksUrl . 'js/customize-preview-stackMenus.js',
					'required' => array('jquery', 'customize-preview')
				),
				'lodash' => array(
					'path' => $this->dasModel->stacksUrl . 'js/vendor/lodash/lodash.min.js',
					'required' => array('jquery', 'customize-preview')
				),
				'handlebars' => array(
					'path' => $this->dasModel->stacksUrl . 'js/vendor/handlebars/handlebars.min.js',
					'required' => array('jquery', 'customize-preview')
				),
				'requirejs' => array(
					'path' => $this->dasModel->stacksUrl . 'js/vendor/requirejs/require.js',
					'required' => array('customize-preview')
				),
				'ember' => array(
					'path' => $this->dasModel->stacksUrl . 'js/vendor/ember/ember.min.js',
					'required' => array('jquery', 'customize-preview')
				),
				'ember-app' => array(
					'path' => $this->dasModel->stacksUrl . 'js/app.js',
					'required' => array('ember', 'requirejs', 'jquery', 'customize-preview')
				)				
			),
			'control' => array(
				'honeyguide-cCommCtrl' => array(
					'path' => $this->dasModel->stacksUrl . 'js/cCommController.js',
					'required' => array('customize-controls')
//				),
				// https://github.com/xwp/wp-customize-inline-editing
//				'customize-inline-editing-pane' => array(
//					'path' => $this->dasModel->stacksUrl . 'js/customize-pane.js',
//					'required' => array('jquery', 'customize-preview')
				)
			),
			'stacks' => array(
				// http://vitalets.github.io/x-editable/
				'stack-scripts-xeditable' => array(
					'path' => $this->dasModel->stacksUrl . 'js/vendor/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js',
					'required' => array('jquery', 'customize-preview')
				),
				'stack-styles-xeditable' => array(
					'path' => $this->dasModel->stacksUrl . 'js/vendor/x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css',
					'required' => array()
				)
			)
		);

		$this->export_script_data('customize-inline-editing-preview', '_CustomizeInlineEditingPreview_exports', array(
			'settingElementSelectors' => $this->get_theme_support(),
			'l10n' => array('shiftClickNotice' => __( 'Shift + Click to edit inline.', 'customize-inline-editing' ))
		));

		foreach (scandir($this->dasModel->stacksPath . 'depot/') as $names) {
			if ('.' === $names || '..' === $names || '.DS_Store' === $names) continue;
			if(is_dir($this->dasModel->stacksPath . 'depot/' . $names)) {
				$files = glob($this->dasModel->stacksPath . 'depot/' . $names . '/*.js');
				foreach ($files as $file) {
					$this->scripts['stacks'][] = array(
						'stack-scripts-' . $names . '-' . pathinfo($file, PATHINFO_FILENAME) => array(
							'path'	=> $this->dasModel->stacksUrl . 'depot/' . $names . '/' . pathinfo($file, PATHINFO_FILENAME) . '.' . pathinfo($file, PATHINFO_EXTENSION),
							'required' => array('jquery', 'customize-preview')
						)
					);
				}
			}
		}

		$this->loadStuff();
	}

	public function initJS($w) {
		foreach ($this->scripts[$w] as $key => $val) {
	        wp_register_script($key, $val['path'], $val['required']);
	        wp_enqueue_script($key);
	        if (class_exists('FirePHP')) fb($val['path']);
		}
	}

	public function cCommCtrlInit() {
		$this->initJS('control');
	}

	public function cCommPrvwInit() {
		$this->initJS('preview');
	}

	public function cStcksScrInit() {
		$this->initJS('stacks');
	}

	public function loadStuff() {
		require_once($this->dasModel->stacksPath . 'customizer_customcontrols.php');
		require_once($this->dasModel->stacksPath . 'custom-controls/customizer_layoutpicker.php');
		foreach (glob($this->dasModel->vendorsPath . 'customizer-custom-controls/*.php') as $file) {
			require_once($file);
		}

		add_action('customize_controls_enqueue_scripts', 	array($this, 'cCommCtrlInit'));
		add_action('wp_enqueue_scripts', 					array($this, 'cCommPrvwInit'));
		add_action('customize_preview_init', 				array($this, 'cStcksScrInit'));
		add_action('customize_register', 					array($this, 'cCommCompInit'));

		foreach(glob($this->dasModel->vendorsPath . 'Honeyguide_WPCustomControls/*', GLOB_ONLYDIR) as $f) {
			if('vendor' != substr($f, -6)) {
				foreach (glob($f . '/class_*.php') as $file) {

//					if(method_exists(__CLASS__, 'do_enqueue'))
//						add_action('customize_controls_enqueue_scripts', array(__CLASS__, 'do_enqueue'));



					$r = require_once($file);
					if(method_exists($r, 'live_preview'))
						add_action('customize_controls_enqueue_scripts', array($r, 'customizerPreview') );
					if(method_exists($r, 'admin_panels'))
						add_action('customize_controls_enqueue_scripts', array($r, 'customizerPanels') );

				}
			}
		}
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
//		$wp_scripts->add_data( $handle, 'data', $data );
	}

	// grabs the dirs out of fields_meta and distributes them into 2 arrays according to the 1st line of each template file
	public function cCommCompInit($wp_customize){

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

//		echo('<pre>');var_dump($this->templates['PARAM'][$v]['isDynamic']);echo('</pre>');

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
					// this part adds the 'static' content template container into the section as rendered template 
					if($this->templates['PARAM'][$v]['isDynamic']) {
						$wp_customize->add_setting(
							'stacks_'.$v.'_panelContent', array(
								'capability'	=> 'edit_theme_options',
								'type'			=> 'option',
						));

						require(dirname(__FILE__).'/queryRules.php');
						$qrView = new queryRulesView($this->dasModel->queryRules);

						$templateSet = '<div class="dbQueryPanel">' . $this->theParent->mustacheEngine->render(file_get_contents(dirname(__FILE__).'/panels/'.$this->templates['PARAM'][$v]['panel'].'.tpl'), null) . '</div>';
						$templateSet.= '<div class="dbQueryOneLiner">' . $this->theParent->mustacheEngine->render(file_get_contents(dirname(__FILE__).'/panels/dbQuery.oneLiner.tpl'), $qrView) . '</div>';
						$templateSet.= '<div class="dbQueryAndOr">' . $this->theParent->mustacheEngine->render(file_get_contents(dirname(__FILE__).'/panels/dbQuery.andOr.tpl'), null) . '</div>';
						$templateSet.= '<div class="dbQueryEmber">' . file_get_contents(dirname(__FILE__).'/panels/dbQuery.ember.tpl') . '</div>';

						$wp_customize->add_control( 
							new Honeyguide_WPCustomControls_ContentContainer($wp_customize, $v, array(
								'choices'		=> $templateSet,
								'label'			=> 'Query',
								'settings'		=> 'stacks_'.$v.'_panelContent',
								'section' 		=> 'stacks_'.$v,
								'type'			=> 'contentContainer'
						)));
					}
				}
			}
		}
	}
}