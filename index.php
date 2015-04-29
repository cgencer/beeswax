<?php 

get_header();
echo templateRender('header');
echo templateRender(array('container' => 'services', 'repeater' => 'service', 'title' => 'Our Services'), null, array('post_type' => 'services'));
echo templateRender('banners');

echo templateRender(
    array('container' => 'team', 'repeater' => 'team_members', 'arrangement' => $settings_api->get_option( 'beeswax_blox_teamdist', 'admin_settings_frontpage_builder', '2-3' ), 'title' => 'Our Team'), 
    array(), 
    array('post_type' => 'teammembers')
);

echo templateRender('counter');
echo templateRender('content');
get_footer();
?>