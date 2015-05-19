<?php
return new honeyguide_model();

class honeyguide_model {

	protected $theParent;
	public $mePath;
	public $stacksPath;
	public $stacksUrl;
	public $vendorsPath;
	public $vendorsUrl;

	public $settingsApi;


	public function __construct() {

		$this->mePath = dirname(dirname(dirname(__FILE__)));
		$this->vendorsPath = dirname(__FILE__) . '/vendor/';
		$this->vendorsUrl = get_template_directory_uri() . '/library/honeyguide/stacks/js/vendor/';
		$this->stacksPath = dirname(dirname(dirname(__FILE__))) . '/library/honeyguide/stacks/';
		$this->stacksUrl = get_template_directory_uri() . '/library/honeyguide/stacks/';

		require_once ($this->vendorsPath . '/spyc/Spyc.php');
		require_once($this->vendorsPath . '/settings-api.php' );

		$this->settingsApi = new Settings_API;
		$this->settingsApi->saveRef($this);
	}

	public function saveRef($id) {
		$this->theParent = $id;
	}

}