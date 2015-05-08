<?php
	return array(
		'query' 		=> array(
			'post_type' 	=> 'services'						// post, page, revision, attachment, nav_menu_item, any, [CUSTOM]
/*
			'post_status'		=>	'publish',					// publish, pending, private, draft, auto-draft, future, trash, any
			'posts_per_page'	=> 20,
			'offset'			=> 0,
			'ignore_sticky_posts'	=> false,
			''
			''
			'author_name'		=> '',
			'category_name'		=> '',
			'tag'				=> '',
			'tag_slug__in'		=> array(''),
			'tax_query'			=> array(
				array(
					'taxonomy'	=> 'people',
					'field'		=> 'slug',
					'terms'		=> 'bob',
				)),
			'name'				=> '',
			'pagename'			=> '',
			'order'				=> '',							// string OR array
			'orderby'			=> '',							// string OR array OR rand
			'date_query'		=> array(),
			'meta_query'		=> array(),
*/
		),
		'template'		=> array(
			'container' 	=> 'group_container', 
          	'repeater' 		=> 'item_services', 
          	'number' 		=> 3,
          	'arrangement' 	=> '3',
          	'name' 			=> 'services',
          	'title' 		=> 'Our Services'
		),
		'attributes'	=> array()
	);
