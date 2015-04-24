<?php
class __MyTemplates_66f1cbd1fb66e1d7d2e2c57f5038de16 extends Mustache_Template
{
    protected $strictCallables = true;
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';
        $newContext = array();

        if ($partial = $this->mustache->loadPartial('fullbanner_left')) {
            $buffer .= $partial->renderInternal($context);
        }
        if ($partial = $this->mustache->loadPartial('fullbanner_right')) {
            $buffer .= $partial->renderInternal($context);
        }
        return $buffer;
    }
}
