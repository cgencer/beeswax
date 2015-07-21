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
if(!class_exists('FirePHP')) require_once get_template_directory() . '/library/honeyguide/vendor/firephp/lib/FirePHPCore/fb.php';

require_once( dirname(__FILE__).'/vendor/settings-api.php' );
require_once( dirname(__FILE__) . '/theme.php' );

require_once(dirname(__FILE__).'/vendor/phyl-mustache/library/Phly/Mustache/_autoload.php');
use Phly\Mustache\Mustache,
    Phly\Mustache\Pragma\SubViews;
$mustacheSubviews = new SubViews($mustache);

require_once(dirname(__FILE__).'/vendor/json-serializer/src/Zumba/Util/JsonSerializer.php');

$theTheme = new honeyguide_theme(THEME_NAME, THEME_VERSION);
$theTheme->init(new Mustache());

ob_start();			// to use FirePHP
/*
define('KIRKI_PATH', dirname( __FILE__ ) . '/plugins/kirki/' );
define('KIRKI_URL', get_template_directory_uri() . '/plugins/kirki/');
include_once( dirname( __FILE__ ) . '/plugins/kirki/kirki.php' );
*/