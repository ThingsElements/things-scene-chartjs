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

function _drawValues(chartInstance){
  // To only draw at the end of animation, check for easing === 1
  var ctx = chartInstance.chart.ctx;

  chartInstance.data.datasets.forEach(function (dataset, i) {
    // if(!dataset.displayValue)
    //   return

    var meta = chartInstance.getDatasetMeta(i);
    if (!meta.hidden) {
      meta.data.forEach(function(element, index) {
        if(element.hidden || dataset.data[index] == "" || dataset.data[index] == undefined || isNaN(dataset.data[index]))
          return

        // Draw the text in black, with the specified font
        ctx.fillStyle = chartInstance.config.options.defaultFontColor;
        var fontSize = chartInstance.config.options.defaultFontSize;
        var fontStyle = 'normal';
        var fontFamily = chartInstance.config.options.defaultFontFamily;
        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
        // Just naively convert to string for now
        var data = dataset.data[index]
        if(data && !isNaN(Number(data)))
          data = Number(data);

        var dataString = data ? data.toLocaleString() : data;
        var prefix = dataset.valuePrefix || "";
        var suffix = dataset.valueSuffix || "";

        dataString = prefix + dataString + suffix;

        // Make sure alignment settings are correct
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var position = element.getCenterPoint()

        // 라인일 경우는 레이블 위치를 라인의 포인트 위로 올린다.
        if(dataset.type == 'line')
          position.y = position.y - (dataset.pointRadius + 8 || 10)

        ctx.fillText(dataString, position.x, position.y);
      });
    }
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

	afterDatasetsDraw: function (chartInstance, easing) {
    if(!chartInstance.config.options.displayValue)
      return

    _drawValues(chartInstance)
  }
});

export { default as SceneChart } from './chart-overload'
export { default as ChartJSWrapper } from './chartjs-wrapper'
