<?php

function ccc($wp_customize, $sp, $section, $custTypes) {

	if ( ! class_exists( 'Spyc' ) ) require_once ($this->vendorsPath . '/spyc/Spyc.php');
	$fontSet = Spyc::YAMLLoad(dirname(__FILE__) . '/vendor/fontlist.yaml')['items'];
//echo('<pre>');print_r($fontSet);echo('</pre>');

	$customFontFamilies;
	if (class_exists('Google_Font_Collection')) {
		foreach ($fontSet as $font) {
			$fonts[] = array(
				'title' => $font['family'], 
				'location' => "Ubuntu+Condensed", 
				'cssDeclaration' => "'Ubuntu Condensed', sans-serif", 
				'cssClass' => "ubuntuCondensed"
			);
		}
		$customFontFamilies = new Google_Font_Collection($fonts);
	}

	foreach ($sp[$section] as $fieldKey => $fieldData) {

		if(in_array($fieldKey, $custTypes)) {

			switch ($fieldKey) {
				case 'layout':
					$wp_customize->add_setting( 'stacks_'. $section . '_layout_picker_setting', array('default' => '',));
					$wp_customize->add_control( new LayoutPicker_Custom_Control( $wp_customize, 'stacks_'. $section . '_layout_picker_setting', array(
						'label'   => 'Layout Picker Setting',
						'section' => 'stacks_'. $section,
						'settings'   => 'stacks_'. $section . '_layout_picker_setting',
						'priority' => 2
					)));
					break;
				case 'tags':
					$wp_customize->add_setting( 'stacks_'. $section . '_tags_dropdown_setting', array('default' => '',));
					$wp_customize->add_control( new Tags_Dropdown_Custom_Control( $wp_customize, 'stacks_'. $section . '_tags_dropdown_setting', array(
						'label'   => 'Tags Dropdown Setting',
						'section' => 'stacks_'. $section,
						'settings'   => 'stacks_'. $section . '_tags_dropdown_setting',
						'priority' => 2
					)));				
					break;
				case 'taxonomy':
					$wp_customize->add_setting( 'stacks_'. $section . '_taxonomy_dropdown_setting', array('default' => ''));
					$wp_customize->add_control( new Taxonomy_Dropdown_Custom_Control( $wp_customize, 'stacks_'. $section . '_taxonomy_dropdown_setting', array(
						'label'   => 'Taxonomy Dropdown Setting',
						'section' => 'stacks_'. $section,
						'settings'   => 'stacks_'. $section . '_taxonomy_dropdown_setting',
						'priority' => 8
				)));
				case 'posttypes':
					$wp_customize->add_setting( 'stacks_'. $section . '_post_type_dropdown_setting', array('default' => ''));
    			    $wp_customize->add_control( new Post_Type_Dropdown_Custom_Control( $wp_customize, 'stacks_'. $section . '_post_type_dropdown_setting', array(
    			        'label'   => 'Post Type Dropdown Setting',
        			    'section' => 'stacks_'. $section,
        			    'settings'   => 'stacks_'. $section . '_post_type_dropdown_setting',
        			    'priority' => 6
        			)));				
					break;
				case 'posts':
					$wp_customize->add_setting( 'stacks_'. $section . '_post_dropdown_setting', array('default' => ''));
					$wp_customize->add_control( new Post_Dropdown_Custom_Control( $wp_customize, 'stacks_'. $section . '_post_dropdown_setting', array(
						'label'   => 'Post Dropdown Setting',
						'section' => 'stacks_' . $section,
						'settings'   => 'stacks_' . $section . '_post_dropdown_setting',
						'priority' => 5
					)));
				case 'datepicker':
					$wp_customize->add_setting( 'stacks_'. $section . '_date_picker_setting', array('default' => ''));
					$wp_customize->add_control( new Date_Picker_Custom_Control( $wp_customize, 'stacks_'. $section . '_date_picker_setting', array(
						'label'   => 'Date Picker Setting',
						'section' => 'stacks_'. $section,
						'settings'   => 'stacks_' . $section . '_date_picker_setting',
						'priority' => 1
					)));
				case 'googlefonts':
					$wp_customize->add_setting( 'stacks_'. $section . '_google_font_setting', array('default' => ''));
					$wp_customize->add_control( new GoogleFont_Dropdown( $wp_customize, 'stacks_'. $section . '_google_font_setting', array(
						'label'   => 'Google Font Setting',
						'section' => 'stacks_'. $section,
						'settings'   => 'stacks_'. $section . '_google_font_setting',
						'priority' => 12
					)));

/*
					$wp_customize->add_control( new Google_Font_Picker_Custom_Control( $wp_customize, 'stacks_'. $section . '_font_family_control', array(
						'label'   => __( 'Font Family', 'beeswax' ),
						'section' => 'stacks_'. $section,
						'settings' => 'stacks_' . $section . '_font_family',
						'choices' => $customFontFamilies->getFontFamilyNameArray(),
						'fonts'   => $customFontFamilies,
						'priority' => 1
					)));
*/
				default:
					# code...
					break;
			}

		}
	}
}