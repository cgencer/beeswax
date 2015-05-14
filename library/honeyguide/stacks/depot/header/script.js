(function($, api) {
    'use strict';

    // wp-admin/js/customize-controls.js
    //		Contains special objects related to the theme customizer interface including 
    //		Setting, ColorControl, PreviewFrame, Previewer, and more.
    // wp-includes/js/customize-preview.js
    //		Sets up and creates the theme customizer interface.
    // wp-includes/js/customize-base.js
    //		All theme customizer objects from the above two files are built (i.e. extended from)
    //		theme base objects. These base-objects are helpful for showing us what common access 
    //		functions are available for the higher level objects.

    // Control objects are stored in wp.customize.control (as a collection of Values) 
    // setting objects are stored in wp.customize itself (as a collection of Values)
    // Values class has the following useful access functions that we can use to extract:
    //		instance( id ) – Gets an object from the collection with the specified ‘id’.
    //		has( id ) – Returns true if collection contains an object with the specified ‘id’ and false otherwise.
    //		add( id, value ) – Adds an object to the collection with the specified id and value.
    //		remove( id ) – Removes an object from the collection.
    //		create( id ) – Creates a new object using the default constructor, and adds it to the collection.
    //		each( callback, context ) – Iterates over elements within the collection

    // iterate over sections / settings:
    //		wp.customize.panel.each( function ( panel ) { /* ... */ } );
    //		wp.customize.section.each( function ( section ) { /* ... */ } );
    // to get the children of panels and sections
    // 		sections = wp.customize.panel( 'widgets' ).sections();
    //		controls = wp.customize.section( 'title_tagline' ).controls();
    // move all controls from one section to another
    //		_.each( wp.customize.section( 'title_tagline' ).controls(), function ( control ) {
    //			control.section( 'nav' );
    //		});

    // open a section
    //		wp.customize.section('stacks_teammembers').focus();
    // enable a section
    //		wp.customize.section('stacks_teammembers').activate();
    // disable a section
    //		wp.customize.section('stacks_teammembers').deactivate();

    // a control’s section can be obtained predictably:
    //		id = wp.customize.control( 'blogname' ).section();
    // To get the section object from the ID
    //		wp.customize.section( id )

    // get to a setting object in the theme customizer interface
    //		mysetting = api.instance('footer_image');

    // get a section’s panel ID in the same way:
    //		id = wp.customize.section( 'sidebar-widgets-sidebar-1' ).panel(); // => widgets

    // for a settings array,
    //		mysetting = api.instance('my_theme_options[footer_image]');

    // getting & setting values
    //		console.log(api.instance('my_theme_options[footer_image]').get());
    //		api.instance('my_theme_options[footer_image]').set('http://mysite.com/wp-content/uploads/2013/03/Mech-Girl-Header4.jpg')

    // manually refresh our theme preview interface
    //		api.instance('my_theme_options[footer_image]').previewer.refresh();

    // setting color of the panel
    function mySetColor(cname, newColor) {
        var control = api.control.instance(cname);
        picker = control.container.find('.color-picker-hex');

        control.setting.set(newColor);
        picker.val(control.setting());
        return;
    }


    self.init = function() {
        //        alert('GOGO');
        api.section('stacks_header').focus(function() {
            alert('header focus');
        });
    };

    $(function() {
        self.init();
    });

})(jQuery, wp.customize);
