<?php
// 
// This file contains all the static parameters needed for the template
// and returns thus as a view-object
// 
class bannerhalfView
{
	public $set = array(						// all definitions
		'name' 			=> 'banner_half',
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
					'type' 			=> 'half',
					'arrangement' 	=> array(1)
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
				),
				'images' 	=> array(
					'image' 		=> 'photo.png',
				),
				'links' 	=> array(
					'dl' 			=> '#'
				)
			),
//			array()


		),
	);
}
$view = new bannerhalfView();
return $view;