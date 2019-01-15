/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import tinycolor from 'tinycolor2'
function convertConfigure(chart) {
  if (!chart) return

  var data = chart.data || {}
  var datasets = data.datasets || []
  var options = chart.options || {}
  var scales = options.scales || {}
  var xAxes
  var yAxes
  var scale
  var legend = options.legend || {}
  var tooltips = (options.tooltips = options.tooltips || {})

  var multiAxis = options.multiAxis
  var stacked = options.stacked
  var fontSize = chart.fontSize || options.defaultFontSize
  var fontFamily = (options.defaultFontFamily = chart.fontFamily)
  var theme = options.theme

  // backward compatible
  _configureBackwardsCompatible(chart.type, options)

  // setup series configure
  for (let i in datasets) {
    let series = datasets[i]
    _setSeriesConfigures(series, chart)

    if (!multiAxis) {
      if (series.yAxisID == 'right') series.yAxisID = 'left'
    }
  }

  // setup options
  // 1. setup scales
  switch (chart.type) {
    case 'line':
    case 'bar':
    case 'horizontalBar':
      xAxes = scales.xAxes || []
      yAxes = scales.yAxes || []

      // 1-1. setup xAxes
      for (let i in xAxes) {
        let axis = xAxes[i]
        _setStacked(axis, stacked)
        _setScalesFontSize(axis, fontSize)
        _setScalesFontFamily(axis, fontFamily)
        _setScalesAutoMinMax(axis)
        _setAxisTitle(axis)
        _setScalesTheme(axis, theme)
        _appendTickCallback(axis.ticks)

        axis.gridLines.display = options.xGridLine
      }

      // 1-2. setup yAxes
      for (let i in yAxes) {
        let axis = yAxes[i]

        if (i == 1) {
          _setMultiAxis(axis, multiAxis)
        }
        _setStacked(axis, stacked)
        _setScalesFontSize(axis, fontSize)
        _setScalesFontFamily(axis, fontFamily)
        _setScalesAutoMinMax(axis)
        _setAxisTitle(axis)
        _setScalesTheme(axis, theme)
        _appendTickCallback(axis.ticks)

        if (i == 0) axis.gridLines.display = options.yGridLine

        if (i == 1) axis.gridLines.display = options.y2ndGridLine
      }

      break
    case 'pie':
    case 'doughnut':
      break
    default:
      scale = options.scale || {}
      break
  }

  // 2. setup legend
  legend.labels = legend.labels ? legend.labels : {}
  legend.labels.fontSize = fontSize
  legend.labels.fontFamily = fontFamily
  _setLegendTheme(legend, theme)

  // 3. setup tooltips
  tooltips.titleFontSize = tooltips.bodyFontSize = tooltips.footerFontSize = fontSize
  tooltips.titleFontFamily = tooltips.bodyFontFamily = tooltips.footerFontFamily = fontFamily
  _setTooltipCallback(tooltips)
}

function _configureBackwardsCompatible(type, options) {
  switch (type) {
    case 'horizontalBar':
      if (!options.scales) options.scales = {}
      break
    case 'line':
    case 'bar':
      if (!options.scales) options.scales = {}
      if (!options.scales.yAxes) options.scales.yAxes = []

      if (options.scales.yAxes.length === 1) {
        let yAxes = options.scales.yAxes
        yAxes.push({
          position: 'right',
          id: 'right',
          display: options.multiAxis || false,
          gridLines: {
            display: (yAxes[0] && yAxes[0].gridLines && yAxes[0].gridLines.display) || false
          },
          ticks: {
            beginAtZero: false,
            callback: function(value, index, values) {
              var returnValue = value
              if (typeof returnValue == 'number') {
                returnValue = returnValue.toLocaleString()
              }

              return returnValue
            }
          }
        })
      }
      break
    case 'pie':
    case 'doughnut':
      break
    default:
      if (!options.scale) options.scale = {}

      break
  }
}

function _setStacked(axis, stacked) {
  axis.stacked = stacked
}

function _setMultiAxis(axis, multiAxis) {
  axis.display = multiAxis
}

function _setAxisTitle(axis) {
  if (!axis.scaleLabel) axis.scaleLabel = {}
  axis.scaleLabel.labelString = axis.axisTitle
  axis.scaleLabel.display = axis.axisTitle ? true : false
}

function _setScalesFontSize(axis, fontSize) {
  axis.ticks = axis.ticks ? axis.ticks : {}
  axis.ticks.fontSize = fontSize
}

function _setScalesFontFamily(axis, fontFamily) {
  axis.ticks = axis.ticks ? axis.ticks : {}
  axis.ticks.fontFamily = fontFamily
}

function _setScalesAutoMinMax(axis) {
  axis.ticks = axis.ticks ? axis.ticks : {}

  let autoMin = axis.ticks.autoMin
  let autoMax = axis.ticks.autoMax

  if (autoMin === true) {
    delete axis.ticks.min
  }
  if (autoMax === true) {
    delete axis.ticks.max
  }
}

function _setScalesTheme(axis, theme) {
  var baseColor = _getBaseColorFromTheme(theme)

  axis.gridLines = axis.gridLines ? axis.gridLines : {}
  axis.gridLines.zeroLineColor = baseColor
    .clone()
    .setAlpha(0.5)
    .toString()
  axis.gridLines.color = baseColor
    .clone()
    .setAlpha(0.1)
    .toString()

  axis.ticks = axis.ticks ? axis.ticks : {}
  axis.ticks.fontColor = baseColor
    .clone()
    .setAlpha(0.5)
    .toString()
}

function _setLegendTheme(legend, theme) {
  var baseColor = _getBaseColorFromTheme(theme)

  legend.labels = legend.labels ? legend.labels : {}
  legend.labels.fontColor = baseColor
    .clone()
    .setAlpha(0.5)
    .toString()
}

function _getBaseColorFromTheme(theme) {
  let darkColor = '#000'
  let lightColor = '#fff'

  var baseColor

  switch (theme) {
    case 'light':
      baseColor = lightColor
      break
    case 'dark':
    default:
      baseColor = darkColor
      break
  }

  baseColor = tinycolor(baseColor)

  return baseColor
}

function _setSeriesConfigures(series, chart) {
  var type = series.type || chart.type || 'line'

  switch (type) {
    case 'bar':
    case 'horizontalBar':
      series.borderColor = series.backgroundColor
      series.borderWidth = 0
      break
    case 'line':
    case 'radar':
      series.pointBorderColor = series.borderColor
      series.pointBorderWidth = series.borderWidth
      series.pointHoverRadius = series.pointRadius
      break
    default:
      break
  }
}

function _appendTickCallback(ticks) {
  ticks.callback = function(value, index, values) {
    var returnValue = Number(value)
    if (!Number.isNaN(returnValue)) {
      returnValue = returnValue.toLocaleString()
    } else {
      returnValue = value
    }

    if (returnValue) return returnValue
  }
}

function _setTooltipCallback(tooltips) {
  tooltips.callbacks = tooltips.callbacks || {}
  tooltips.callbacks.label = function(tooltipItem, data) {
    var label = data.labels[tooltipItem.index]
    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
    var toNumValue = Number(value)
    if (!isNaN(toNumValue)) {
      value = toNumValue
    }
    if (value) value = value.toLocaleString()
    var prefix = data.datasets[tooltipItem.datasetIndex].valuePrefix || ''
    var suffix = data.datasets[tooltipItem.datasetIndex].valueSuffix || ''
    return `${label}: ${prefix + value + suffix}`
  }
}

export default {
  id: 'scene-config-converter',
  beforeUpdate(chartInstance) {
    // cancellable
    convertConfigure(chartInstance)
  }
}
