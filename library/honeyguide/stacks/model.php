<?php
return stacks_model::get_instance();

class stacks_model {

	private static $instance;
	protected $theParent;
	public $mePath;
	public $stacksPath;
	public $stacksUrl;
	public $vendorsPath;
	public $vendorsUrl;

	public $enabledStacks;
	public $stackedPages;

	public $panelSet;

    public static function get_instance() {
        if ( ! self::$instance ) {
            self::$instance = new self();
            self::$instance->init();
        }
        return self::$instance;
    }

	public function __construct() {}

	public function init() {
		global $wp_customize;

		$this->mePath = dirname(dirname(dirname(dirname(__FILE__))));
		$this->vendorsPath = dirname(dirname(__FILE__)) . '/vendor/';
		$this->vendorsUrl = get_template_directory_uri() . '/library/honeyguide/stacks/js/vendor/';
		$this->stacksPath = dirname(dirname(dirname(dirname(__FILE__)))) . '/library/honeyguide/stacks/';
		$this->stacksUrl = get_template_directory_uri() . '/library/honeyguide/stacks/';

		if ( ! class_exists( 'Spyc' ) ) require_once ($this->vendorsPath . '/spyc/Spyc.php');

		$this->enabledStacks = Spyc::YAMLLoad(dirname(__FILE__) . '/enabled.yaml')['stacks'];
		$this->stackedPages = Spyc::YAMLLoad(dirname(__FILE__) . '/index.yaml');

		$this->panelSet = array();
	}

	public function saveRef($id) {
		$this->theParent = $id;
	}

	public function loadStackPanel($v) {
		$this->panelSet[$v] = array();
		$this->panelSet[$v]['fs'] = (file_exists($this->stacksPath . 'depot/' . $v . '/fieldset.yaml')) ? 
			Spyc::YAMLLoad($this->stacksPath . 'depot/' . $v . '/fieldset.yaml') : null;

		$this->panelSet[$v]['sp'] = (file_exists($this->stacksPath . 'depot/' . $v . '/panel.yaml')) ?
			Spyc::YAMLLoad($this->stacksPath . 'depot/' . $v . '/panel.yaml') : null;
	}

	public function distributeTemplates() {
		$dirs = array();
		$dirs['COLLECTIONS'] = array();
		$dirs['ITEMS'] = array();
		$dirs['PANELS'] = array();
		$dirs['STACKS'] = array();
		$tra = array();
		$flat = array();

		foreach (scandir($this->stacksPath . 'depot/') as $names) {
			if ('.' === $names || '..' === $names || '.DS_Store' === $names) continue;
			if(is_dir($this->stacksPath . 'depot/' . $names)) {

				//load the template file... if it has ISA command dristribute its name into COLLECTIONS or ITEMS
				$files = glob($this->stacksPath . 'depot/' . $names . '/*.tpl');
				foreach ($files as $file) {
					$n = array();
					preg_match('/\{{2}\!isa+:([COLLECTION|ITEM]+)\}{2}/', file($file)[0], $n);
					if( is_string($n[1]) )
						if('COLLECTION' == $n[1] || 'ITEM' == $n[1])
//							array_push($dirs[$n[1].'S'], $names . '/' . pathinfo($file, PATHINFO_FILENAME));
							$dirs[$n[1].'S'][$names . '/' . pathinfo($file, PATHINFO_FILENAME)] = $names . '/' . pathinfo($file, PATHINFO_FILENAME);
							$dirs['STACKS'][$names] = ucwords($names);
				}

				if(file_exists($this->stacksPath . 'depot/' . $names . '/panel.yaml'))
				$dirs['PANELS'][$names] = (file_exists($this->stacksPath . 'depot/' . $names . '/panel.yaml')) ?
					Spyc::YAMLLoad($this->stacksPath . 'depot/' . $names . '/panel.yaml') : array();

				if(is_array($dirs['PANELS'][$names]))
					array_walk_recursive($dirs['PANELS'][$names], function($val, $key) use (&$flat) {
						$flat[] = $key;
						$flat[] = $val;
					});
			}
		}
		return($dirs);
	}

	public function loadTemplatesIntoArray() {
		if(count($this->templates)>1) 
			return $this->templates;

		$this->templates = array();
		foreach (glob(dirname(__FILE__).'/depot/*.tpl') as $filename) {
			$this->templates[pathinfo(basename($filename),PATHINFO_FILENAME)] = $filename; 
		}
		foreach (glob(dirname(__FILE__).'/depot/*/*.tpl') as $filename) {
			$this->templates[basename(dirname($filename)).'/'.pathinfo(basename($filename),PATHINFO_FILENAME)] = readfile($filename); 
		}
//echo('<pre>');var_dump($this->templates);echo('</pre>');
		return $this->templates;
	}
}