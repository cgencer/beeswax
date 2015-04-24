<?php
class __MyTemplates_3d8d5ff5451fd775ed4fbf3ab25b0efa extends Mustache_Template
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
        $buffer .= $indent . '            <h2 class="lead text-center text-primary">Our Services</h2>
';
        $buffer .= $indent . '          </div>
';
        $buffer .= $indent . '        </div>
';
        $buffer .= $indent . '        <div class="row">
';
        $buffer .= $indent . '          <div class="col-xs-12 col-md-4 wow bounceInUp">
';
        $buffer .= $indent . '            <img src="images/wrench.svg" alt="" class="center-block img-responsive" />
';
        $buffer .= $indent . '            <h4 class="lead text-secondary text-center mt-lg">Title of this section</h4>
';
        $buffer .= $indent . '          </div>
';
        $buffer .= $indent . '          <div class="col-xs-12 col-md-4 wow bounceInUp" data-wow-delay=".25s">
';
        $buffer .= $indent . '            <img src="images/watch.svg" alt="" class="center-block img-responsive" />
';
        $buffer .= $indent . '            <h4 class="lead text-secondary text-center mt-lg">Title of this section</h4>
';
        $buffer .= $indent . '          </div>
';
        $buffer .= $indent . '          <div class="col-xs-12 col-md-4 wow bounceInUp" data-wow-delay=".5s">
';
        $buffer .= $indent . '            <img src="images/laptop.svg" alt="" class="center-block img-responsive" />
';
        $buffer .= $indent . '            <h4 class="lead text-secondary text-center mt-lg">Title of this section</h4>
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
