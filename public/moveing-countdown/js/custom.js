$(function() {
    function addButtons(dlg) {
        // Define Buttons
        var $close = dlg.find(".ui-dialog-titlebar-close");
        
        var $min = $("<button>", {
            class: "ui-button ui-corner-all ui-widget ui-button-icon-only",
            type: "button",
            title: "Minimize"
        }).insertBefore($close);
        $min.data("isMin", false);

        $("<span>", {
            class: "ui-button-icon ui-icon ui-icon-minusthick minusthick"
        }).appendTo($min);
        $("<span>", {
            class: "ui-button-icon-space"
        }).html(" ").appendTo($min);

        /*var $max = $("<button>", {
            class: "ui-button ui-corner-all ui-widget ui-button-icon-only ui-window-maximize d-none",
            type: "button",
            title: "Maximize"
        }).insertBefore($close);
        $max.data("isMax", false);
        $("<span>", {
            class: "ui-button-icon ui-icon ui-icon-plusthick"
        }).appendTo($max);
        $("<span>", {
            class: "ui-button-icon-space"
        }).html(" ").appendTo($max);*/
        
        // Define Function
        $min.click(function(e) {
            if ($min.data("isMin") === false) {
                console.log("Minimize Window");
                $min.data("original-pos", dlg.position());
                $min.data("original-size", {
                    width: dlg.width(),
                    height: dlg.height(),
                });

                $('.minusthick').removeClass('ui-icon-minusthick');
                $('.minusthick').addClass('ui-icon-arrow-4-diag');

                $min.data("isMin", true);
                dlg.animate({
                    height: '40px',
                    top: $(window).height() - 50,
                    left: $(window).width() - 300,
                }, 200);
                dlg.find(".ui-dialog-content").hide();
            } else {
                console.log("Restore Window");
                $('.minusthick').removeClass('ui-icon-plusthick');
                $('.minusthick').addClass('ui-icon-minusthick');
                $min.data("isMin", false);
                dlg.find(".ui-dialog-content").show();

                dlg.animate({
                    height: ($min.data("original-size").height + 8) + "px",
                    top: $min.data("original-pos").top + "px"
                }, 200);
            }
        });
        /*$max.click(function(e) {
            if ($max.data("isMax") === false) {
                console.log("Maximize Window");
                $max.data("original-pos", dlg.position());
                $max.data("original-size", {
                    width: dlg.width(),
                    height: dlg.height()
                });

                $max.data("isMax", true);
                dlg.animate({
                    height: $(window).height() + "px",
                    width: $(window).width() - 20 + "px",
                    top: 0,
                    left: 0
                }, 200);
            } else {
                console.log("Restore Window");

                $max.data("isMax", false);
                dlg.animate({
                    height: $max.data("original-size").height + "px",
                    width: $max.data("original-size").width + "px",
                    top: $max.data("original-pos").top + "px",
                    left: $max.data("original-pos").top + "px"
                }, 200);

            }
        });*/
    }

    $('#window').dialog({
        draggable: true,
        resizable: false,
        autoOpen: true,
        classes: {
            "ui-dialog": "ui-window-options",
            "ui-dialog-titlebar": "ui-window-bar"
        },
        modal: true,
        responsive: true,
        position: { my: "top", at: "right" },
        height: 318,
        dialogClass: 'overflow-y-scroll'
    });

    addButtons($(".ui-window-options"));
});