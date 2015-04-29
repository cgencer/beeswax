<?php
class __MyTemplates_4a5b2d80124eacc7e0ae5596c48a3979 extends Mustache_Template
{
    protected $strictCallables = true;
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';
        $newContext = array();

        $buffer .= $indent . '          <div class="col-xs-12 ';
        $value = $this->resolveValue($context->find('columns'), $context, $indent);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '">
';
        $buffer .= $indent . '            <div class="mt-lg">
';
        $buffer .= $indent . '              <figure class="team-member">
';
        $buffer .= $indent . '                <img src="';
        $value = $this->resolveValue($context->find('image'), $context, $indent);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '" alt="img25"/>
';
        $buffer .= $indent . '                <figcaption>
';
        $buffer .= $indent . '                  <span class="title">
';
        $buffer .= $indent . '                    <h1 class="mt-none mb-none">';
        $value = $this->resolveValue($context->findDot('post.post_title'), $context, $indent);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '</h1>
';
        $buffer .= $indent . '                    <h4 class="mt-none mb-none">Head of Products</h4>
';
        $buffer .= $indent . '                  </span>
';
        $buffer .= $indent . '                  <p class="description text-center">
';
        $buffer .= $indent . '                    <a href="#" class="text-white"><i class="fa fa-4x fa-twitter"></i></a>
';
        $buffer .= $indent . '                    <a href="#" class="text-white"><i class="fa fa-4x fa-linkedin"></i></a>
';
        $buffer .= $indent . '                    <a href="#" class="text-white"><i class="fa fa-4x fa-skype"></i></a>
';
        $buffer .= $indent . '                  </p>
';
        $buffer .= $indent . '                </figcaption>
';
        $buffer .= $indent . '              </figure>
';
        $buffer .= $indent . '            </div>
';
        $buffer .= $indent . '          </div>
';
        return $buffer;
    }
}
