<?php
// 
// This file contains all the static parameters needed for the template
// and returns thus as a view-object
// 
class counterView
{
	public $set = array(						// all definitions
		'name' 			=> 'counter',
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
					'number' 		=> 1,
					'arrangement' 	=> array(1)
				),
				'strings' 	=> array(					// strings specific to all items (e.g. the container)
					'title' 		=> "Our Team",
				),
			)
		),


		'items' 		=> array(				// contains 1+ items, instances of the stack. if empty, use only the other parameters in $global
		),


		'query'			=> array(
		)
	);
}
$view = new counterView();
return $view;
