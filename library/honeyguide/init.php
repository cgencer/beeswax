<?php
define( 'THEME_NAME', 'Beeswax Theme' );
define( 'THEME_URL', 'http://www.studiopress.com/' );
define( 'THEME_VERSION', '0.1.0' );
define( 'THEME_DIR', dirname( get_bloginfo('stylesheet_url')) );

if(!class_exists('Mustache_Engine')) {
	require_once( dirname(__FILE__).'/plugins/class-tgm-plugin-activation.php');
}
include_once get_template_directory() . '/library/honeyguide/plugins/multiple_sidebars.php';
require_once get_template_directory() . '/library/honeyguide/plugins/post-link-plus.php';
require_once get_template_directory() . '/library/honeyguide/plugins/multiple-featured-images/multiple-featured-images.php';

//if(!class_exists('Mustache_Engine')) {
//	require_once( dirname(__FILE__).'/vendor/mustache.php' );

//	require_once(dirname(__FILE__).'/vendor/mustache-php/src/Mustache/Autoloader.php');
//	Mustache_Autoloader::register();

//Users/obsesif/worx/honeyguide/bsbeeswax/library/honeyguide/vendor/phly-mustache/library/Phyl/Mustache/_autoload.php

//if(!class_exists('Khromov\Mustache_Cache\Mustache_Cache_WordPressCache')) {
//	require_once( dirname(__FILE__).'/vendor/mustache-cache/src/Mustache_Cache_WordPressCache.php' );	
//}

require_once( dirname(__FILE__).'/vendor/settings-api.php' );
require_once( dirname(__FILE__) . '/theme.php' );

require_once(dirname(__FILE__).'/vendor/phyl-mustache/library/Phly/Mustache/_autoload.php');
use Phly\Mustache\Mustache,
    Phly\Mustache\Pragma\SubViews;
$mustache = new Mustache();
$mustacheSubviews = new SubViews($mustache);

$m = new Mustache();

$theTheme = new honeyguide_theme(THEME_NAME, THEME_VERSION, $m);

include_once( dirname( __FILE__ ) . '/plugins/kirki/kirki.php' );
