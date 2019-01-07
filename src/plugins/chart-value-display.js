/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
function _drawValues(chartInstance) {
  // To only draw at the end of animation, check for easing === 1
  var ctx = chartInstance.chart.ctx

  chartInstance.data.datasets.forEach(function(dataset, i) {
    // 값 표시가 체크되어 있지 않으면 스킵
    if (!dataset.displayValue) return

    var meta = chartInstance.getDatasetMeta(i)
    if (!meta.hidden) {
      meta.data.forEach(function(element, index) {
        // 데이터셋이 히든이거나 해당값이 빈값이면 스킵
        if (
          element.hidden ||
          dataset.data[index] == '' ||
          dataset.data[index] == undefined ||
          isNaN(dataset.data[index])
        )
          return

        // Draw the text in black, with the specified font
        ctx.fillStyle = dataset.defaultFontColor || '#000000'
        var fontSize = dataset.defaultFontSize || 11
        var fontStyle = 'normal'
        var fontFamily = chartInstance.options.defaultFontFamily
        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily)
        // Just naively convert to string for now
        var data = dataset.data[index]
        if (data && !isNaN(Number(data))) data = Number(data)

        var dataString = data ? data.toLocaleString() : data
        var prefix = dataset.valuePrefix || ''
        var suffix = dataset.valueSuffix || ''

        dataString = prefix + dataString + suffix

        // Make sure alignment settings are correct
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        var position = element.getCenterPoint()

        // 라인일 경우는 레이블 위치를 라인의 포인트 위로 올린다.
        if (dataset.type == 'line') position.y = position.y - (dataset.pointRadius + 8 || 10)

        ctx.fillText(dataString, position.x, position.y)
      })
    }
  })
}

export default {
  id: 'chart-value-display',
  afterDatasetsDraw: function(chartInstance, easing) {
    _drawValues(chartInstance)
  }
}
