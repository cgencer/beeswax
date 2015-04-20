<?php 

function call_beeswax_pagetypes() {
	new beeswax_pagetypes();
}

if ( is_admin() ) {
	add_action( 'load-post.php', 'call_beeswax_pagetypes' );
	add_action( 'load-post-new.php', 'call_beeswax_pagetypes' );
}

class beeswax_pagetypes {

	public function __construct() {
		add_action( 'init', array($this, 'page_types') );
		add_action( 'add_meta_boxes', array( $this, 'add_meta_box' ) );
		add_action( 'save_post', array( $this, 'save' ) );
	}

	public function page_types() {
		$labels = array(
			'name'               => _x( 'Team', 'post type general name', 'beeswax' ),
			'singular_name'      => _x( 'Team Member', 'post type singular name', 'beeswax' ),
			'menu_name'          => _x( 'Team', 'admin menu', 'beeswax' ),
			'name_admin_bar'     => _x( 'Team Member', 'add new on admin bar', 'beeswax' ),
			'add_new'            => _x( 'Add New', 'book', 'beeswax' ),
			'add_new_item'       => __( 'Add New Member', 'beeswax' ),
			'new_item'           => __( 'New Member', 'beeswax' ),
			'edit_item'          => __( 'Edit Member', 'beeswax' ),
			'view_item'          => __( 'View Member', 'beeswax' ),
			'all_items'          => __( 'All Members', 'beeswax' ),
			'search_items'       => __( 'Search Team Member', 'beeswax' ),
			'parent_item_colon'  => __( 'Parent Team Member:', 'beeswax' ),
			'not_found'          => __( 'No team member found.', 'beeswax' ),
			'not_found_in_trash' => __( 'No team members found in Trash.', 'beeswax' )
			);

		$args = array(
			'labels'             => $labels,
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'show_in_admin_bar'  => true,
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'teammembers' ),
			'capability_type'    => 'post',
			'has_archive'        => false,
			'hierarchical'       => false,
			'menu_position'      => 20,
			'supports'           => array( 'title', 'editor', 'thumbnail' )
			);
		register_post_type( 'teammembers', $args );

	}

	public function add_meta_box( $post_type ) {
		$post_types = array('teammembers'); 

		if ( in_array( $post_type, $post_types )) {
			add_meta_box(
				'beeswax_team' ,__( 'Social Media Links', 'beeswax' ), 
				array( $this, 'render_meta_box_content' ), $post_type, 'advanced', 'high' );
		}
	}

	public function save( $post_id ) {
		if ( ! isset( $_POST['myplugin_meta_box_nonce'] ) ) {
			return;
		}
		if ( ! wp_verify_nonce( $_POST['beeswax_team_meta_box_nonce'], 'beeswax_team_meta_box' ) ) {
			return;
		}
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}
		if ( isset( $_POST['post_type'] ) && 'page' == $_POST['post_type'] ) {
			if ( ! current_user_can( 'edit_page', $post_id ) ) {
				return;
			}
		} else {
			if ( ! current_user_can( 'edit_post', $post_id ) ) {
				return;
			}
		}
		if ( ! isset( $_POST['beeswax_team_new_field'] ) ) {
			return;
		}
		$my_data = sanitize_text_field( $_POST['beeswax_team_new_field'] );
		update_post_meta( $post_id, '_my_meta_value_key', $my_data );
	}

	public function render_meta_box_content( $post ) {

		wp_nonce_field( 'beeswax_team_inner_custom_box', 'beeswax_team_inner_custom_box_nonce' );

		$value = get_post_meta( $post->ID, '_my_meta_value_key', true );

		// Display the form, using the current value.
		echo '<label for="beeswax_team_new_field">';
		_e( 'Description for this field', 'beeswax' );
		echo '</label> ';
		echo '<input type="text" id="beeswax_team_new_field" name="beeswax_team_new_field"';
		echo ' value="' . esc_attr( $value ) . '" size="25" />';
	}
}
?>