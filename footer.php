	  <footer class="navbar navbar-inverse mt-xxxlg">
		<div class="container">
			<div class="navbar-header">
				<a class="navbar-brand" href="#">
					<img alt="Beeswax" src="images/brand.svg">
				</a>
			</div>
			<nav class="clearfix ">
				<?php wp_bootstrap_footer_links('nav navbar-nav navbar-right'); // Adjust using Menus in Wordpress Admin ?>
			</nav>

			<div class="row">
				<div class="col-xs-12">
					<p class="text-left">&copy; <?php bloginfo('name'); ?></p>
				</div>
			</div>
		</div>
	  </footer>
	  
  </div> <!-- end #container -->
  
		<!--[if lt IE 7 ]>
			<script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
			<script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
			<![endif]-->
			
			<?php wp_footer(); // js scripts are inserted using this function ?>

			<!-- remove this for production -->

			<script src="//localhost:35729/livereload.js"></script>

		</body>

		</html>
<!--
					<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('footer1') ) : ?>
					<?php endif; ?>
					<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('footer2') ) : ?>
					<?php endif; ?>
					<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('footer3') ) : ?>
					<?php endif; ?>
-->