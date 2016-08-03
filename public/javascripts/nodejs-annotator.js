//$(document).ready(function() {
//    $('#nodejs-annotator-body').click(false);
//});

$(function() {
    'use strict';

    // Get the absolute position of a particular object on the page
    // Source: http://www.quirksmode.org/js/findpos.html
    function findPos(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return [curleft, curtop];
        } else {
            return false;
        }
    }

    // Get the current position of the mouse, relative to the page
    function getCoords(event) {
        event = event || window.event;
        if (event.pageX || event.pageY) {
            return {x: event.pageX, y: event.pageY};
        }
        return {
            x: event.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: event.clientY + document.body.scrollTop  - document.body.clientTop
        };
    }

    // Draw the shape based on the current coordinates and position at onmousedown
    function doDraw(event) {
        if (rect) {
            var mousePos = getCoords(event);
            var currentX = mousePos.x - offset[0];
            var currentY = mousePos.y - offset[1];
            var width = currentX - startX;
            var height = currentY - startY;

            if (width < 0) {
                rect.attr({'x': currentX, 'width': width * -1});
            } else {
                rect.attr({'x': startX, 'width': width});
            }
            if (height < 0) {
                rect.attr({'y': currentY, 'height': height * -1});
            } else {
                rect.attr({'y': startY, 'height': height});
            }
        }
    }

    // Global variables
    var div_paper = document.getElementById('nodejs-annotator-paper');
    var paper = new Raphael('nodejs-annotator-paper');
    var rect;
    var startX = 0, startY = 0;
    var offset = findPos(div_paper);

    div_paper.onmousedown = function(event) {
        console.log('inside onmousedown');

        var mouseCoords = getCoords(event);
        startX = mouseCoords.x - offset[0];
        startY = mouseCoords.y - offset[1];
        rect = paper.rect(startX, startY, 0, 0);
        //rect.attr("stroke", "#eeeeee");
        rect.attr("fill", "#FFFF5E");
        rect.attr("fill-opacity", 0.25);

        document.onmousemove = doDraw;
    };

    document.onmouseup = function(event) {
        if (rect) {
            //rect.remove();

            var label = "Coordinates: " + rect.attrs.x + ", " + rect.attrs.y
                + " | Dimensions: " + rect.attrs.width + "x" + rect.attrs.height;
            // create new history list item
            $("#nodejs-annotator-history-pane-ul").append("<li>" + label + "</li>");
        }
        document.onmousemove = null;
    };
})();