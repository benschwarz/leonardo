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
    leftgutter = 1;
    bottomgutter = 1;
    topgutter = 2;
    X = (width - leftgutter) / particulars.length;
    max = particulars.max();
    Y = (height - bottomgutter - topgutter) / max;

    insertCurrentData();
    drawCanvas();
    drawSpark();
  };

  drawCanvas = function () {
    graph = Raphael(target, dimensions.width, dimensions.height);
  };

  drawSpark = function () {
    // Drop the pen
    path = graph.path({stroke: settings.sparkColour, "stroke-width": 2});
    bgp = graph.path({stroke: "none", fill: "#000", opacity: .15}).moveTo(leftgutter + X * .5, dimensions.height - bottomgutter);
    for (var i = 0; i < particulars.length; i++) {
      y = Math.round(dimensions.height - bottomgutter - Y * particulars[i]);
      x = Math.round(leftgutter + X * (i + .5));
      path[i == 0 ? "moveTo" : "lineTo"](x, y);
      bgp.lineTo(x, y);
    }
    bgp.lineTo(x, dimensions.height - bottomgutter).andClose();
  };

  insertCurrentData = function () {
    $("#"+target).text(particulars[particulars.length-1])
  };
})();