<?php
// http://stackoverflow.com/questions/15613903/php-mustache-implicit-iterator-how-to-get-key-of-current-valuenumeric-php-arr
class MustacheIterator implements IteratorAggregate
{
    private $values;

    public function __construct($values)
    {
        if (!is_array($values) && !$values instanceof Traversable) {
            throw new InvalidArgumentException('MustacheIterator requires an array or Traversable object');
        }

        $this->values = $values;
    }

    public function getIterator()
    {
        $values = array();
        foreach ($this->values as $key => $val) {
            $values[$key] = array(
                'key'   => $key,
                'value' => $val,
                'first' => false,
                'last'  => false,
            );
        }

        $keys = array_keys($values);

        if (!empty($keys)) {
            $values[reset($keys)]['first'] = true;
            $values[end($keys)]['last']    = true;
        }

        return new ArrayIterator($values);
    }
}
