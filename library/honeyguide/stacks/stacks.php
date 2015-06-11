<?php
class stacks {

	protected $theParent;
	public $vendorPath;
	private $depotPath;
	public $templates;
	public $dasModel;
	private $stackedPages;

	public $mustacheEngine;
	public $mustacheLoader;

	public function __construct() {

		$this->dasModel = require_once(dirname(__FILE__) . '/model.php');
		$this->dasModel->saveRef($this);

		$obj = require_once(dirname(__FILE__) . '/customizer.php');
		if( method_exists( $obj, 'saveRef') ) {
			$obj->saveRef($this);
		}
		$this->depotPath = dirname(__FILE__) . '/depot/';

		$this->vendorPath = dirname(dirname(__FILE__)) . '/vendor/';

		if(!class_exists('WeDevs_Settings_API')) require_once( $this->vendorPath.'settings-api.php' );
		$this->settingsApi = new Settings_API;
		$this->settingsApi->saveRef($this);
		$this->initRenderer();
	}

    public function saveRef($id) {
		$this->theParent = $id;
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
					foreach ($this->dasModel->stackedPages[$pageName] as $stack) {
						echo($stack['stackName'].'<br><pre>'.$this->render($stack).'</pre><br>');
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
			$tempFiles = $obj['templateFiles'];
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
//echo('<pre>');print_r($this->dasModel->templates);echo('</pre>');

		$view = $obj['view'] ? require($this->depotPath . $obj['stackName'] . '/view.php') : new stdClass();


/*
echo('::::::::: stackName:'.$obj['stackName'].'<br>'.
	'isDynamic:'.$obj['isDynamic'].'<br>'.
	'hasSubs:'.$obj['hasSubs'].'<br>'.
	'templates:<pre>');print_r($tempFiles);echo('</pre>');
*/
		if(!$obj['isDynamic'])
		{
			if($tempFiles['container']) {
echo('Xrendering '.$obj['stackName'] . '/' . $tempFiles['container'].'<br>');
				$s = $this->theParent->mustacheEngine->render( $this->dasModel->templates[ $obj['stackName'] . '/' . $tempFiles['container'] ], $view );
			}

		}else{

			if( $obj['hasSubs'] && $tempFiles['repeater'] ) {				// its more than one item and uses a repeater

echo($obj['hasSubs'] . ' <---> ' . $tempFiles['repeater'] . '<br>');

				$arr = $view->global[0]->param->arrangement ? $view->global[0]->param->arrangement : array(1);			// ensure that arrangement attribute is set
				$tot = array_sum($arr);

				if(count($arr) > 0) {
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

//								$subView = new SubView( $this->dasModel->templates[ $obj['stackName'] . '/' . $template['repeater'] ], $view);
//die($obj['stackName'] . '/' . $tempFiles['repeater']);
echo('buffering '.$obj['stackName'] . '/' . $tempFiles['repeater'].'<br>');

  								$s .= $this->theParent->mustacheEngine->render( $this->dasModel->templates[ $obj['stackName'] . '/' . $tempFiles['repeater'] ], $view );
  
								$attributes = array();
								$colNo++;
							}
						}
					// after the loop, go to next row & next query with offset & reset vars
						$offset += $colsInThisRow;
						wp_reset_query();
					}
				} 

			} else {
				echo('no subs<br>');
				if($templates['title']) $view->title = $templates['title'];
				$view->content = $s;
			}

			if($tempFiles['container']) {
echo('Yrendering '.$obj['stackName'] . '/' . $tempFiles['container'].'<br>');
				$s = $this->theParent->mustacheEngine->render( $this->dasModel->templates[ $obj['stackName'] . '/' . $tempFiles['container'] ], $view );
			}
		}
		return $s;
	}


}