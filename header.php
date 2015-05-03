<!doctype html>  

<!--[if IEMobile 7 ]> <html <?php language_attributes(); ?>class="no-js iem7"> <![endif]-->
<!--[if lt IE 7 ]> <html <?php language_attributes(); ?> class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html <?php language_attributes(); ?> class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html <?php language_attributes(); ?> class="no-js ie8"> <![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)|!(IEMobile)|!(IE)]><!--><html <?php language_attributes(); ?> class="no-js"><!--<![endif]-->

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title><?php wp_title( '|', true, 'right' ); ?></title>	
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

	<!-- wordpress head functions -->
	<?php wp_head(); ?>
	<!-- end of wordpress head -->
	<!-- IE8 fallback moved below head to work properly. Added respond as well. Tested to work. -->
	<!-- media-queries.js (fallback) -->
		<!--[if lt IE 9]>
			<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>			
			<![endif]-->

			<!-- html5.js -->
		<!--[if lt IE 9]>
			<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
			<![endif]-->	
			
			<!-- respond.js -->
		<!--[if lt IE 9]>
				  <script type='text/javascript' src="http://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.js"></script>
				  <![endif]-->	
			  </head>
			  
			  <body <?php body_class(); ?>>

  <!--[if lt IE 10]>
	  <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
	  <![endif]-->
	  <header role="banner">

		<nav class="navbar navbar-default navbar-fixed-top">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-menu">
						<span class="sr-only">Toggle navigation</span>
						<span class="fa fa-bars"></span>
					</button>
					<a class="navbar-brand" href="#">
						<img alt="Beeswax" src="images/brand.svg">
					</a>
				</div>

				<div class="collapse navbar-collapse navbar-responsive-collapse">
					<?php wp_bootstrap_main_nav('navbar-right'); // Adjust using Menus in Wordpress Admin ?>
				</div>
				<!-- Collect the nav links, forms, and other content for toggling -->
<!--
          <div class="collapse navbar-collapse navbar-responsive-collapse" id="navbar-collapse-menu">
            <ul class="nav navbar-nav navbar-right">
              <a href="#" class="btn btn-secondary navbar-btn">Sign up</a>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Home <span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li class="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Blog <span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li class="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </li>
              <li><a href="#">Login</a></li>
            </ul>
          </div>
-->

			</div><!-- /.container-fluid -->
		</nav>
	  </header> <!-- end header -->

	  
<!--
		<header role="banner">
				
			<div class="navbar navbar-default navbar-fixed-top">
				<div class="container">
		  
					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>

						<a class="navbar-brand" title="<?php echo get_bloginfo('description'); ?>" href="<?php echo home_url(); ?>"><?php bloginfo('name'); ?></a>
					</div>

					<div class="collapse navbar-collapse navbar-responsive-collapse">
						<?php wp_bootstrap_main_nav(''); // Adjust using Menus in Wordpress Admin ?>

						<?php //if(of_get_option('search_bar', '1')) {?>
						<form class="navbar-form navbar-right" role="search" method="get" id="searchform" action="<?php echo home_url( '/' ); ?>">
							<div class="form-group">
								<input name="s" id="s" type="text" class="search-query form-control" autocomplete="off" placeholder="<?php _e('Search','wpbootstrap'); ?>">
							</div>
						</form>
						<?php //} ?>
					</div>

				</div>
			</div>
		
		</header> 
	-->

	<div class="container">
