<?php
if ( ! class_exists( 'WP_Customize_Control' ) ) return NULL;
require_once(dirname(dirname(__FILE__)) . '/baseClass.php');

class Honeyguide_WPCustomControls_addfromAtoB extends Honeyguide_WPCustomControls {

	public $type = 'addfromAtoB';
    public $script = dirname(__FILE__) . '/scripts.js';

    public function __construct() {
        parent::addToEnqueuedScripts($this->type, $this->script);
    }


	/**
	* This outputs the javascript needed to automate the live settings preview.
	* Also keep in mind that this function isn't necessary unless your settings 
	* are using 'transport'=>'postMessage' instead of the default 'transport'
	* => 'refresh'
	* 
	* Used by hook: 'customize_preview_init'
	* 
	* @see add_action('customize_preview_init', $func)
	* @since MyTheme 1.0
	*/
	public static function live_preview() {
		wp_enqueue_script('addfromAtoB_scripts', dirname(__FILE__) . '/scripts.js', array( 'jquery', 'customize-preview' ), '', true);
	}

	/**
	 * Displays the multiple select on the customize screen.
	 */

	public function render_content() {


//    if ( empty( $this->unselected ) )
//        return;
	?>
		<table><thead><tr>
		<td colspan="3">
		<label>
			<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
		</label>
		</td></tr></thead><tbody><tr>
		<td>
			<select multiple="multiple" style="height: 100%;" size="<?php echo $this->size; ?>">
				<?php
//        echo('<pre>');print_r($this->label);echo('</pre>');
echo('###'.$this->label.'###');
					foreach ( $this->choices as $value => $label ) {
						echo '<option value="' . esc_attr( $value ) . '">' . $label . '</option>';
					}
				?>
			</select>            
		</td><td>
			<input type="button" value=">>" /><br />
			<input type="button" value=">" /><br />
			<input type="button" value="<" /><br />
			<input type="button" value="<<" /><br />
		</td><td>
			<select multiple="multiple" style="height: 100%;" size="<?php echo $this->size; ?>">
				<?php
					foreach ( $this->enabled as $value => $label ) {
						echo '<option value="' . esc_attr( $value ) . '">' . $label . '</option>';
					}
				?>
			</select>            
		</td>
		</tr></tbody></table>
	<?php }
}
// Enqueue live preview javascript in Theme Customizer admin screen
add_action( 'customize_preview_init' , array( 'CustomizeControl_addfromAtoB' , 'live_preview' ) );
// Output custom CSS to live site
//add_action( 'wp_head' , array( 'CustomizeControl_addfromAtoB' , 'header_output' ) );
