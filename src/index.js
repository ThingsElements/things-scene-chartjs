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

Chart.plugins.register({
  beforeInit : function(chartInstance){

    // chartInstance.chartSeries = [];
    //
    // for(let dataset of chartInstance.data.datasets) {
    //   chartInstance.chartSeries.push(dataset);
    // }
  },
  beforeUpdate : function(chartInstance){

    let seriesData = chartInstance.data.rawData.seriesData;
    updateLabelDatas(chartInstance);
    updateSeriesDatas(chartInstance);
  },
  beforeRender: function(chartInstance){

  }
});

export { default as SceneChart } from './chart-overload'
export { default as ChartJSWrapper } from './chartjs-wrapper'
