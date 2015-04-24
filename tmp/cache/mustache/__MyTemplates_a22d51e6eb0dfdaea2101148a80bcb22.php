<?php
class __MyTemplates_a22d51e6eb0dfdaea2101148a80bcb22 extends Mustache_Template
{
    protected $strictCallables = true;
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';
        $newContext = array();

        $buffer .= $indent . '      <section class="section-full-height" style="background-image: url(../images/photo.png);">
';
        $buffer .= $indent . '        <div class="middle bounceInUp animated">
';
        $buffer .= $indent . '          <h2 class="lead text-center text-white text-shadow"><strong>Theme for everyday use</strong></h2>
';
        $buffer .= $indent . '          <h3 class="text-center text-white lead text-shadow">Product taggline or short description about it</h3>
';
        $buffer .= $indent . '        </div>
';
        $buffer .= $indent . '      </section>
';
        return $buffer;
    }
}
