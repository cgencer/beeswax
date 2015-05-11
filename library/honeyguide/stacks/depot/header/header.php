<?php
	return array(
		'field' => array(
			'name'		=> 'sitename',
			'src'		=> get_bloginfo('name'),
			'field'		=> '.site-title strong'
		),
		'field' => array(
			'name'		=> 'sitedesc',
			'src'		=> get_bloginfo('description'),
			'field'		=> '.site-description'
		)
	);
