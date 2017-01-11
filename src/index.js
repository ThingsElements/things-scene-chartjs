// function updateSeriesDatas(chartInstance) {
//   let seriesData = chartInstance.data.rawData.seriesData;
//   let chartId = chartInstance.id;
//
//   if(!seriesData || seriesData.length === 0)
//     seriesData = [null];
//
//   let seriesOptions = chartInstance.seriesOptions || [];
//
//   chartInstance.data.datasets = [];
//
//   for(let key in seriesData) {
//     var opt = seriesOptions
//     if(seriesOptions.length > 0)
//       opt = seriesOptions[key % seriesOptions.length]
//
//     var dataset = Object.assign({}, opt);
//     opt.data = seriesData[key] || [];
//
//     chartInstance.data.datasets.push(opt);
//   }
// }

function updateSeriesDatas(chartInstance) {
  if (!chartInstance.data.rawData) {
    return;
  }

  let seriesData = chartInstance.data.rawData.seriesData;
  let chartId = chartInstance.id;

  if(!seriesData || seriesData.length === 0)
    seriesData = [null];

  for(let key in seriesData) {
    if(chartInstance.data.datasets[key])
      chartInstance.data.datasets[key].data = seriesData[key] || [];
  }
}

function updateLabelDatas(chartInstance){
  let labelData = chartInstance.data.rawData.labelData;
  chartInstance.config.data.labels = labelData || [];
}

function seriesHighlight(chartInstance, seriesData) {
  chartInstance.data.datasets.forEach(dataset => {
    let highlight = dataset.highlight
    if(!highlight)
      return

    let highlightColor = highlight.color
    let highlightCondition = highlight.condition

    seriesData.forEach( (sdata, sIndex) => {
      sdata.forEach( (data, i) => {
        if( !eval(highlightCondition) )
          return

        let meta = chartInstance.getDatasetMeta(sIndex)
        meta.data[i]._model.backgroundColor = highlightColor
        meta.data[i]._model.hoverBackgroundColor = highlightColor


        // dataset.backgroundColor = highlightColor
      })
    })
  })
}

function _drawBarValues(chart){
  // render the value of the chart above the bar
  var valuePosition = chart.config.options.displayValuePosition || 'top'
  var ctx = chart.chart.ctx;
  var fontSize = chart.config.options.defaultFontSize
  ctx.font = Chart.helpers.fontString(fontSize, 'normal', chart.config.options.defaultFontFamily);
  ctx.fillStyle = chart.config.options.defaultFontColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  chart.data.datasets.forEach(function (dataset) {
    for (var i = 0; i < dataset.data.length; i++) {
      if(dataset.hidden === true && dataset._meta[Object.keys(dataset._meta)[0]].hidden !== false){ continue; }
      var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
      if(dataset.data[i] !== null){
        ctx.save();
        var data = dataset.data[i];
        if(typeof data == 'number') {
          data = data.toLocaleString()
        }

        var measuredText = ctx.measureText(data);
        if(valuePosition == 'top')
          ctx.fillText(data, model.x, model.y - fontSize);
        if(valuePosition == 'middle') {
          var barHeight = model.base - model.y
          if(Math.abs(barHeight) > fontSize && model.width > fontSize) {
            ctx.translate(model.x, model.y + barHeight / 2)
            if(model.width < measuredText.width && barHeight > measuredText.width) {
              ctx.rotate(Math.PI * -0.5)
            }
            ctx.fillText(data, 0, 0);
            ctx.translate(-model.x, -(model.y + barHeight / 2))
          }
        }
        ctx.restore()
      }
    }
  });
}

function _drawPieValues(chart) {

  var self = chart.config;
  var ctx = chart.chart.ctx;

  ctx.font = '18px Arial';
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";

  self.data.datasets.forEach(function (dataset, datasetIndex) {
    var total = 0, //total values to compute fraction
      labelxy = [],
      offset = Math.PI / 2, //start sector from top
      radius,
      centerx,
      centery,
      lastend = 0; //prev arc's end line: starting with 0

    for (var val of dataset.data) { total += val; }

    //TODO needs improvement
    var i = 0;
    var meta = dataset._meta[i];
    while(!meta) {
      i++;
      meta = dataset._meta[i];
    }

    var element;
    for(var index = 0; index < meta.data.length; index++) {

      element = meta.data[index];
      radius = 0.9 * element._view.outerRadius - element._view.innerRadius;
      centerx = element._model.x;
      centery = element._model.y;
      var thispart = dataset.data[index],
        arcsector = Math.PI * (2 * thispart / total);
      if (element.hasValue() && dataset.data[index] > 0) {
        labelxy.push(lastend + arcsector / 2 + Math.PI + offset);
      }
      else {
        labelxy.push(-1);
      }
      lastend += arcsector;
    }


    var lradius = radius * 3 / 4;
    for (var idx in labelxy) {
      if (labelxy[idx] === -1) continue;
      var langle = labelxy[idx],
      dx = centerx + lradius * Math.cos(langle),
      dy = centery + lradius * Math.sin(langle),
      val = Math.round(dataset.data[idx] / total * 100);
      if (chart.config.options.showPercentage)
        ctx.fillText(val + '%', dx, dy);
      else
        ctx.fillText(chart.config.data.labels[idx], dx, dy);
    }
    ctx.restore();
  });

}

Chart.plugins.register({
  beforeInit : function(chartInstance){

    // chartInstance.chartSeries = [];
    //
    // for(let dataset of chartInstance.data.datasets) {
    //   chartInstance.chartSeries.push(dataset);
    // }
  },
  beforeUpdate : function(chartInstance){
    if (!chartInstance.data.rawData) {
      return;
    }

    let seriesData = chartInstance.data.rawData.seriesData;
    updateLabelDatas(chartInstance);
    updateSeriesDatas(chartInstance);

  },
  beforeRender: function(chartInstance){

  },

  beforeDraw: function(chartInstance) {
    if (!chartInstance.data.rawData) {
      return;
    }

    let seriesData = chartInstance.data.rawData.seriesData;
    seriesHighlight(chartInstance, seriesData)
  },

	afterDraw: function (chart, easing) {
    if(!chart.config.options.displayValue)
      return

    switch(chart.config.type) {
      case 'bar':
        _drawBarValues(chart)
        break;
      case 'pie':
      case 'doughnut':
        _drawPieValues(chart)
        break;
    }
  }
});

export { default as SceneChart } from './chart-overload'
export { default as ChartJSWrapper } from './chartjs-wrapper'
