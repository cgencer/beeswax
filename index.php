<?php 

get_header();
echo templateRender('header');
echo templateRender(
    array('container' => 'group_container', 
          'repeater' => 'item_services', 
          'number' => 3, 
          'title' => 'Our Services'), 
    array(), 
    array('post_type' => 'services'));

echo templateRender('banners');

echo templateRender(
    array('container' => 'group_container', 
          'repeater' => 'item_teamMembers', 
          'number' => 5, 
          'arrangement' => $settings_api->get_option( 'beeswax_blox_teamdist', 'admin_settings_frontpage_builder', '2-3' ), 
          'title' => 'Our Team'), 
    array(), 
    array('post_type' => 'teammembers')
);

echo templateRender('counter');
echo templateRender(
    array('container' => 'group_container', 
          'repeater' => 'item_content', 
          'title' => false,
          'number' => 2), 
    array(), 
    array('post_type' => 'posts', 'category_name' => 'detail')
);
get_footer();
?>