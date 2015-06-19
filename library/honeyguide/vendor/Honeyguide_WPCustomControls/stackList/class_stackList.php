<?php
if ( ! class_exists( 'WP_Customize_Control' ) ) return NULL;
require_once(dirname(dirname(__FILE__)) . '/baseClass.php');

class Honeyguide_WPCustomControls_StackList extends Honeyguide_WPCustomControls {

    public $type = 'stack-list';
    public $script = dirname(__FILE__) . '/scripts.js';

    public function __construct() {
        parent::addToEnqueuedScripts($this->type, $this->script);
    }

    public function render_content() {

    if ( empty( $this->choices ) )
        return;
    ?>
		<div class="list-group">
            <span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
                <?php
                    foreach ( $this->choices as $value => $label ) {
						echo '<a class="list-group-item" href="#" alt="' . esc_attr( $value ) . '"><i class="fa ' . $this->icons[$value] . ' fa-fw"></i>&nbsp; ' . $label . '</a>';
                    }
                ?>
        </div>
    <?php }
}