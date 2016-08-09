$(document).ready(function() {
    (function() {
        var iterator = 0;

        var canvas = this.__canvas = new fabric.Canvas('c');
        fabric.Object.prototype.transparentCorners = false;

        $('#rect').click(function() {
            //alert("clicked");

            var rect = new fabric.Rect({
                width: 200,
                height: 100,
                left: 0,
                top: 50,
                angle: 0,
                fill: 'rgba(255,0,0,.25)',
                id: iterator
            });

            canvas.add(rect);

            iterator++;

            clearSelection();

            $('#nodejs-sidebar-history-ul').append('<li id="li_' + rect.id + '" class="active">RectId = ' + rect.id + '<br/><span>Double-click to add a description</span><textarea id="txt_' + rect.id + '" class="form-control" style="display:none;"></textarea><button class="btn btn-primary" style="display:none;" id="btnSave_' + rect.id + '">Save</button></li>');

            rect.on('selected', function(){
                clearSelection();
                var li = "#li_" + rect.id;
                $(li).addClass("active");

                console.log('selected rect: ' + rect.id);
            });
        });

        canvas.on({
            'object:moving': onChange,
            'object:scaling': onChange,
            'object:rotating': onChange,
        });

        function onChange(options) {
            options.target.setCoords();
            canvas.forEachObject(function(obj) {
                if (obj === options.target) return;
                obj.setOpacity(options.target.intersectsWithObject(obj) ? 0.5 : 1);
            });
        }

        var clearSelection = function() {
            $('#nodejs-sidebar-history-ul').children().each(function() {
                $(this).removeClass("active");
            });
        };

        $('#nodejs-sidebar-history-ul').on('click', 'li', function() {
            var splitId = $(this).attr('id').toString().split('_');
            var rectId = splitId[1];
            //console.log(rectId);
            canvas.setActiveObject(canvas.item(rectId));
        });

        $('#nodejs-sidebar-history-ul').on('dblclick', 'li', function() {
            showForm($(this));
        });

        $('#nodejs-sidebar-history-ul').on('click', 'button', function() {
            //$(this).parent().find("span").html($(this).parent().find("textarea").val());
            $(this).siblings("span").html($(this).siblings("textarea").val());
            hideForm($(this).parent());
        });

        var hideForm = function(li) {
            $(li).find("textarea").css("display", "none");
            $(li).find("button").css("display", "none");
        };

        var showForm = function(li) {
            $(li).find("textarea").css("display", "block");
            $(li).find("button").css("display", "block");
        };
    })();
});
