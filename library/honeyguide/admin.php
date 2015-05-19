<?php
return new honeyguide_admin();

class honeyguide_admin {

	protected $theParent;
	private $theme_name;
	private $version;

	public function __construct() {

		$this->theParent = $theParent;
		$this->theme_name = $theParent->theme_name;
		$this->version = $theParent->version;

		define('VERSION', $version);
		add_action('admin_menu', array( $this, 'honeyguide_AdminPage' ) );
		register_activation_hook( __FILE__, array( $this, 'flipCard_Options' ) );
		add_action('admin_init', array( $this, 'honeyguide_AdminInit' ) );
		add_action('admin_init', array( $this, 'honeyguide_AdminStyles' ) );
		add_action('admin_init', array( $this, 'honeyguide_AdminScripts' ) );
	}

    public function saveRef($id) {
		$this->theParent = $id;
    }

	public function honeyguide_AdminPage() {
		add_options_page( 'Beeswax Settings Page', 'beeswax', 'manage_options', 'beeswaxsettings', array( $this, 'honeyguide_Settings' ) );
	}

	public function honeyguide_Settings() {
		if ( !current_user_can( 'manage_options' ) )  {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		} 
?>
		<div class="wrap">
			<form name="honeyguide_options_form_settings_api" method="post" action="options.php">
<?php	$this->theParent->dasModel->settingsApi->show_navigation();
		$this->theParent->dasModel->settingsApi->show_forms();

		settings_fields('honeyguide_Settings');
		do_settings_sections( 'honeyguide_settings_section' );
?>
			</form>
		</div>
<?php }

	public function honeyguide_Options() {
		if( get_option('honeyguide_options') === false ) {
			$new_options['content_type'] = 'ad_listing';
			$new_options['width'] = 4;
			$new_options['height'] = 3;
			add_option('honeyguide_options', $new_options);
		}
	}

	public function honeyguide_AdminInit() {
		$sections = json_decode(file_get_contents(dirname(dirname(dirname(__FILE__))).'/views/admin/admin_settings.json'), true);
		$fields = array();
		foreach($sections as $id=>$section) {
			$partial = json_decode(file_get_contents(dirname(dirname(dirname(__FILE__))).'/views/admin/' . $section['id'] . '.json'), true);
			$fields[ $section['id'] ] = $partial;
		}
		$this->theParent->dasModel->settingsApi->set_sections( $sections );
		$this->theParent->dasModel->settingsApi->set_fields( $fields );
		$this->theParent->dasModel->settingsApi->admin_init();
	}

	public function honeyguide_AdminStyles() {
		wp_enqueue_style( $this->theme_name.'-bootstrap-styles', get_template_directory_uri() . '/bower_components/bootstrap/dist/css/bootstrap.min.css');
		wp_enqueue_style( $this->theme_name.'-bootstrap-styles', get_template_directory_uri() . '/bower_components/sass-bootstrap-glyphicons/css/bootstrap-glyphicons.css');
	}

	public function honeyguide_AdminScripts() {
		wp_enqueue_script( $this->theme_name.'-bootstrap-scripts', get_template_directory_uri() . '/bower_components/bootstrap/dist/js/bootstrap.min.js');
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
