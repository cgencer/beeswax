<?php
// 
// This file contains all the static parameters needed for the template
// and returns thus as a view-object
// 
class bannerfullView
{
	public $set = array(						// all definitions
		'name' 			=> 'banner_full',
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
					'type' 			=> 'full'
				),
				'strings' 	=> array(					// strings specific to all items (e.g. the container)
				),
				'images' 	=> array(					// images ''
				),
				'links' 	=> array(					// links ''
				)
			)
		),


		'items' 		=> array(				// contains 1+ items, instances of the stack. if empty, use only the other parameters in $global
			array(
				'param' 	=> array(			// parameters specific to each item
					'type' 			=> 'full'
				),
				'strings' 	=> array(
					'title' 		=> 'Full height section to be used',
					'subtitle' 		=> 'make it clear and stylish!',
				),
				'images' 	=> array(
					'image' 		=> 'photo-2.png',
				),
				'links' 	=> array(
					'dl' 			=> '#'
				)
			),
//			array()

		)
	);
}
$view = new bannerfullView();
return $view;