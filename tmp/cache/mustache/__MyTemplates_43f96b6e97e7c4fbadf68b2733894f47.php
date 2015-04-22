<?php
class __MyTemplates_43f96b6e97e7c4fbadf68b2733894f47 extends Mustache_Template
{
    protected $strictCallables = true;
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';
        $newContext = array();

        $buffer .= $indent . '      <section class="section-full-height mt-xxxlg" style="background-image: url(../images/photo-2.png);">
';
        $buffer .= $indent . '        <div class="section-full-height col-xs-offset-2 col-xs-10 col-md-offset-5 col-md-7 bg-secondary">
';
        $buffer .= $indent . '          <div class="middle">
';
        $buffer .= $indent . '            <div class="container-fluid">
';
        $buffer .= $indent . '              <div class="row">
';
        $buffer .= $indent . '                <div class="col-xs-offset-1">
';
        $buffer .= $indent . '                  <h1 class="lead text-primary">Full height section to be used</h1>
';
        $buffer .= $indent . '                  <h3 class="lead text-primary">make it clear and stylish!</h3>
';
        $buffer .= $indent . '                  <a href="#" class="btn btn-primary btn-lg">Read more</a> <a href="#" class="btn btn-default-o btn-lg">Download</a>
';
        $buffer .= $indent . '                </div>
';
        $buffer .= $indent . '              </div> <!--/.row-->
';
        $buffer .= $indent . '            </div>
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
