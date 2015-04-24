<?php
class __MyTemplates_388c39bde6774ac83362076b5a27c38d extends Mustache_Template
{
    protected $strictCallables = true;
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';
        $newContext = array();

        if ($partial = $this->mustache->loadPartial('fullbanner_left')) {
            $buffer .= $partial->renderInternal($context);
        }
        if ($partial = $this->mustache->loadPartial('halfbanner_right')) {
            $buffer .= $partial->renderInternal($context);
        }
        return $buffer;
    }
}
