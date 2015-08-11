<?php
class queryRulesView
{
    public $name = "da Query rules";
    public $left;
    public $mid;
    public $right;
    public $cleft;

    public function __construct($set)
    {
    	$p = array();
		foreach ($set as $key => $val) {
            foreach ($val as $vk => $vv) {
                // explode the array in the regexp rule into an array for later use
                if("[" === substr($vv, 0, 1) && "]" === substr($vv, -2, 1)) {
                    $val[$vk.'_array'] = explode(', ', substr(substr($vv, 0, -2), 1));
                }
            }
			array_push($p, $val);
		}
    	$this->left = new ArrayObject($p);

//echo('<pre>');var_dump($this->left);echo('</pre>');
	}
}