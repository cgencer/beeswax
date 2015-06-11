<?php
// 
// This file contains all the static parameters needed for the template
// and returns thus as a view-object
// 
class headerView
{
	public $set = array(						// all definitions
		'name' 			=> 'header',
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
				),
				'strings' 	=> array(					// strings specific to all items (e.g. the container)
					'title' 		=> "Our Team",
					'subtitle' 		=> "the subtitle",
				),
				'images' 	=> array(					// images ''
				),
				'links' 	=> array(					// links ''
				)
			)
		),


		'items' 		=> array(				// contains 1+ items, instances of the stack. if empty, use only the other parameters in $global
		),


		'query'			=> array(
		)
	);
}
$view = new headerView();
return $view;
