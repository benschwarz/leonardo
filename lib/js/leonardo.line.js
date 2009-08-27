(function () {
  Leonardo.Line = function (target_element, width, height, data) {
    settings = $.extend({
      lineColour: '#036'
    }, (arguments[4] || {}));

    init(target_element, width, height, data);
  };

  //
  // == Private methods
  //
  init = function (target_element, width, height, data) {
    target = target_element;
    dimensions = {width: width, height: height}
    particulars = data;
    graph = null;
    leftgutter = 1;
    bottomgutter = 1;
    topgutter = 2;
    X = (width - leftgutter) / particulars.length;
    max = particulars.max();
    Y = (height - bottomgutter - topgutter) / max;

    createCanvas();
    drawLine();
  };

  createCanvas = function () {
    graph = Raphael(target, dimensions.width, dimensions.height);
  };

  drawLine = function () {
    // Drop the pen
    path = graph.path({stroke: settings.lineColour, "stroke-width": 2});
    bgp = graph.path({stroke: "none", fill: "#000", opacity: .15}).moveTo(leftgutter + X * .5, dimensions.height - bottomgutter);
    for (var i = 0; i < particulars.length; i++) {
      y = Math.round(dimensions.height - bottomgutter - Y * particulars[i]);
      x = Math.round(leftgutter + X * (i + .5));
      path[i == 0 ? "moveTo" : "lineTo"](x, y);
      bgp.lineTo(x, y);
    }
    bgp.lineTo(x, dimensions.height - bottomgutter).andClose();
  };
})();