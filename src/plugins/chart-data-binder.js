/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
function updateSeriesDatas(chartInstance) {
  if (!chartInstance.data.rawData) {
    return
  }

  let seriesData = chartInstance.data.rawData.seriesData
  let chartId = chartInstance.id

  if (!seriesData || seriesData.length === 0) seriesData = [null]

  for (let key in chartInstance.data.datasets) {
    chartInstance.data.datasets[key].data = seriesData[key] || []
  }
}

function updateLabelDatas(chartInstance) {
  let labelData = chartInstance.data.rawData.labelData
  chartInstance.config.data.labels = labelData || []
}

export default {
  id: 'chart-data-binder',
  beforeUpdate: function(chartInstance) {
    if (!chartInstance.data.rawData) {
      return
    }

    let seriesData = chartInstance.data.rawData.seriesData
    updateLabelDatas(chartInstance)
    updateSeriesDatas(chartInstance)
  }
}
