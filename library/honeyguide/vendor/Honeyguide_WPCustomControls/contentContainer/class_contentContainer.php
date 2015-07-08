<?php
if( class_exists( 'WP_Customize_Control' ) ):
//require_once(dirname(dirname(__FILE__)) . '/loader.php');

class Honeyguide_WPCustomControls_ContentContainer extends WP_Customize_Control {

    public $type = 'content-container';
    public $className = __CLASS__;
    public $required = array('jquery', 'customize-preview');

    public function __construct($manager, $id, $args = array())
    {
        add_action( 'customize_preview_init', array( $this, 'enqueue' ) );
        parent::__construct( $manager, $id, $args );
    }

    public function render_content() {

    ?>

        <span class="btn-group pull-right"> 
            <button id="trigger" class="button button-primary save" style="margin-right:5px;"><?=$this->label;?></button>
        </span>
        <div id="dynamicContentPanel_<?=$this->id;?>" class="templatePack" style="display:none;">
        <?=$this->choices;?>
        </div>

    <?php }
}
endif;

