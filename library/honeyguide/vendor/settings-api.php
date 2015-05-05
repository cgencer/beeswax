<?php
if(!class_exists('WeDevs_Settings_API')) {
	require_once( dirname(__FILE__).'/settings-api/src/class.settings-api.php' );
}
if ( class_exists( 'WeDevs_Settings_API' ) ):
class Settings_API extends WeDevs_Settings_API {
	protected $theParent;

    function saveRef($id) {
		$this->theParent = $id;
    }
    function show_forms() {
        parent::show_forms();
?>
        <script>
			jQuery(document).ready(function($) {
				$("<div class='boxedStacksList row'>" +
					"<div class='col-md-4'>" +
						"<ol class='stacks vertical'>" +
							"<li class='list-group-item'><i class='glyphicon glyphicon-align-justify' /> First</li>" +
						"</ol></div><div class='col-md-6'><ol class='stacks vertical col-md-6'>" +
						<?php foreach ($this->theParent->themeBlocks as $value) {
							echo('"<li class=\'list-group-item\'><i class=\'glyphicon glyphicon-align-justify\' /> '.$value.'</li>" +');
						} ?>
						"</ol></div>" +
					"</div>").insertBefore('.form-table');
				$("ol.stacks").sortable({
					group: 'stax',
					handle: 'i.icon-move'
				});
            });
        </script>

        <style type="text/css">
			body.dragging, body.dragging * {
			  cursor: move !important;
			}

			.dragged {
			  position: absolute;
			  opacity: 0.5;
			  z-index: 2000;
			}

			ol.stacks li.placeholder {
			  position: relative;
			  /** More li styles **/
			}
			ol.stacks li.placeholder:before {
			  position: absolute;
			  /** Define arrowhead **/
			}
			#boxedStacksList {
				border: 1px solid #999;
				padding:3px;
			}
        </style>
<?php
    }
}
endif;