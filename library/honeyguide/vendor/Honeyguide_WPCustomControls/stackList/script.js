alert('the outmost');

(function($, api) {

    //
    //	https://conductorplugin.com/developing-wordpress-customizer-part1/
    //

    'use strict';
    //    if (!api) return false;

    //    api.section('stacks-section').activate();


    self.init = function() {
        alert('inited...');




    };
    alert('the outer');

    $(function() {
        self.init();
        alert('the inner');
    });

})(jQuery, wp.customize);
