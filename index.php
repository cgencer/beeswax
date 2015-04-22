<?php get_header(); ?>


<?php if (($settings_api->get_option( 'beeswax_blox_header', 'admin_settings_frontpage_builder', 'off' )) == 'on') : ?>
      <section class="section-full-height" style="background-image: url(../images/photo.png);">
        <div class="middle bounceInUp animated">
          <h2 class="lead text-center text-white text-shadow"><strong>Theme for everyday use</strong></h2>
          <h3 class="text-center text-white lead text-shadow">Product taggline or short description about it</h3>
        </div>
      </section>
<?php endif; ?>

      <section class="container mt-xxxlg">
        <div class="row">
          <div class="col-md-12">
            <h2 class="lead text-center text-primary mb-none">What do we do?</h2>
          </div>
        </div>

        <div class="row mt-xxlg">
          <div class="col-md-6">
            <h4 class="lead text-secondary mt-xxlg">Title of this section</h4>
            <p class="lead text-gray-dark">Choose from multiple, completely unique designs built into one incredible theme – no additional setup required. There are currently four Stacks to choose from (with more in development).</p>
            <a href="#" class="btn btn-primary btn-lg">Read more</a> <a href="#" class="btn btn-secondary-o btn-lg">Download</a>
          </div>
          <div class="col-md-5 col-md-offset-1">
            <img src="images/iPhone.png" alt="" class="img-responsive center-block mt-lg" />
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <hr />
          </div>
        </div>

        <div class="row mt-xxlg">
          <div class="col-xs-12 col-md-5">
            <img src="images/iPhone.png" alt="" class="img-responsive center-block mt-lg" />
          </div>
          <div class="col-xs-12 col-md-6 col-md-offset-1">
            <h4 class="lead text-secondary mt-xxlg">Title of this section</h4>
            <p class="lead text-gray-dark">Choose from multiple, completely unique designs built into one incredible theme – no additional setup required. There are currently four Stacks to choose from (with more in development).</p>
            <a href="#" class="btn btn-primary btn-lg">Read more</a> <a href="#" class="btn btn-secondary-o btn-lg">Download</a>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <hr />
          </div>
        </div>
      </section>

<?php if (($settings_api->get_option( 'beeswax_blox_services', 'admin_settings_frontpage_builder', 'off' )) == 'on') : ?>
      <section class="container mt-xxxlg">
        <div class="row">
          <div class="col-xs-12">
            <h2 class="lead text-center text-primary">Our Services</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-4 wow bounceInUp">
            <img src="images/wrench.svg" alt="" class="center-block img-responsive" />
            <h4 class="lead text-secondary text-center mt-lg">Title of this section</h4>
          </div>
          <div class="col-xs-12 col-md-4 wow bounceInUp" data-wow-delay=".25s">
            <img src="images/watch.svg" alt="" class="center-block img-responsive" />
            <h4 class="lead text-secondary text-center mt-lg">Title of this section</h4>
          </div>
          <div class="col-xs-12 col-md-4 wow bounceInUp" data-wow-delay=".5s">
            <img src="images/laptop.svg" alt="" class="center-block img-responsive" />
            <h4 class="lead text-secondary text-center mt-lg">Title of this section</h4>
          </div>
        </div>
      </section>
<?php endif; ?>

      <section class="section-full-height mt-xxxlg" style="background-image: url(../images/photo-2.png);">
        <div class="section-full-height col-xs-offset-2 col-xs-10 col-md-offset-5 col-md-7 bg-secondary">
          <div class="middle">
            <div class="container-fluid">
              <div class="row">
                <div class="col-xs-offset-1">
                  <h1 class="lead text-primary">Full height section to be used</h1>
                  <h3 class="lead text-primary">make it clear and stylish!</h3>
                  <a href="#" class="btn btn-primary btn-lg">Read more</a> <a href="#" class="btn btn-default-o btn-lg">Download</a>
                </div>
              </div> <!--/.row-->
            </div>
          </div>
        </div>
      </section>

      <section class="section-half-height" style="background-image: url(../images/photo.png);">
        <div class="section-full-height col-xs-10 col-md-7 bg-primary">
          <div class="middle">
            <div class="container-fluid">
              <div class="row">
                <div class="col-xs-offset-1">
                  <h2 class="lead text-secondary">Half height section to be used</h2>
                  <a href="#" class="btn btn-secondary btn-lg">Read more</a> <a href="#" class="btn btn-default-o btn-lg">Download</a>
                </div>
              </div> <!--/.row-->
            </div>
          </div>
        </div>
      </section>

<?php if (($settings_api->get_option( 'beeswax_blox_team', 'admin_settings_frontpage_builder', 'off' )) == 'on') : ?>
      <section class="container mt-xxxlg">
        <div class="row">
          <div class="col-xs-12">
            <h2 class="lead text-center text-primary mb-none">Our Team</h2>
          </div>
        </div>
        <div class="row">
<?php
$cx = explode('-', $settings_api->get_option( 'beeswax_blox_teamdist', 'admin_settings_frontpage_builder', '2-3' ));

foreach ($cx as $key => $val) {
$cols = "col-md-12";
if($val=="2"){$cols = "col-md-6";}
if($val=="3"){$cols = "col-md-4";}
if($val=="4"){$cols = "col-md-3";}
for ($i=0; $i < (int)$val ; $i++) { 
  $tpl = $loader->load('team_members');
  echo($mustache->render($tpl, array('cols' => $cols)));
}
}?>
        </div>
      </section>
<?php endif; ?>

<?php if (($settings_api->get_option( 'beeswax_blox_counter', 'admin_settings_frontpage_builder', 'off' )) == 'on') : ?>
      <section class="section-full-height mt-xxxlg" style="background-image: url(../images/photo-3.png);">
        <div class="middle">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 wow tada">
                <h1 class="lead text-white text-center text-white text-shadow"><i class="fa fa-rocket fa-2x"></i></h1>
                <h1 class="lead text-center text-white text-shadow"><strong>100000+ and counting</strong></h1>
              </div> <!--/.col-->
            </div> <!--/.row-->
          </div>
        </div>
      </section>
<?php endif; ?>

      <section class="container mt-xxxlg">
        <div class="row mt-xxlg">
          <div class="col-md-6">
            <h4 class="lead text-secondary mt-xxlg">Title of this section</h4>
            <p class="lead text-gray-dark">Choose from multiple, completely unique designs built into one incredible theme – no additional setup required. There are currently four Stacks to choose from (with more in development).</p>
            <a href="#" class="btn btn-primary btn-lg">Read more</a> <a href="#" class="btn btn-secondary-o btn-lg">Download</a>
          </div>
          <div class="col-md-5 col-md-offset-1 mt-lg">
            <img src="images/photo-3.png" alt="" class="img-responsive">
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <hr class="mt-xlg" />
          </div>
        </div>

        <div class="row mt-xxlg">
          <div class="col-md-5 mt-lg">
            <img src="images/photo-3.png" alt="" class="img-responsive">
          </div>
          <div class="col-md-6  col-md-offset-1">
            <h4 class="lead text-secondary mt-xxlg">Title of this section</h4>
            <p class="lead text-gray-dark">Choose from multiple, completely unique designs built into one incredible theme – no additional setup required. There are currently four Stacks to choose from (with more in development).</p>
            <a href="#" class="btn btn-primary btn-lg">Read more</a> <a href="#" class="btn btn-secondary-o btn-lg">Download</a>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <hr class="mt-xlg" />
          </div>
        </div>
      </section>

<?php get_footer(); ?>