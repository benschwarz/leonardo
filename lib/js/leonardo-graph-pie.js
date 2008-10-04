if(!window.Leonardo) { var Leonardo = {}; }
(function () {
	Leonardo.Pie = function (target_element, width, height, data) {
		settings = $.extend({
			backgroundColor: '666'
		}, (arguments[4] || {}));
		
		init(target_element, width, height, data);
	};

	//
	// == Public methods
	//
	$.extend(Leonardo.Pie, {
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
		data = data;
		
		graph = null;
		
		drawCanvas(target);
	};
	
	drawCanvas = function () {
		graph = Raphael(target, dimensions.width, dimensions.height);
		graph.circle((dimensions.width/2), (dimensions.height/2), dimensions.width/2).attr({fill: "#"+settings.backgroundColor, stroke: "none"});
	};
})();