<?php 

get_header();
/*
$frontPageOrder = explode(':', $settings_api->get_option('beeswax_blox_order', 'admin_settings_frontpage_builder'));
foreach ($frontPageOrder as $fpBlock) {
  echo templateRender($fpBlock);
}
*/
echo $theTheme->templateRender(true, array('name' => 'header', 'container'=> 'header'));

echo $theTheme->templateRender(true, 
    array('container' => 'group_container', 
          'repeater' => 'item_services', 
          'number' => 3,
          'arrangement' => '3',
          'name' => 'services',
          'title' => 'Our Services'), 
    array(), 
    array('post_type' => 'services'));

echo $theTheme->templateRender(false, array('name' => 'banners'));

echo $theTheme->templateRender(true, 
    array('container' => 'group_container', 
          'repeater' => 'item_teamMembers', 
          'number' => 5, 
          'name' => 'teammembers',
          'arrangement' => '2-3',
          'title' => 'Our Team'), 
    array(), 
    array('post_type' => 'teammembers')
);

echo $theTheme->templateRender(false, array('name' => 'counter'));
echo $theTheme->templateRender(true, 
    array('container' => 'group_container', 
          'repeater' => 'item_content', 
          'title' => false,
          'name' => 'posts',
          'number' => 2), 
    array(), 
    array('post_type' => 'posts', 'category_name' => 'detail')
);
get_footer();
?>