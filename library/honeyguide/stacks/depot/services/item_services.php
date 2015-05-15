<?php
	return array(
		'query' 		=> array(
			'post_type' 	=> 'services'
		),
		'template'		=> array(
			'container' 	=> 'group_container', 
          	'repeater' 		=> 'item_services', 
          	'number' 		=> 3,
          	'arrangement' 	=> '3',
          	'name' 			=> 'services',
          	'title' 		=> 'Our Services',
          	'fields'		=> array(
          		'post_title'	=> post.post_title,
          	)
		),
		'attributes'	=> array()
	);
