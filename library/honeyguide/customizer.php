<?php
return new honeyguide_customizer();

class honeyguide_customizer {

	protected $theParent;
	public $themeBlocks;

    public function saveRef($id) {
		$this->theParent = $id;
    }

	public function __construct() {

	}
}