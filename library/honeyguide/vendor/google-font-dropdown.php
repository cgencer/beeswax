<?php
if ( ! class_exists( 'WP_Customize_Control' ) )
    return NULL;

require_once( dirname(__FILE__) . '/wpthemecustomizer-custom-controls/select/google-font-dropdown-custom-control.php' );

class GoogleFont_Dropdown extends Google_Font_Dropdown_Custom_Control {

    public function get_fonts( $amount = 30 )
    {
        $fontFile = dirname(__FILE__) . '/wpthemecustomizer-custom-controls/select/cache/google-web-fonts.txt';

        //Total time the file will be cached in seconds, set to a week
        $cachetime = 86400 * 7;

        if(file_exists($fontFile) && $cachetime < filemtime($fontFile))
        {
            $content = json_decode(file_get_contents($fontFile));
        } else {

            $googleApi = 'https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key={API_KEY}';

            $fontContent = wp_remote_get( $googleApi, array('sslverify'   => false) );

            $fp = fopen($fontFile, 'w');
            fwrite($fp, $fontContent['body']);
            fclose($fp);

            $content = json_decode($fontContent['body']);
        }

        if($amount == 'all')
        {
            return $content->items;
        } else {
            return array_slice($content->items, 0, $amount);
        }
    }
}