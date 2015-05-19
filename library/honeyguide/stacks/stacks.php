<?php
class stacks {

	protected $theParent;
	public $settingsApi;
	public $vendorPath;
	public $templates;
	public $dasModel;
	private $stackedPages;

	public $mustacheEngine;
	public $mustacheLoader;

    public function saveRef($id) {
		$this->theParent = $id;
    }

	public function __construct() {

		$this->dasModel = require_once(dirname(__FILE__) . '/model.php');
		$obj = require_once(dirname(__FILE__) . '/customizer.php');
		if( method_exists( $obj, 'saveRef') ) {
			$obj->saveRef($this);
		}

		$this->vendorPath = dirname(dirname(__FILE__)) . '/vendor/';

		if(!class_exists('WeDevs_Settings_API')) require_once( $this->vendorPath.'settings-api.php' );
		$this->settingsApi = new Settings_API;
		$this->settingsApi->saveRef($this);
		$this->initRenderer();
	}



	public function initRenderer() {

		if($this->theParent->mustacheEngine) {
			$this->mustacheEngine = $this->theParent->mustacheEngine;
		}
	}

	public function loadPage($pageName) {

		if(get_option('stackedPages', null)) {
			if(add_option('stackedPages', '')) {
				$stackedPages = get_option('stackedPages', '');
			}
		}else{

				get_header();

				if(array_key_exists($pageName, $this->dasModel->stackedPages)) {
					foreach ($this->dasModel->stackedPages[$pageName] as $val) {
						($this->render($val).'<br>');
					}
				}

				get_footer();
		}

	}

	private function render($obj) 
	{
		global $settingsApi, $mustache, $mustacheEngine, $mustacheLoader, $loader;
		if(!$mustacheEngine) $this->initRenderer();

		if($obj) {
			$isDynamic = $obj['isDynamic'];
			$template = $obj['template'];
			$attributes = $obj['attributes'] ? $obj['attributes'] : array();
			$query = $obj['query'];
		}

		if($query != null)
		{
			if(!array_key_exists('post_status', $query)){         $query['post_status'] = 'publish';}
			if(!array_key_exists('posts_per_page', $query)){      $query['posts_per_page'] = $template['number'];}
			if(!array_key_exists('orderby', $query)){             $query['orderby'] = 'menu_order name';}
			if(!array_key_exists('order', $query)){               $query['order'] = 'ASC';}
		}

		$s = "";
		$m = new Mustache_Engine;
		if(!$isDynamic)
		{

			if($template['container']) {
//				$s = $this->mustacheEngine->render($this->mustacheLoader->load( $this->templates[ $template['container'] ] ));			
				$tpl = $m->loadTemplate( $this->templates[ $template['container'] ] );
				$s = $tpl->render($attrU);
			}

		}else{

			$attrU = array();
			if(2 > (int) $template['number']) {
					// its only one item (number isnt declared or number is 1)
					$attrU['vars'] = require(dirname(__FILE__) . '/depot/' . $template['name'] . '/' . $template['name'] . '.php');

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
// *     $m = new Mustache;
// *     $tpl = $m->loadTemplate('{{ foo }}');
// *     echo $tpl->render(array('foo' => 'bar')); // "bar"
								$attributes['vars'] = require(dirname(__FILE__) . '/depot/' . $template['repeater'] . '.php');

//								$s .= $this->mustacheEngine->render( $this->mustacheLoader->load( $this->templates[ $template['repeater'] ] ), $attributes );
								$tpl = $m->loadTemplate( $this->templates[ $template['repeater'] ] );
								$s .= $tpl->render($attrU);

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
			if($template['container']) {
//				$s = $this->mustacheEngine->render($this->mustacheLoader->load( $this->templates[ $template['container'] ] ), $attrU);
				$tpl = $m->loadTemplate( $this->templates[ $template['container'] ] );
				$s = $tpl->render($attrU);
			}
		}
		return $s;
	}


}