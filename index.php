<?php 

get_header();
echo templateRender('header');
echo templateRender('services');
echo templateRender('banners');

echo templateRender(
    array('container' => 'team', 'repeater' => 'team_members', 'arrangement' => $settings_api->get_option( 'beeswax_blox_teamdist', 'admin_settings_frontpage_builder', '2-3' )), 
    array(), 
    array('post_type' => 'teammembers')
);

echo templateRender('counter');
echo templateRender('content');
get_footer();
?>