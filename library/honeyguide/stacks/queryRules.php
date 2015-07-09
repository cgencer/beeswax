<?php
class queryRulesView
{
    public $name = "Joe's shopping card";
    public $left;

    public function __construct($set)
    {
    	$p = array();
		foreach ($set as $key => $val) {
			array_push($p, array('item' => $val));
		}
    	$this->left = new ArrayObject($p);
	}
}