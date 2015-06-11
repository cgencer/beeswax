<?php
// 
// This file contains all the static parameters needed for the template
// and returns thus as a view-object
// 
class contentView
{
	public $set = array(						// all definitions
		'name' 			=> 'content',
		'stylesheet' 	=> '',
		'script' 		=> '',
		'instanceName' 	=> '',
		'author' 		=> '',
		'version' 		=> '',
		'URL' 			=> '',
		'instanceName' 	=> '',


		'global'		=> array(						// parameters specific to all items, this array contains only one item
			array(
				'param'		=> array(
					'arrangement' 	=> array(1, 1, 1)
				),
				'strings' 	=> array(					// strings specific to all items (e.g. the container)
				),
			)
		),


		'items' 		=> array(				// contains 1+ items, instances of the stack. if empty, use only the other parameters in $global
		),


		'query'			=> array(
			'post_type' 		=> 'posts',
			'category_name'		=> 'detail'
		)
	);
}
$view = new contentView();
return $view;
