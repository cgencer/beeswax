<?php
	return array(
		'query' 		=> array(
			'post_type' 	=> 'teammembers'
		),
		'template'		=> array(
			'container' 	=> 'group_container', 
          	'repeater' 		=> 'item_teammembers', 
          	'number' 		=> 5,
          	'arrangement' 	=> '2-3',
          	'name' 			=> 'teammembers',
          	'title' 		=> 'Our Team'
		),
		'attributes'	=> array()
	);
