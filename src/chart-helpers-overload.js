/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import Chart from 'chart.js'

function noop() {}

var helpers = Chart.helpers;

helpers.retinaScale = noop;
helpers.addResizeListener = noop;
helpers.removeResizeListener = noop;

var originalGetRelativePosition = Chart.helpers.getRelativePosition;

Chart.helpers.getRelativePosition = function(e, chart) {
  var wrapper = e.chartJSWrapper;

  if(!wrapper)
    return originalGetRelativePosition(e, chart);

  var point = e.chartJSWrapper.transcoordC2S(
    e.offsetX,
    e.offsetY
  )

  return {
    x: point.x - wrapper.get('left'),
    y: point.y - wrapper.get('top')
  };

};

export default helpers
