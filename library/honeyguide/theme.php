<?php
class honeyguide_theme {

	public $theme_name;
	public $version;
	public $settingsApi;
	public $admin;
	public $mustacheEngine;
	public $mustacheLoader;
	public $stacks;
	public $templates;
	private $themeFiles = array('theme_setup', 'cleanerwp', 'customizer', 'plugins', 'utils', 'sidebars', 'shortcodes', 'pagetypes', 'admin');
	public $themeBlocks = array('header', 'services', 'banners', 'team', 'counter');

	public function __construct( $theme_name, $version ) {
		$this->theme_name = $theme_name;
		$this->version = $version;

		$this->settingsApi = new Settings_API;
		$this->settingsApi->saveRef($this);

		require_once('stacks/stacks.php');
		$this->stacks = new Stacks;
		$this->stacks->saveRef($this);

		// Add Translation Option
		load_theme_textdomain( 'wpbootstrap', TEMPLATEPATH.'/languages' );
		$locale = get_locale();
		$locale_file = TEMPLATEPATH . "/languages/$locale.php";
		if ( is_readable( $locale_file ) ) require_once( $locale_file );
		foreach ($this->themeFiles as $file) {
			if ( is_readable( dirname(__FILE__) . '/' . $file . '.php' ) ) {
				$obj = require_once( dirname(__FILE__) . '/' . $file . '.php' );
				if( method_exists( $obj, 'saveRef') ) {
					$obj->saveRef($this);
				}
			}
		}
		foreach (glob(dirname(__FILE__).'/vendor/*.php') as $filename) {
			if(is_readable($filename)) {
				include_once($filename);
			}
		}
/*
		$this->mustacheEngine = new Mustache_Engine(array(
			'template_class_prefix' 		=> '__MyTemplates_',
			'cache' 						=> dirname(dirname(dirname(__FILE__))).'/tmp/cache/mustache',
			'cache_file_mode' 				=> 0666, // Please, configure your umask instead of doing this :)
		'cache_lambda_templates' 		=> true,
		'helpers' 						=> array('i18n' => function($text) {
				// do something translatey here...
		}),
		'escape' 						=> function($value) {
			return htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
		},
		'charset' 						=> 'UTF-8',
		'logger' 						=> new Mustache_Logger_StreamLogger('php://stderr'),
		'strict_callables' 				=> true,
		'pragmas' 						=> [Mustache_Engine::PRAGMA_FILTERS],
		'partials_loader'				=> new Mustache_Loader_ArrayLoader( $this->stacks->loadTemplatesIntoArray() )
		));
//		$this->mustacheLoader = new Mustache_Loader_FilesystemLoader( dirname(__FILE__).'/stacks/front', array('extension' => 'tpl') );
		$this->mustacheLoader = new Mustache_Loader_ArrayLoader( $this->stacks->loadTemplatesIntoArray() );
*/
		$this->mustacheEngine = new Mustache();
		$this->mustacheEngine->setSuffix('tpl');


		add_theme_support( 'customize-inline-editing', array(
			'blogname' => '.site-title',
			'blogdescription' => '.site-description',
			));
	}

//	if( /* !method_exists('honeyguide_theme', 'templateRender') && */ class_exists('WeDevs_Settings_API') && class_exists('Mustache_Engine') ) {

	public function loadPage($page) {

		$this->stacks->loadPage($page);

	}



}
