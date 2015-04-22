<?php

class beeswax_Admin {

	private $theme_name;
	private $version;
	private $settings_api;

	public function __construct( $theme_name, $version ) {

		$this->theme_name = $theme_name;
		$this->version = $version;
		$this->settings_api = new WeDevs_Settings_API;

		define('VERSION', $version);
		add_action( 'admin_menu', array( $this, 'beeswax_AdminPage' ) );
		register_activation_hook( __FILE__, array( $this, 'flipCard_Options' ) );
		add_action( 'admin_init', array( $this, 'beeswax_AdminInit' ) );
	}

	public function beeswax_AdminPage() {
		add_options_page( 'Beeswax Settings Page', 'beeswax', 'manage_options', 'beeswaxsettings', array( $this, 'beeswax_Settings' ) );
	}

	public function beeswax_Settings() {
		if ( !current_user_can( 'manage_options' ) )  {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		} ?>
		<div class="wrap">
			<form name="beeswax_options_form_settings_api" method="post" action="options.php">
<?php	$this->settings_api->show_navigation();
		$this->settings_api->show_forms();

		settings_fields('beeswax_Settings');
		do_settings_sections( 'beeswax_settings_section' ); ?>
			</form>
		</div>
<?php }

	public function beeswax_Options() {
		if( get_option('beeswax_options') === false ) {
			$new_options['content_type'] = 'ad_listing';
			$new_options['width'] = 4;
			$new_options['height'] = 3;
			add_option('beeswax_options', $new_options);
		}
	}

	public function beeswax_AdminInit() {

		$sections = json_decode(file_get_contents(dirname(dirname(dirname(__FILE__))).'/views/admin/admin_settings.json'), true);
		$fields = array();
		foreach($sections as $id=>$section) {
			$partial = json_decode(file_get_contents(dirname(dirname(dirname(__FILE__))).'/views/admin/' . $section['id'] . '.json'), true);
			$fields[ $section['id'] ] = $partial;
		}
		$this->settings_api->set_sections( $sections );
		$this->settings_api->set_fields( $fields );
		$this->settings_api->admin_init();
	}

	public function enqueue_styles() {
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/flipCard-admin.css', array(), $this->version, 'all' );
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/codemirror.css', array(), $this->version, 'all' );
	}

	public function enqueue_scripts() {
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/flipCard-admin.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/codemirror.js', array(), $this->version, false );
	}

	public function do_patches() {
		function remove_footer_admin () {
			echo 'Fueled by <a href="http://www.wordpress.org" target="_blank">WordPress</a> | ';
			echo 'Theme Beeswax by <a href="http://www.honeygui.de" target="_blank">Honeyguide Ventures</a></p>';
		}
		function hide_profile_fields( $contactmethods ) {
			unset($contactmethods['aim']);
			unset($contactmethods['jabber']);
			unset($contactmethods['yim']);
			return $contactmethods;
		}
		add_filter('admin_footer_text', 'remove_footer_admin');
		add_filter('user_contactmethods','hide_profile_fields', 10, 1);
	}

}
