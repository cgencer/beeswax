<?php
return new honeyguide_utils();

class honeyguide_utils
{
    private $values;

    public function __construct()
    {
    }

	public static function merge_lvl2(){
	    $args = func_get_args();
	    return static::merge($args, 2);
	}

	public static function merge($args, $maxDepth = null, $depth = 1)
	{
	    $merge = [];
	    foreach($args as $arg) {
	        if (is_array($arg)) {
	            if (is_array($merge)) {
	                if ($maxDepth == $depth) {
	                    $arg += $merge;
	                    $merge = $arg;
	                } else {
	                    $merge = array_merge($merge, $arg);
	                }
	            } else {
	                $merge = $arg;
	            }
	        }
	    }
	    if ($maxDepth !== $depth) {
	        foreach($args as $a) {
	            if (is_array($a)) {
	                foreach($a as $k => $v) {
	                    if (isset($merge[$k]) && is_array($merge[$k])) {
	                        $merge[$k] = static::merge([$merge[$k], $v], $maxDepth, $depth + 1);
	                    }
	                }
	            }
	        }
	    }
	    return $merge;
	}

}
