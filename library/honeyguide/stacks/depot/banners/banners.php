<?php
class bannersView
{
	public $items = array(
		array(
			'title' => 'Full height section to be used',
			'subtitle' => 'make it clear and stylish!',
			'image' => 'photo-2.png',
			'dllink' => '#'
		),
		array(
			'title' => 'Half height section to be used',
			'image' = 'photo.png',
			'dllink' => '#'
		)
	);

}
$view = new bannersView();
return $view;