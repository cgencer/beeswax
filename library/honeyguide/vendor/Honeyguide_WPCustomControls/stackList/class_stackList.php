<?php
if( class_exists( 'WP_Customize_Control' ) ):
//require_once(dirname(dirname(__FILE__)) . '/loader.php');

/*
Methods
__construct                 — Constructor.
active                      — Check whether control is active to current Customizer preview.
active_callback             — Default callback used when invoking WP_Customize_Control::active().
check_capabilities          — Check if the theme supports the control and check user capabilities.
content_template            — An Underscore (JS) template for this control's content (but not its container).
enqueue                     — Enqueue control related scripts/styles.
get_content                 — Get the control's content for insertion into the Customizer pane.
get_link                    — Get the data link attribute for a setting.
input_attrs                 — Render the custom attributes for the control's input element.
json                        — Get the data to export to the client via JSON.
link                        — Render the data link attribute for the control's input element.
maybe_render                — Check capabilities and render the control.
print_template              — Render the control's JS template.
render                      — Renders the control wrapper and calls $this->render_content() for the internals.
render_content              — Render the control's content.
to_json                     — Refresh the parameters passed to the JavaScript via JSON.
value                       — Fetch a setting's value.

*/

class Honeyguide_WPCustomControls_StackList extends WP_Customize_Control {

    public $type = 'stack-list';
    public $className = __CLASS__;
    public $required = array('font-awesome', 'jquery', 'customize-preview');

//    add_action( 'customize_controls_enqueue_scripts', array( $this, 'customize_pane_scripts' ) );


    public function __construct($manager, $id, $args = array())
    {
        add_action( 'customize_preview_init', array( $this, 'enqueue' ) );
        parent::__construct( $manager, $id, $args );
    }

function inspect_scripts() {
    global $wp_scripts, $wp_styles;
    foreach( $wp_scripts->queue as $handle ) :
        echo $handle . '<br>';
    endforeach;
    echo('---<br>');
    foreach( $wp_styles->queue as $handle ) :
        echo $handle . '<br>';
    endforeach;
/*
scripts:
        customize-controls      customize-widgets       sack                media-editor            media-audiovideo
        mce-view                image-edit              wp-color-picker     jquery
styles:
        -bootstrap-styles       customize-controls      customize-widgets   wp-color-picker         media-views
        imgareaselect
*/
}

    public function enqueue()
    {
//        $this->inspect_scripts();

        wp_enqueue_style( 'font-awesome' );
        wp_enqueue_style( 'sass-bootstrap-glyphicons' );
    }

    public function render_content() {

        if ( empty( $this->choices ) )
            return;


    ?>

            <div class="container" style="width:90%;">
                <div class="list-group">
                    <?php foreach ( $this->choices as $value => $label ) { ?>

                    <a href="#" class="list-group-item clearfix">
                        <span class="glyphicon glyphicon-list"></span>
                        <?=esc_html($label);?>
                        <span class="pull-right">
                            <button class="btn btn-xs btn-primary addStack" id="<?=esc_html($label);?>">
                                <span class="glyphicon glyphicon-plus"></span>
                            </button>
                        </span>
                    </a>

                    <?php } ?>
                </div>
            </div>

    <?php }
}
endif;

