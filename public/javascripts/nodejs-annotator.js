$(document).ready(function() {
    (function() {
        var iterator = 0;
        var currentMousePosition = { x:-1,y:-1 };
        $(document).on("mousemove", function(e) {
            currentMousePosition.x = e.pageX;
            currentMousePosition.y = e.pageY;
        });

        var canvas = window.__canvas = new fabric.CanvasEx('c');
        fabric.Object.prototype.transparentCorners = false;

        $('#rect').click(function() {
            addNewRect();
        });

        var addNewRect = function() {
            var rect = new fabric.Rect({
                width: 30,
                height: 30,
                angle: 0,
                fill: 'rgba(255,0,0,.25)',
                originX:'center',
                originY:'center'
            });

            var text = new fabric.Text(iterator.toString(), {
                fontSize:20,
                originX:'center',
                originY:'center'
            });

            var group = new fabric.Group([rect, text], {
                left: currentMousePosition.x,
                top: currentMousePosition.y,
                id: iterator
            });

            canvas.add(group);

            iterator++;

            clearSelection();

            $('#nodejs-sidebar-history-ul').append('<li id="li_' + group.id + '" class="active">#' + group.id + '<br/><span></span><textarea placeholder="Enter a description" id="txt_' + group.id + '" class="form-control"></textarea><button class="btn btn-primary" id="btnSave_' + group.id + '">Save</button></li>');

            group.on('selected', function(){
                var li = "#li_" + group.id;
                $(li).siblings().removeClass("active");
                $(li).addClass("active");
                console.log('selected obj: ' + group.id);
            });
        };

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
                hideForm($(this));
            });
        };

        $('#nodejs-sidebar-history-ul').on('click', 'li', function() {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            var splitId = $(this).attr('id').toString().split('_');
            var rectId = splitId[1];
            console.log(rectId);
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

        canvas.on('mouse:dblclick', function (options) {
            addNewRect();
        });

        //if ("Event" in window) {
        //    // Listen to double click event on canvas element
        //    Event.add(canvas.upperCanvasEl, 'dblclick', function (e, self) {
        //        addNewRect();
        //        var target = canvas.findTarget(e);
        //        if (target) {
        //            console.log('dblclick inside object');
        //        } else {
        //            console.log('dblclick outside object');
        //        }
        //
        //        /*
        //         var target = canvas.getActiveObject();
        //         if (target) {
        //         console.log('dblclick inside object');
        //         } else {
        //         console.log('dblclick outside object');
        //         }
        //         */
        //    });
        //}

        //canvas.dblclick(function(e) {
        //    //alert("dblclick");
        //    addNewRect();
        //});
    })();
});
