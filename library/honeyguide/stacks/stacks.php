<?php
class stacks {

	protected $theParent;
	public $vendorPath;
	private $depotPath;
	public $templates;
	public $dasModel;
	private $stackedPages;
	public $stackMenu;

	public $mustacheEngine;
	public $mustacheLoader;

	public $debug = false;

	public function __construct() {
	}

    public function saveRef($id) {
		$this->theParent = $id;

		$this->dasModel = require_once(dirname(__FILE__) . '/model.php');
		$this->dasModel->saveRef($this);

		$this->depotPath = dirname(__FILE__) . '/depot/';
		$this->vendorPath = dirname(dirname(__FILE__)) . '/vendor/';
		$this->jsUrl = get_template_directory_uri() . '/bower_components/';

		$this->dasModel->saveUtil(require_once( dirname(dirname(__FILE__)) . '/utils.php' ) );

		if(!class_exists('WeDevs_Settings_API'))	require_once($this->vendorPath.'settings-api.php');
		if(!class_exists('FirePHP')) 				require_once($this->vendorPath.'firephp/lib/FirePHPCore/fb.php');
		ob_start();			// to use FirePHP
		$this->settingsApi = new Settings_API;
		$this->settingsApi->saveRef($this);
		$this->initRenderer();

		$obj = require_once(dirname(__FILE__) . '/customizer.php');
		if( method_exists( $obj, 'saveRef') ) {
			$obj->saveRef($this);
			if($this->theParent->mustacheEngine) {
				$this->mustacheEngine = $this->theParent->mustacheEngine;
				$this->stackMenu = $this->mustacheEngine->render(file_get_contents(dirname(__FILE__).'/stackMenu.tpl'), null);
//				echo('###'.strlen($this->stackMenu).'###');
			}
		}
    }

	public function initRenderer() {
        wp_register_style( 'font-awesome', $this->jsUrl . 'font-awesome/css/font-awesome.css', array(), '4.2.0');
        wp_enqueue_style( 'font-awesome' );

        wp_register_style( 'sass-bootstrap-glyphicons', $this->jsUrl . 'sass-bootstrap-glyphicons/css/bootstrap-glyphicons.css');
        wp_enqueue_style( 'sass-bootstrap-glyphicons' );

//        wp_register_style( 'jquery-sortable', $this->jsPath . '/jquery-sortable/source/css/font-awesome.min.css');
//        wp_enqueue_style( 'jquery-sortable' );

	}

	public function loadPage($pageName) {

		if(get_option('stackedPages', null)) {
			if(add_option('stackedPages', '')) {
				$stackedPages = get_option('stackedPages', '');
			}
		}else{

			get_header();
			if(array_key_exists($pageName, $this->dasModel->stackedPages)) {
				foreach ($this->dasModel->stackedPages[$pageName] as $stack) {
					echo($this->render($stack));
				}
			}
			get_footer();
			echo('<div id="stackEditingContainer" style="display:none;">' . 
				$this->mustacheEngine->render(file_get_contents(dirname(__FILE__).'/stackMenu.tpl'), null) .
				'</div>');
 		}

	}

// OK 1. read from index.yaml for building customizer/multiselect
// OK 2. patch to grab the template names from $templates['PARAM'][$names]
// 3. add selected items from multiselect into live stacks with renaming thus and copying their datapacks into instances (saving exported var_exports)
// 4. build page from instances folder

	private function render($stack) 
	{
		if(!$stack) return false;

		global $settingsApi, $mustache, $mustacheEngine, $mustacheLoader, $loader, $wp_query;
		if(!$mustacheEngine) $this->initRenderer();
//echo('<pre>');var_dump(array_keys($this->dasModel->templates));echo('</pre>');
		$dirs = $this->dasModel->distributeTemplates();
		$param = $dirs['PARAM'][$stack];
		$theFiles = $param['templateFiles'];

		$s = "";

		$export = new stdClass();
		$view = require($this->depotPath . $stack . '/view.php');
		$view->global = $view->set['global'][0];

		if($view->set['query'])
		{
			if(!array_key_exists('post_status', $view->set['query'])){         $query['post_status'] = 'publish';}
			if(!array_key_exists('posts_per_page', $view->set['query'])){      $query['posts_per_page'] = $template['number'];}
			if(!array_key_exists('orderby', $view->set['query'])){             $query['orderby'] = 'menu_order name';}
			if(!array_key_exists('order', $view->set['query'])){               $query['order'] = 'ASC';}
		}

//echo('<pre>');var_dump($stack);echo('</pre>');
//echo('<pre>');var_dump($this->dasModel->dirs['PARAM']);echo('</pre>');
		if(!$param['isDynamic'] && $theFiles['container'])
		{

			$s = ($this->dasModel->templates[$stack . '/' . $theFiles['container']]) ? $this->theParent->mustacheEngine->render( $this->dasModel->templates[$stack . '/' . $theFiles['container']], $view ) : '';

		}else{

			$s = "";
			if( $param['hasSubs'] && $theFiles['repeater'] ) {				// its more than one item and uses a repeater

				$arr = $view->set['global'][0]['param']['arrangement'] ? $view->set['global'][0]['param']['arrangement'] : array(1);			// ensure that arrangement attribute is set
				$tot = array_sum($arr);

				$export->subviews = ($tot>1) ? array() : $view;

				if($tot > 0) {
				// it is multi-rows
					$offset = 0;
					$colsInThisRow = 0;
					$whichRow = 0;

					// loop trough rows
					for ($rowNo = 0; $rowNo < count($arr); $rowNo++) { 

					// loop trough cols
						$colsInThisRow = (int) $arr[$rowNo];
						$colsInThisRow = (!is_int($colsInThisRow) || 0 == $colsInThisRow) ? 1 : $colsInThisRow;

					// get the cols as seperate queries
						$query['posts_per_page'] = $colsInThisRow;
						$query['offset'] = $offset;
						$query = array_merge($query, $view->set['query']);

						$posts = new WP_Query($query);

						$export->param = $param;
						$export->query = $query;

//echo($this->dasModel->dump($posts));
						$colNo = 0;
						if( $posts->have_posts() ) {
							while ($posts->have_posts()) {
								$posts->the_post();
								$view->post = $posts->posts[$colNo];
//echo($colNo.'::: '.$posts->posts[$colNo]->ID);

								$view->columns = 'col-md-' . (string) (12 / $colsInThisRow);
								$view->tags = get_tags( $posts->posts[$colNo]->ID );
								$view->attachments = get_posts( array(
									'post_type' => 'attachment',
									'numberposts' => -1,
									'post_status' => null,
									'post_parent' => $posts->posts[$colNo]->ID
								));

								$view->tags = ($view->set['global'][0]['param']['taxonomy']) ? get_the_terms( $posts->posts[$colNo]->ID, $view->set['global'][0]['param']['taxonomy'] ) : array();

								$cfk = get_post_custom();
								foreach ( $cfk as $key => $value ) {
									if( '_' != substr($key, 0, 1) ) {
										$view->customfields[$key] = $value[0];
									}
								}
								$export->subviews[] = $view;

								$s .= ($this->dasModel->templates[$stack . '/' . $theFiles['repeater']]) ? $this->theParent->mustacheEngine->render( $this->dasModel->templates[$stack . '/' . $theFiles['repeater']], $view ) : '';

								$view->tags = array();
								$view->attachments = array();
								$view->columns = 'col-md-12';
								$colNo++;
							}
						}
					// after the loop, go to next row & next query with offset & reset vars
						$offset += $colsInThisRow;
						wp_reset_query();
					}
				} 
		
			} else {
				if($templates['title']) $view->title = $templates['title'];
			}
			$view->content = $s;

			if($theFiles['container']) {
				$s = ($this->dasModel->templates[$stack . '/' . $theFiles['container']]) ? $this->theParent->mustacheEngine->render( $this->dasModel->templates[$stack . '/' . $theFiles['container']], $view ) : '';
				$export->view = $view;
			}
		}
//		$this->dasModel->dump($export, $stack.'_'.'');

		return (preg_replace('/<section /', '<section alt="' . $stack . '" ', $s));
//		return $s;
	}
}
