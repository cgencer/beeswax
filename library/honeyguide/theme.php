<?php
class honeyguide_theme {

	public $theme_name;
	public $version;
	public $settingsApi;
	public $admin;
	public $mustacheEngine;
	public $mustacheLoader;
	private $themeFiles = array('theme_setup', 'cleanerwp', 'customizer', 'plugins', 'utils', 'sidebars', 'shortcodes', 'pagetypes', 'admin');
	public $themeBlocks = array('header', 'services', 'banners', 'team', 'counter');

	public function __construct( $theme_name, $version ) {

		$this->theme_name = $theme_name;
		$this->version = $version;

		$this->settingsApi = new Settings_API;
		$this->settingsApi->saveRef($this);

		// Add Translation Option
		load_theme_textdomain( 'wpbootstrap', TEMPLATEPATH.'/languages' );
		$locale = get_locale();
		$locale_file = TEMPLATEPATH . "/languages/$locale.php";
		if ( is_readable( $locale_file ) ) require_once( $locale_file );
		foreach ($this->themeFiles as $file) {
			if ( is_readable( dirname(__FILE__) . '/' . $file . '.php' ) )
				$obj = require_once( dirname(__FILE__) . '/' . $file . '.php' );
				if( method_exists( $obj, 'saveRef') ) {
					$obj->saveRef($this);
				}
		}

		$this->mustacheEngine = new Mustache_Engine(array(
			'template_class_prefix' 		=> '__MyTemplates_',
			'cache' 						=> dirname(dirname(dirname(__FILE__))).'/tmp/cache/mustache',
			'cache_file_mode' 				=> 0666, // Please, configure your umask instead of doing this :)
			'cache_lambda_templates' 		=> true,
			'helpers' 						=> array('i18n' => function($text) {
				// do something translatey here...
			}),
			'escape' 						=> function($value) {
				return htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
			},
			'charset' 						=> 'UTF-8',
			'logger' 						=> new Mustache_Logger_StreamLogger('php://stderr'),
			'strict_callables' 				=> true,
			'pragmas' 						=> [Mustache_Engine::PRAGMA_FILTERS],
			'partials_loader'				=> new Mustache_Loader_FilesystemLoader( dirname(__FILE__).'/stacks/front', array('extension' => 'tpl') )
		));
		$this->mustacheLoader = new Mustache_Loader_FilesystemLoader( dirname(__FILE__).'/stacks/front', array('extension' => 'tpl') );
	}

//	if( /* !method_exists('honeyguide_theme', 'templateRender') && */ class_exists('WeDevs_Settings_API') && class_exists('Mustache_Engine') ) {

		public function templateRender($isDynamic, $template, $attributes=array(), $query=null) 
		{
			global $settingsApi, $mustache, $loader;
			if($query != null)
			{
				if(!array_key_exists('post_status', $query)){         $query['post_status'] = 'publish';}
				if(!array_key_exists('posts_per_page', $query)){      $query['posts_per_page'] = $template['number'];}
				if(!array_key_exists('orderby', $query)){             $query['orderby'] = 'menu_order name';}
				if(!array_key_exists('order', $query)){               $query['order'] = 'ASC';}
			}

			$s = "";
			if($isDynamic)
			{
				$arr = explode('-', $template['arrangement']);
				if(count($arr) >= 1) {
				// it is multi-rows
					$offset = 0;
					$colsInThisRow = 0;

				// loop trough rows
					for ($rowNo = 0; $rowNo < count($arr); $rowNo++) { 

					// loop trough cols
						$colsInThisRow = (int) $arr[$rowNo];

					// get the cols as seperate queries
						$query['posts_per_page'] = $colsInThisRow;
						$query['offset'] = $offset;
						$posts = new WP_Query($query);
						$colNo = 0;
						if( $posts->have_posts() ) {
							while ($posts->have_posts()) {
								$posts->the_post();
//echo "<pre>"; print_r($posts); echo "</pre>";

								$attachments = get_posts( array(
									'post_type' => 'attachment',
									'numberposts' => -1,
									'post_status' => null,
									'post_parent' => $posts->posts[$colNo]->ID
									) );

								$attributes['columns'] = "col-md-" . (string) (12 / $colsInThisRow);
								$attributes['post'] = $posts->posts[$colNo];
								$attributes['attachments'] = $attachments;
								$attributes['tags'] = get_the_tags();

								$cfk = get_post_custom_keys();
								foreach ( $cfk as $key => $value ) {
									$valuet = trim($value);
									if ( '_' == $valuet{0} )
										continue;
									$attributes['meta'][$key] = $value;
								}
								$attributes['metakeys'] = $cfk;

								$s .= $this->mustacheEngine->render( $this->mustacheLoader->load( $template['repeater'] ), $attributes );
								$colNo++;
							}
						}

					// after the loop, go to next row & next query with offset & reset vars
						$offset += $colsInThisRow;
						wp_reset_query();

					}
				}
				$attrU['title'] = $template['title'];
				$attrU['content'] = $s;
				$s = $this->mustacheEngine->render($this->mustacheLoader->load( $template['container'] ), $attrU);
			}else{
				$s = $this->mustacheEngine->render($this->mustacheLoader->load( $template['name'] ));			
			}
			return $s;
		}
//	}
}
