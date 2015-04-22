<?php
class __MyTemplates_4d1e252b6e4c3d14cb7ba75ef9fe0b86 extends Mustache_Template
{
    protected $strictCallables = true;
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';
        $newContext = array();

        $buffer .= $indent . '        <div class="row mt-xxlg">
';
        $buffer .= $indent . '          <div class="col-xs-12 col-md-5">
';
        $buffer .= $indent . '            <img src="images/iPhone.png" alt="" class="img-responsive center-block mt-lg" />
';
        $buffer .= $indent . '          </div>
';
        $buffer .= $indent . '          <div class="col-xs-12 col-md-6 col-md-offset-1">
';
        $buffer .= $indent . '            <h4 class="lead text-secondary mt-xxlg">Title of this section</h4>
';
        $buffer .= $indent . '            <p class="lead text-gray-dark">Choose from multiple, completely unique designs built into one incredible theme – no additional setup required. There are currently four Stacks to choose from (with more in development).</p>
';
        $buffer .= $indent . '            <a href="#" class="btn btn-primary btn-lg">Read more</a> <a href="#" class="btn btn-secondary-o btn-lg">Download</a>
';
        $buffer .= $indent . '          </div>
';
        $buffer .= $indent . '        </div>
';
        return $buffer;
    }
}
