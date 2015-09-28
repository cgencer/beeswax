<?php

// this works: /wp-json/wp/v2/posts

class WP_REST_Stacks_Controller extends WP_REST_Controller {

	protected $post_type;

	public function __construct( $post_type ) {
		$this->post_type = $post_type;
	}
		/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {

		$base = $this->get_post_type_base( $this->post_type );

		$posts_args = array(
			'context'               => array(
				'default'           => 'view',
			),
			'page'                  => array(
				'default'           => 1,
				'sanitize_callback' => 'absint',
			),
			'per_page'              => array(
				'default'           => 10,
				'sanitize_callback' => 'absint',
			),
		);

		foreach ( $this->get_allowed_query_vars() as $var ) {
			if ( ! isset( $posts_args[ $var ] ) ) {
				$posts_args[ $var ] = array();
			}
		}

		$firephp = FirePHP::getInstance(true);
		$version = '1';
		$namespace = 'api-v' . $version;
		$base = 'stack';

		$firephp->fb('Info message from WP_REST_Stacks_Controller:', FirePHP::INFO);

		$firephp->fb('REST endpoints for '.$namespace.'/'.$base' initialized.', FirePHP::INFO);

		register_rest_route( $namespace, '/' . $base . 's', array(
			array(
				'methods'               => WP_REST_Server::READABLE,
				'callback'              => array( $this, 'get_items' ),
				'permission_callback'   => array( $this, 'get_items_permissions_check' ),
				'args'                  => array()
			),
		) );
		register_rest_route( $namespace, '/' . $base . '/(?P<id>[\d]+)', array(
			array(
				'methods'               => WP_REST_Server::READABLE,
				'callback'              => array( $this, 'get_item' ),
				'permission_callback'   => array( $this, 'get_item_permissions_check' ),
				'args'                  => array(
					'context'               => array(
						'default'               => 'view'
					),
				),
			),
		) );
		register_rest_route( $namespace, '/' . $base . '/schema', array(
			'methods'                   => WP_REST_Server::READABLE,
			'callback'                  => array( $this, 'get_public_item_schema' ),
		) );
	}

	/**
	 * Get a collection of items
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_items( $request ) {

		$args = (array) $request->get_params();
		$args['post_type'] = $this->post_type;
		$args['paged'] = $args['page'];
		$args['posts_per_page'] = $args['per_page'];
		unset( $args['page'] );

		$args = apply_filters( 'rest_post_query', $args, $request );
		$query_args = $this->prepare_items_query( $args );

		$posts_query = new WP_Query();
		$query_result = $posts_query->query( $query_args );

		$posts = array();
		foreach ( $query_result as $post ) {
			if ( ! $this->check_read_permission( $post ) ) {
				continue;
			}

			$data = $this->prepare_item_for_response( $post, $request );
			$posts[] = $this->prepare_response_for_collection( $data );
		}

		$response = rest_ensure_response( $posts );
		$count_query = new WP_Query();
		unset( $query_args['paged'] );
		$query_result = $count_query->query( $query_args );
		$total_posts = $count_query->found_posts;
		$response->header( 'X-WP-Total', (int) $total_posts );
		$max_pages = ceil( $total_posts / $request['per_page'] );
		$response->header( 'X-WP-TotalPages', (int) $max_pages );

		$base = add_query_arg( $request->get_query_params(), rest_url( '/wp/v2/' . $this->get_post_type_base( $this->post_type ) ) );
		if ( $request['page'] > 1 ) {
			$prev_page = $request['page'] - 1;
			if ( $prev_page > $max_pages ) {
				$prev_page = $max_pages;
			}
			$prev_link = add_query_arg( 'page', $prev_page, $base );
			$response->link_header( 'prev', $prev_link );
		}
		if ( $max_pages > $request['page'] ) {
			$next_page = $request['page'] + 1;
			$next_link = add_query_arg( 'page', $next_page, $base );
			$response->link_header( 'next', $next_link );
		}

		return $response;
	}

	/**
	 * Get one item from the collection
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_item( $request ) {
		//get parameters from request
		$params = $request->get_params();
		$item = array();//do a query, call another class, etc
		$data = $this->prepare_item_for_response( $item, $request );

		//return a response or error based on some conditional
		if ( 1 == 1 ) {
			return new WP_REST_Response( $data, 200 );
		}else{
			return new WP_Error( 'code', __( 'message', 'text-domain' ) );
		}
	}

	/**
	 * Check if a given request has access to get items
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	 */
	public function get_items_permissions_check( $request ) {
		return true;
//        return current_user_can( 'edit_something' );
	}

	/**
	 * Check if a given request has access to get a specific item
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	 */
	public function get_item_permissions_check( $request ) {
		return true;
//        return $this->get_items_permissions_check( $request );
	}

	/**
	 * Prepare the item for create or update operation
	 *
	 * @param WP_REST_Request $request Request object
	 * @return WP_Error|object $prepared_item
	 */
	protected function prepare_item_for_database( $request ) {
		return array();
	}

	/**
	 * Prepare the item for the REST response
	 *
	 * @param mixed $item WordPress representation of the item.
	 * @param WP_REST_Request $request Request object.
	 * @return mixed
	 */
	public function prepare_item_for_response( $item, $request ) {
		return array();
	}

	/**
	 * Get the base path for a post type's endpoints.
	 *
	 * @param object|string $post_type
	 * @return string       $base
	 */
	public function get_post_type_base( $post_type ) {
		if ( ! is_object( $post_type ) ) {
			$post_type = get_post_type_object( $post_type );
		}

		$base = ! empty( $post_type->rest_base ) ? $post_type->rest_base : $post_type->name;

		return $base;
	}

	/**
	 * Get the query params for collections
	 *
	 * @return array
	 */
	public function get_collection_params() {
		return array(
			'page'                   => array(
				'description'        => 'Current page of the collection.',
				'type'               => 'integer',
				'default'            => 1,
				'sanitize_callback'  => 'absint',
			),
			'per_page'               => array(
				'description'        => 'Maximum number of items to be returned in result set.',
				'type'               => 'integer',
				'default'            => 10,
				'sanitize_callback'  => 'absint',
			),
			'search'                 => array(
				'description'        => 'Limit results to those matching a string.',
				'type'               => 'string',
				'sanitize_callback'  => 'sanitize_text_field',
			),
		);
	}
}