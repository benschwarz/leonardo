(function () {
  Leonardo.Line = function (target_element, width, height, data, line_settings) {
    settings = $.extend({
      lineColour: '#036',
			drawPoints: true,
			drawLabels: true,
			labelPath: 'images/bubble.png'
    }, (arguments[5] || {}));

    init(target_element, width, height, data, line_settings);
  };

  //
  // == Private methods
  //
  init = function (target_element, width, height, data, line_settings) {
    target = target_element;
    dimensions = {width: width, height: height}
    graph = null;
    leftgutter = 10;
    bottomgutter = 5;
    topgutter = 25;

    createCanvas();
		draw(data, line_settings);
  };

  createCanvas = function () {
    graph = Raphael(target, dimensions.width, dimensions.height);
  };

	draw = function (data, line_settings) {
		for(var i = 0; i < data.length; i++) {
			var defaults = $.extend({
				colour: "#036"
			}, line_settings[i]);
			
			drawLine(data[i], defaults);
			if(settings.drawPoints) drawPoints(data[i], defaults);
		}
	};

	offsets = function (line_plot) {
		var max = line_plot.max();
		var x = (dimensions.width - leftgutter) / line_plot.length;
    var y = (dimensions.height - bottomgutter - topgutter) / max;

		return {x: x, y: y};
	};

	pointPositions = function (line_plot, i) {
		var offset_coords = offsets(line_plot);

		var y = Math.round((dimensions.height - (bottomgutter * 2)) - offset_coords.y * line_plot[i]);
    var x = Math.round(leftgutter + offset_coords.x * (i + .5));
		return {x: x, y: y};
	};

  drawLine = function (line_plot, line_settings) {
		var offset_coords = offsets(line_plot);
		
    var path = graph.path({stroke: line_settings.colour, "stroke-width": 2});
    var bgp = graph.path({stroke: "none", fill: "#000", opacity: .15}).moveTo(leftgutter + offset_coords.x * .5, dimensions.height - bottomgutter);
    
		for (var i = 0; i < line_plot.length; i++) {
			var coords = pointPositions(line_plot, i);
			
      path[i == 0 ? "moveTo" : "lineTo"](coords.x, coords.y);
      bgp.lineTo(coords.x, coords.y);
    }
    bgp.lineTo(coords.x, dimensions.height - bottomgutter).andClose();
  };

	drawPoints = function (line_plot, line_settings) {
		for(var i = 0; i < line_plot.length; i++) {		
			console.debug("drawing point")
			var coords = pointPositions(line_plot, i);
			var point = graph.circle(coords.x, coords.y, 3).attr({stroke: "none", fill: line_settings.colour});
			
			if(settings.drawLabels) {

				//var label = drawPointLabel(line_plot, i);
				
				var label_set = graph.set()
				var image = graph.image(settings.labelPath, coords.x-14, coords.y - 20, 29, 16);
				var text = graph.text(coords.x, coords.y - 12, line_plot[i]).attr({font: "9px Arial, sans-serif", fill: "white"});
				
				
				label_set.push(image, text);
				
				point.node.onmouseover = function () {
					console.debug("over")
					label_set.show();
				}
				point.node.onmouseout = function () {
					label_set.hide();
				}
			}
		}
	};
	
	drawPointLabels = function (line_plot) {
		for(var i = 0; i < line_plot.length; i++) {
			var coords = pointPositions(line_plot, i);
			console.debug("drawing a label")
			var label_set = graph.set()
			var image = graph.image(settings.labelPath, coords.x-14, coords.y - 20, 29, 16);
			var text = graph.text(coords.x, coords.y - 12, line_plot[i]).attr({font: "9px Arial, sans-serif", fill: "white"});

			label_set.push(image, text);
		}
	};
})();