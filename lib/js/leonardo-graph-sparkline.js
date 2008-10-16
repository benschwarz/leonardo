if(!window.Leonardo) { var Leonardo = {}; }
(function () {
	Leonardo.Sparkline = function (target_element, width, height, data) {
		settings = $.extend({
			sparkColour: '#036'
		}, (arguments[4] || {}));
		
		init(target_element, width, height, data);
	};
	
	//
	// == Private methods
	//
	init = function (target_element, width, height, data, settings) {
		target = target_element;
		dimensions = {width: width, height: height}
		particulars = data;
		graph = null;
		
		insertCurrentData();
		drawCanvas();
		drawSpark();
	};
	
	drawCanvas = function () {
		graph = Raphael(target, dimensions.width, dimensions.height);
	};
	
	drawSpark = function () {
		// Drop the pen
		path = graph.path({stroke: settings.sparkColour}).moveTo(0, dimensions.height);
		for (var i = 0; i < particulars.length; i++) {
			path.lineTo((i * 2), dimensions.height - (percentageOfRange(particulars[i])/dimensions.height)*100);
		}
	};
	
	insertCurrentData = function () {
		$("#"+target).text(particulars[particulars.length-1])
	};
	
	percentageOfRange = function (value) {
		return ((value/particulars.sum())*100)
	};
})();

// Extend array class
Array.prototype.sum = function () {
  var sum = 0;
  for(var i = 0; i < this.length; i++){
     sum += this[i];
  }
  return sum;
}
