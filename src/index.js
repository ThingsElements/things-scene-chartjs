function updateSeriesDatas(chartInstance) {
  let seriesData = chartInstance.data.rawData.seriesData;
  let chartId = chartInstance.id;

  if(!seriesData || seriesData.length === 0)
    seriesData = [null];

  for(let key in seriesData) {
    let meta = chartInstance.chartSeries[key]._meta[chartId];

    if(seriesData[key]) {
      if(seriesData[key].length > 0 && meta.data.length === seriesData[key].length){
        meta.data.shift(1);
      }
    }

    chartInstance.chartSeries[key].data = seriesData[key] || [];
  }
}

function updateLabelDatas(chartInstance){
  let labelData = chartInstance.data.rawData.labelData;
  chartInstance.config.data.labels = labelData || [];
}

Chart.plugins.register({
  beforeInit : function(chartInstance){
    
    chartInstance.chartSeries = [];

    for(let dataset of chartInstance.data.datasets) {
      chartInstance.chartSeries.push(dataset);
    }
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
