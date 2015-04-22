<?php
class __MyTemplates_0b01ce6fc0b407296a943d474519287d extends Mustache_Template
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
        $buffer .= $indent . '          <div class="col-md-12">
';
        $buffer .= $indent . '            <h2 class="lead text-center text-primary mb-none">What do we do?</h2>
';
        $buffer .= $indent . '          </div>
';
        $buffer .= $indent . '        </div>
';
        if ($partial = $this->mustache->loadPartial('showcase_imgr')) {
            $buffer .= $partial->renderInternal($context, $indent . '        ');
        }
        $buffer .= $indent . '        <div class="row">
';
        $buffer .= $indent . '          <div class="col-xs-12">
';
        $buffer .= $indent . '            <hr />
';
        $buffer .= $indent . '          </div>
';
        $buffer .= $indent . '        </div>
';
        if ($partial = $this->mustache->loadPartial('showcase_imgl')) {
            $buffer .= $partial->renderInternal($context, $indent . '        ');
        }
        $buffer .= $indent . '        <div class="row">
';
        $buffer .= $indent . '          <div class="col-xs-12">
';
        $buffer .= $indent . '            <hr />
';
        $buffer .= $indent . '          </div>
';
        $buffer .= $indent . '        </div>
';
        $buffer .= $indent . '      </section>';
        return $buffer;
    }
}
