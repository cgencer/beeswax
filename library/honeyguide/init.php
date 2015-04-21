<?php
//	if(!class_exists('Mustache_Engine')) {
//		require_once( dirname(__FILE__).'/lib/TGM-Plugin-Activation/class-tgm-plugin-activation.php');
//	}
if(!class_exists('Mustache_Engine')) {
	require_once( dirname(__FILE__).'/vendor/mustache-php/mustache.php' );
}
if(!class_exists('Khromov\Mustache_Cache\Mustache_Cache_WordPressCache')) {
	require_once( dirname(__FILE__).'/vendor/mustache-cache/src/Mustache_Cache_WordPressCache.php' );	
}
if(!class_exists('WeDevs_Settings_API_Test')) {
	require_once( dirname(__FILE__).'/vendor/settings-api/class.settings-api.php' );
}

require_once( dirname(__FILE__) . '/theme.php' );
require_once( dirname(__FILE__) . '/cleanerwp.php' );
require_once( dirname(__FILE__) . '/shortcodes.php' );
require_once( dirname(__FILE__) . '/pagetypes.php' );
require_once( dirname(__FILE__) . '/sidebars.php' );

define( 'CHILD_THEME_NAME', 'Beeswax Theme' );
define( 'CHILD_THEME_URL', 'http://www.studiopress.com/' );
define( 'CHILD_THEME_VERSION', '2.1.2' );
define( 'CHILD_THEME_DIR', dirname( get_bloginfo('stylesheet_url')) );

$settings_api = new WeDevs_Settings_API;
$mustache = new Mustache_Engine(array(
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
));
$loader = new Mustache_Loader_FilesystemLoader(dirname(dirname(dirname(__FILE__))).'/views/admin', array('extension' => 'tpl') );


// Add Translation Option
load_theme_textdomain( 'wpbootstrap', TEMPLATEPATH.'/languages' );
$locale = get_locale();
$locale_file = TEMPLATEPATH . "/languages/$locale.php";
if ( is_readable( $locale_file ) ) require_once( $locale_file );
