(function($) {
    $(document).ready(function() {
        stacksInjecton();
        $("ol.stacks").sortable({
            group: 'stax',
            handle: 'i.icon-move'
        });
    });

    stacksInjecton = function() {
        // .form-table
        $("<div class='boxedStacksList row'>" +
            "<div class='col-md-4'>" +
            "<ol class='stacks vertical'>" +
            "<li class='list-group-item'><i class='glyphicon glyphicon-align-justify' /> First</li>" +
            "</ol></div><div class='col-md-6'><ol class='stacks vertical col-md-6'>" +
            "<li class='list-group-item'><i class='glyphicon glyphicon-align-justify' /> First</li>" +
            "<li class='list-group-item'><i class='glyphicon glyphicon-align-justify' /> Second</li>" +
            "<li class='list-group-item'><i class='glyphicon glyphicon-align-justify' /> Third</li>" +
            "</ol></div>" +
            "</div>").insertBefore('.form-table');
    };
})(jQuery);
