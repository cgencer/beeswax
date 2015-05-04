<?php
return new stacks_customizer();

class stacks_customizer {

	protected $theParent;
	public $themeBlocks;

	public function saveRef($id) {
		$this->theParent = $id;
	}

	public function __construct() {
		add_action('customize_register', array($this, 'honeyguide_customize_register'));
		print_r( $this->getStacks() );
	}

	public function getStacks() {
		return $this->theParent->themeBlocks;
	}

	public function honeyguide_customize_register($wp_customize){

		$wp_customize->add_section(
			'stacks_section', array(
				'title'			=> __("Stacks", 'honeyguide'),
				'capability'	=> 'edit_theme_options',
				'priority'		=> 35,
				'description'	=> __("Allows you to edit your theme's stacks.", 'honeyguide')
		));


		$wp_customize->add_setting(
			'stacks_options[addStack]', array(
				'capability'	=> 'edit_theme_options',
				'type'			=> 'option',
				'default'		=> '1',
		));

		$arr = $this->theParent->themeBlocks;
		$arr = array('header', 'services', 'banners', 'team', 'counter');
		$dearr = array();
		foreach ($arr as $v) {
			$dearr[$v] = $v;
		}

		$wp_customize->add_control(
			'stacks_options[addStack]', array(
				'label'			=> __("Add a stack:", 'honeyguide'),
				'section'		=> 'stacks_section',
				'type'			=> 'select',
				'choices'		=> $dearr
		));

		$wp_customize->add_setting(
			'stacks_options[text]', array(
				'capability'	=> 'edit_theme_options',
				'type'			=> 'option',
				'default'		=> 'Custom text',
		));
		
		$wp_customize->add_control(
			'stacks_options[text]', array(
				'label'			=> 'Custom text',
				'section'		=> 'stacks_section',
				'type'			=> 'text',
		));

	}
}