<?php
class __MyTemplates_4ba392019e429eccebb1b4545e095ca9 extends Mustache_Template
{
    protected $strictCallables = true;
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';
        $newContext = array();

        $buffer .= $indent . '      <section class="section-half-height" style="background-image: url(../images/photo.png);">
';
        $buffer .= $indent . '        <div class="section-full-height col-xs-10 col-md-7 bg-primary">
';
        $buffer .= $indent . '          <div class="middle">
';
        $buffer .= $indent . '            <div class="container-fluid">
';
        $buffer .= $indent . '              <div class="row">
';
        $buffer .= $indent . '                <div class="col-xs-offset-1">
';
        $buffer .= $indent . '                  <h2 class="lead text-secondary">Half height section to be used</h2>
';
        $buffer .= $indent . '                  <a href="#" class="btn btn-secondary btn-lg">Read more</a> <a href="#" class="btn btn-default-o btn-lg">Download</a>
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
