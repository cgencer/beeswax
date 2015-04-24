<?php
class __MyTemplates_2e8449bb03300d7d549276f08bc54e5e extends Mustache_Template
{
    protected $strictCallables = true;
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';
        $newContext = array();

        $buffer .= $indent . '      <section class="section-full-height mt-xxxlg" style="background-image: url(../images/photo-3.png);">
';
        $buffer .= $indent . '        <div class="middle">
';
        $buffer .= $indent . '          <div class="container">
';
        $buffer .= $indent . '            <div class="row">
';
        $buffer .= $indent . '              <div class="col-xs-12 wow tada">
';
        $buffer .= $indent . '                <h1 class="lead text-white text-center text-white text-shadow"><i class="fa fa-rocket fa-2x"></i></h1>
';
        $buffer .= $indent . '                <h1 class="lead text-center text-white text-shadow"><strong>100000+ and counting</strong></h1>
';
        $buffer .= $indent . '              </div> <!--/.col-->
';
        $buffer .= $indent . '            </div> <!--/.row-->
';
        $buffer .= $indent . '          </div>
';
        $buffer .= $indent . '        </div>
';
        $buffer .= $indent . '      </section>
';
        return $buffer;
    }
}
