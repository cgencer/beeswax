<?php
class beeswax_Admin {

	protected $theParent;
	private $theme_name;
	private $version;

	public function __construct( $theParent) {

		$this->theParent = $theParent;
		$this->theme_name = $theParent->theme_name;
		$this->version = $theParent->version;

		define('VERSION', $version);
		add_action( 'admin_menu', array( $this, 'beeswax_AdminPage' ) );
		register_activation_hook( __FILE__, array( $this, 'flipCard_Options' ) );
		add_action( 'admin_init', array( $this, 'beeswax_AdminInit' ) );
		add_action( 'admin_init', array( $this, 'beeswax_AdminStyles' ) );
		add_action( 'admin_init', array( $this, 'beeswax_AdminScripts' ) );
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
<?php	$this->theParent->settingsApi->show_navigation();
		$this->theParent->settingsApi->show_forms();

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
		$this->theParent->settingsApi->set_sections( $sections );
		$this->theParent->settingsApi->set_fields( $fields );
		$this->theParent->settingsApi->admin_init();
	}

	public function beeswax_AdminStyles() {
		wp_enqueue_style( $this->theme_name.'-bootstrap-styles', get_template_directory_uri() . '/bower_components/bootstrap/dist/css/bootstrap.min.css');
		wp_enqueue_style( $this->theme_name.'-bootstrap-styles', get_template_directory_uri() . '/bower_components/sass-bootstrap-glyphicons/css/bootstrap-glyphicons.css');
		wp_enqueue_style( $this->theme_name.'-admin-styles', get_template_directory_uri() . '/library/honeyguide/assets/css/admin.css', array(), $this->version, true);
	}

	public function beeswax_AdminScripts($hook) {
		wp_enqueue_script( $this->theme_name.'-bootstrap-scripts', get_template_directory_uri() . '/bower_components/bootstrap/dist/js/bootstrap.min.js');
		wp_enqueue_script( $this->theme_name.'-admin-scripts', get_template_directory_uri() . '/library/honeyguide/assets/js/admin.js', array('jquery'), $this->version, true);
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
