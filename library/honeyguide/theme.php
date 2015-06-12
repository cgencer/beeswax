<?php

class honeyguide_theme {

	public $theme_name;
	public $version;
	public $settingsApi;
	public $admin;
	public $mustacheEngine;
	public $stacks;
	private $themeFiles = array('model', 'setup', 'cleanerwp', 'plugins', 'utils', 'sidebars', 'shortcodes', 'pagetypes', 'admin');
	public $themeBlocks = array('header', 'services', 'banners', 'team', 'counter');
	public $plugins = array('stacks');
	private $plugRef = array();
	private $themeRef = array();

	public function __construct( $theme_name, $version, $mustache ) {
		$this->theme_name = $theme_name;
		$this->version = $version;

		$this->dasModel = require_once(dirname(__FILE__) . '/model.php');
		$this->dasModel->saveRef($this);

		foreach ($this->plugins as $file) {
			require_once($file.'/'.$file.'.php');
			$this->plugRef[$file] = new Stacks;
			$this->plugRef[$file]->saveRef($this);
		}

		$this->mustacheEngine = $mustache;
		$this->mustacheSViews = $mustacheSubviews;
		$this->mustacheEngine->setSuffix('tpl');

		// Add Translation Option
		load_theme_textdomain( 'wpbootstrap', TEMPLATEPATH.'/languages' );
		$locale = get_locale();
		$locale_file = TEMPLATEPATH . '/languages/$locale.php';
		if ( is_readable( $locale_file ) ) require_once( $locale_file );

		foreach ($this->themeFiles as $file) {
			if ( is_readable( dirname(__FILE__) . '/' . $file . '.php' ) ) {
				$obj = require_once( dirname(__FILE__) . '/' . $file . '.php' );
				$this->themeRef[$file] = $obj;
				if( method_exists( $obj, 'saveRef') ) {
					$obj->saveRef($this);
				}
			}
		}
//		var_dump($this->themeRef['utils']);
		$this->dasModel->saveUtil[ $this->themeRef['utils'] ];

		foreach (glob(dirname(__FILE__).'/vendor/*.php') as $filename) {
			if(is_readable($filename)) {
				include_once($filename);
			}
		}

		add_theme_support( 'customize-inline-editing', array(
			'blogname' => '.site-title',
			'blogdescription' => '.site-description',
			));
	}

//	if( /* !method_exists('honeyguide_theme', 'templateRender') && */ class_exists('WeDevs_Settings_API') && class_exists('Mustache_Engine') ) {

	public function loadPage($page) {

		if($this->plugRef['stacks']) $this->plugRef['stacks']->loadPage($page);

	}



}
