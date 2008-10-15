if(!window.Leonardo) { var Leonardo = {}; }
(function () {
	Leonardo.Sparkline = function (target_element, width, height, data) {
		settings = $.extend({
			backgroundColor: 'ccc'
		}, (arguments[4] || {}));
		
		init(target_element, width, height, data);
	};

	//
	// == Public methods
	//
	$.extend(Leonardo.Sparkline, {
		// functions here
		execute: function () {

		}
	});
	
	//
	// == Private methods
	//
	init = function (target_element, width, height, data) {
		target = target_element;
		dimensions = {width: width, height: height}
		particulars = data 
		graph = null;
		
		drawCanvas();
		drawSpark(data);
	};
	
	drawCanvas = function () {
		graph = Raphael(target, dimensions.width, dimensions.height);
	};
	
	drawSpark = function () {
		// Drop the pen
		graph.path({stroke: '#036'}).moveTo(0, 10).lineTo(50, 50)
		console.debug(particulars);
	};
})();