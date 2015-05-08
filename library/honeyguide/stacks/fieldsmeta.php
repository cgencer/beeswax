<?php
	return array(
		'template'	=> array(
			'container'	=> array(
				'type'		=> 'select',
				'default'	=> '',
				'source'	=> ''
			),
			'repeater'	=> array(
				'type'		=> 'select',
				'default'	=> '',
				'source'	=> ''
			),
			'number'	=> array(
				'type'		=> 'text',
				'default'	=> '',
			),
			'arrangement'	=> array(
				'type'		=> 'text',
				'default'	=> '',
			),
			'name'	=> array(
				'type'		=> 'text',
				'default'	=> '',
			),
		),
		'query'	=> array(
			'post_type'		=> array('post', 'page', 'any'),
			'post_status'	=> array('publish', 'pending', 'private', 'draft', 'auto-draft', 'future', 'trash', 'any'),
		)
	);
