(function($, api) {

    'use strict';

    //    api.section('stacks-section').activate();

    self.init = function() {};
    alert('the outer');

    $(function() {
        self.init();
        alert('the inner');
    });

})(jQuery, wp.customize);
