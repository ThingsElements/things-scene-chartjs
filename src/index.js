function updateSeriesDatas(chartInstance) {
  let seriesData = chartInstance.data.seriesData;
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

Chart.plugins.register({
  beforeInit : function(chartInstance){
    chartInstance.chartSeries = [];

    for(let dataset of chartInstance.data.datasets) {
      chartInstance.chartSeries.push(dataset);
    }
  },
  beforeUpdate : function(chartInstance){
    let seriesData = chartInstance.data.seriesData;
    updateSeriesDatas(chartInstance);
  }
});

export { default as SceneChart } from './chart-overload'
export { default as ChartJSWrapper } from './chartjs-wrapper'
