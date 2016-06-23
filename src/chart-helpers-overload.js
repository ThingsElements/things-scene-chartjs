function noop() {}

var helpers_backup = Chart.helpers;
var controller_backup = Chart.Controller;

var helpers = Object.assign({}, Chart.helpers);
helpers.retinaScale = noop;
helpers.addResizeListener = noop;
helpers.removeResizeListener = noop;

var originalGetRelativePosition = Chart.helpers.getRelativePosition;

Chart.helpers.getRelativePosition = function(evt, chart) {

  if(!evt.chartJSWrapper)
    return originalGetRelativePosition(evt, chart);

  var wrapper = evt.chartJSWrapper;
  var mouseX, mouseY;
  var e = evt;

  var point = evt.chartJSWrapper.transcoordC2S(
    e.offsetX,
    e.offsetY
  )

  return {
    x: point.x - wrapper.get('left'),
    y: point.y - wrapper.get('top')
  };

};

export default helpers
