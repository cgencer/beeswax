<?php
class stacks {

	protected $theParent;
	public $settingsApi;
	public $vendorPath;

	public $mustacheEngine;
	public $mustacheLoader;

    public function saveRef($id) {
		$this->theParent = $id;
    }

	public function __construct( ) {

		$this->vendorPath = dirname(dirname(__FILE__)) . '/vendor/';

		if(!class_exists('WeDevs_Settings_API')) require_once( $this->vendorPath.'settings-api.php' );
		$this->settingsApi = new Settings_API;
		$this->settingsApi->saveRef($this);


		$this->initRenderer();
	}

	public function initRenderer() {

		if(!$this->theParent) {
			if(!class_exists('Mustache_Engine')) require_once( $this->vendorPath.'mustache-php/mustache.php' );
			if(!class_exists('Khromov\Mustache_Cache\Mustache_Cache_WordPressCache')) require_once( $this->vendorPath.'mustache-cache/src/Mustache_Cache_WordPressCache.php' );	
		}else{
			$this->mustacheEngine = $this->theParent->mustacheEngine;
			$this->mustacheLoader = $this->theParent->mustacheLoader;
		}
	}

	public function loadPage() {

		if(get_option('stackedPages', null)) {
			if(add_option('stackedPages', '')) {
				$stackedPages = get_option('stackedPages', '');
			}
		}else{
				if ( ! class_exists( 'Spyc' ) ) require_once ($this->vendorsPath . '/spyc/Spyc.php');
				$stackedPages = Spyc::YAMLLoad(dirname(__FILE__) . '/index.yaml');

				get_header();
				foreach ($stackedPages as $val) {
					foreach ($val as $k => $v) {
					echo('<pre><b>'.$k.'</b><br>');var_dump($v);echo('</pre>');
					}
				}
				get_footer();

		}
		echo $this->templateRender(true, array('name' => 'header', 'container'=> 'header'));

	}

	public function templateRender($isDynamic, $template, $attributes=array(), $query=null) 
	{
		global $settingsApi, $mustache, $mustacheEngine, $mustacheLoader, $loader;
		if(!$mustacheEngine) $this->initRenderer();

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
			$attrU = array();
			if(2 > (int) $template['number']) {

					// its only one item
					$attrU['vars'] = require(dirname(__FILE__) . '/admin/' . $template['name'] . '.php');

			}else{
				$arr = explode('-', $template['arrangement']);
				if(count($arr) >= 1) {
				// it is multi-rows
					$offset = 0;
					$colsInThisRow = 0;
					$s = "";

				// loop trough rows
					for ($rowNo = 0; $rowNo < count($arr); $rowNo++) { 

					// loop trough cols
						$colsInThisRow = (int) $arr[$rowNo];
						$colsInThisRow = (!is_int($colsInThisRow) || 0 == $colsInThisRow) ? 1 : $colsInThisRow;

					// get the cols as seperate queries
						$query['posts_per_page'] = $colsInThisRow;
						$query['offset'] = $offset;
						$posts = new WP_Query($query);
						$colNo = 0;
						if( $posts->have_posts() ) {
							while ($posts->have_posts()) {
								$posts->the_post();

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

								$cfk = get_post_custom();
								foreach ( $cfk as $key => $value ) {
									if( '_' != substr($key, 0, 1) ) {
										$attributes['cfield'][$key] = $value[0];
									}
								}
								$attributes['vars'] = require(dirname(__FILE__) . '/admin/' . $template['repeater'] . '.php');

								$s .= $this->mustacheEngine->render( $this->mustacheLoader->load( $template['repeater'] ), $attributes );
								$attributes = array();
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
			}
			$s = $this->mustacheEngine->render($this->mustacheLoader->load( $template['container'] ), $attrU);
		}else{
			$s = $this->mustacheEngine->render($this->mustacheLoader->load( $template['name'] ));			
		}
		return $s;
	}


}