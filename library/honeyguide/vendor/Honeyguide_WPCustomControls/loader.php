<?php
if ( ! class_exists( 'WP_Customize_Control' ) ) return NULL;
/**
 * Customize for taxonomy with dropdown, extend the WP customizer
 *
 * @package    WordPress
 * @subpackage CustomizeControl_addfromAtoB
 * @see        https://github.com/cgencer/CustomizeControl_addfromAtoB
 * @since      01/06/2015
 * @author     Cem Gencer <cem.gencer@me.com>
 * @usage      https://github.com/cgencer/CustomizeControl_addfromAtoB
 */
abstract class Honeyguide_WPCustomControls extends WP_Customize_Control {

    public $type = '';
    public $groupName = 'Honeyguide_WPCustomControls';
    public $scripts = array();
    public $required = array('font-awesome', 'jquery', 'customize-preview');

    public function __construct() {
		foreach (glob('*/class_*.php') as $filename) {
			require_once($filename);
		}
    }

// calls trough add_action:
// customize_controls_enqueue_scripts - to affect the controls in the customizer
// customize_preview_init - JS code to be in the preview frame and possibly to 
//		receive events from the controls via postMessage, and thus able to
//		dynamically change the contents of the preview frame rapidly


	/**
	* This will output the custom WordPress settings to the live theme's WP head.
	* 
	* Used by hook: 'wp_head'
	*/
	public static function header_output() {
		?>
		<!--Customizer CSS--> 
		<style type="text/css">
			<?php self::generate_css('#site-title a', 'color', 'header_textcolor', '#'); ?> 
			<?php self::generate_css('body', 'background-color', 'background_color', '#'); ?> 
			<?php self::generate_css('a', 'color', 'link_textcolor'); ?>
		</style> 
		<!--/Customizer CSS-->
		<?php
	}

	public function addToEnqueuedScripts($module, $script) {
		$this->scripts[$module] = $script;
		foreach ($this->scripts as $key => $val) {
			wp_enqueue_script($this->groupName . 'scr_' . $key, $val, $this->required, '', true);
		}
	}

	/**
	* This outputs the javascript needed to automate the live settings preview.
	* Also keep in mind that this function isn't necessary unless your settings 
	* are using 'transport'=>'postMessage' instead of the default 'transport'
	* => 'refresh'
	* 
	* Used by hook: 'customize_preview_init'
	*/
	public static function live_preview() {
	}

    public function render_content() {

    }
}