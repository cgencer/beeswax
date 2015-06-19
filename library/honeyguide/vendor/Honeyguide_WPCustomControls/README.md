# CustomizeControl_addfromAtoB
Wp theme customizer custom control for copying items from one multiselect to another

Usage:


		$wp_customize->add_setting(
			'stacks-options-addedStacks', array(
			'capability'	=> 'edit_theme_options',
			'type'			=> 'option',
			'transport' 	=> 'refresh',
			'default'		=> array()
		));

		$wp_customize->add_control(
			new CustomizeControl_addfromAtoB($wp_customize, 'stacks_options_addStack', array(
				'label'    => "Select a stack to be added",
				'settings' => 'stacks-options-addedStacks',
				'section'  => 'stacks',
				'type'     => 'addfromAtoB',
				'size'		=> 6,
				'choices' 	=> $vv,
				'enabled'	=> array()
			))
		);
