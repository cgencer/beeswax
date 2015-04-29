<?php
if( !function_exists( "templateRender" ) && class_exists('WeDevs_Settings_API') && class_exists('Mustache_Engine') ) {  

	function templateRender($template, $attributes=array(), $query=null) 
	{
		global $settings_api, $mustache, $loader;
		if($query != null)
		{
			if(!array_key_exists('post_status', $query)){         $query['post_status'] = 'publish';}
			if(!array_key_exists('posts_per_page', $query)){      $query['posts_per_page'] = 5;}
			if(!array_key_exists('orderby', $query)){             $query['orderby'] = 'menu_order name';}
			if(!array_key_exists('order', $query)){               $query['order'] = 'ASC';}
		}

		$s = "";
		if(is_array($template))
		{
			$arr = explode('-', $template['arrangement']);
			if(count($arr) > 1) {
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
							$t = $loader->load( $template['repeater'] );
							$s .= $mustache->render( $t, $attributes );
							$colNo++;
						}
					}

					// after the loop, go to next row & next query with offset & reset vars
					$offset += $colsInThisRow;
					wp_reset_query();

				}
			}
			$s = $mustache->render($loader->load( $template['container'] ), array('content' => $s));
		}else{
			$s = $mustache->render($loader->load( $template ));			
		}
		return $s;
	}
}
?>