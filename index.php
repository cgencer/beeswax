<?php get_header(); ?>


<?php if (($settings_api->get_option( 'beeswax_blox_header', 'admin_settings_frontpage_builder', 'off' )) == 'on') :
  $tpl = $loader->load('header');
  echo($mustache->render($tpl));
endif; 

  $tpl = $loader->load('showcase');
  echo($mustache->render($tpl));

?>



<?php if (($settings_api->get_option( 'beeswax_blox_services', 'admin_settings_frontpage_builder', 'off' )) == 'on') :
  $tpl = $loader->load('services');
  echo($mustache->render($tpl));
endif; ?>

<?php
  $tpl = $loader->load('fullbanner_left');
  echo($mustache->render($tpl));
?>

<?php
  $tpl = $loader->load('halfbanner_right');
  echo($mustache->render($tpl));
?>

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

<?php if (($settings_api->get_option( 'beeswax_blox_counter', 'admin_settings_frontpage_builder', 'off' )) == 'on') :
  $tpl = $loader->load('counter');
  echo($mustache->render($tpl));
endif; ?>

<?php
  $tpl = $loader->load('content');
  echo($mustache->render($tpl));
?>


<?php get_footer(); ?>