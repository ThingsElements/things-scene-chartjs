/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
function seriesHighlight(chartInstance, seriesData) {
  chartInstance.data.datasets.forEach(dataset => {
    let highlight = dataset.highlight
    if (!highlight) return

    let highlightColor = highlight.color
    let highlightCondition = highlight.condition

    seriesData.forEach((sdata, sIndex) => {
      sdata.forEach((data, i) => {
        if (!eval(highlightCondition)) return

        let meta = chartInstance.getDatasetMeta(sIndex)
        meta.data[i]._model.backgroundColor = highlightColor
        meta.data[i]._model.hoverBackgroundColor = highlightColor

        // dataset.backgroundColor = highlightColor
      })
    })
  })
}

export default {
  id: 'chart-series-highlight',
  beforeDraw: function(chartInstance) {
    if (!chartInstance.data.rawData) {
      return
    }

    let seriesData = chartInstance.data.rawData.seriesData
    seriesHighlight(chartInstance, seriesData)
  }
}
