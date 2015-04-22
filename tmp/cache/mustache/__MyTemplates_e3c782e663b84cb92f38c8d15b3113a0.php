<?php
class __MyTemplates_e3c782e663b84cb92f38c8d15b3113a0 extends Mustache_Template
{
    protected $strictCallables = true;
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';
        $newContext = array();

        $buffer .= $indent . '      <section class="container mt-xxxlg">
';
        if ($partial = $this->mustache->loadPartial('content_imgr')) {
            $buffer .= $partial->renderInternal($context, $indent . '        ');
        }
        $buffer .= $indent . '        <div class="row">
';
        $buffer .= $indent . '          <div class="col-xs-12">
';
        $buffer .= $indent . '            <hr class="mt-xlg" />
';
        $buffer .= $indent . '          </div>
';
        $buffer .= $indent . '        </div>
';
        if ($partial = $this->mustache->loadPartial('content_imgl')) {
            $buffer .= $partial->renderInternal($context, $indent . '        ');
        }
        $buffer .= $indent . '        <div class="row">
';
        $buffer .= $indent . '          <div class="col-xs-12">
';
        $buffer .= $indent . '            <hr class="mt-xlg" />
';
        $buffer .= $indent . '          </div>
';
        $buffer .= $indent . '        </div>
';
        $buffer .= $indent . '      </section>';
        return $buffer;
    }
}
