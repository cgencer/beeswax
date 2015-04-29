<?php
class __MyTemplates_5c8dbbf12d95150bb9810b02c031ca62 extends Mustache_Template
{
    protected $strictCallables = true;
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';
        $newContext = array();

        $buffer .= $indent . '      <section class="container mt-xxxlg">
';
        $buffer .= $indent . '        <div class="row">
';
        $buffer .= $indent . '          <div class="col-xs-12">
';
        $buffer .= $indent . '            <h2 class="lead text-center text-primary mb-none">Our Team</h2>
';
        $buffer .= $indent . '          </div>
';
        $buffer .= $indent . '        </div>
';
        $buffer .= $indent . '        <div class="row">
';
        $buffer .= $indent . '        ';
        $value = $this->resolveValue($context->find('content'), $context, $indent);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '
';
        $buffer .= $indent . '        </div>
';
        $buffer .= $indent . '      </section>
';
        return $buffer;
    }
}
