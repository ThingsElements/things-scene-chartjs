/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { TinyColor } from '@ctrl/tinycolor'
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
  var stacked = false
  var yStacked = [false, false]
  var fontSize = Number(options.defaultFontSize)
  var fontFamily = options.defaultFontFamily
  var fontColor = options.defaultFontColor
  var theme = options.theme

  // backward compatible
  _configureBackwardsCompatible(chart.type, options)

  // setup series configure
  for (let i in datasets) {
    let series = datasets[i]

    if (options.stacked && !series.stack) {
      series.stack = 'A'
    }
    _setSeriesConfigures(series, chart)

    if (!multiAxis) {
      if (series.yAxisID == 'right') series.yAxisID = 'left'
    }
  }

  delete options.stacked

  var leftSeries = datasets.filter(d => d.yAxisID == 'left')
  var rightSeries = datasets.filter(d => d.yAxisID == 'right')

  leftSeries.forEach(s => {
    var filtered = leftSeries.filter(ss => s.stack == ss.stack)
    if (filtered.length > 1) {
      yStacked[0] = true
      return
    }
  })

  rightSeries.forEach(s => {
    var filtered = rightSeries.filter(ss => s.stack == ss.stack)
    if (filtered.length > 1) {
      yStacked[1] = true
      return
    }
  })

  stacked = yStacked[0] || yStacked[1]

  // setup options
  // 1. setup scales
  switch (chart.type) {
    case 'line':
    case 'bar':
    case 'horizontalBar':
      xAxes = scales.xAxes || []
      yAxes = scales.yAxes || []

      if (chart.type == 'horizontalBar') {
        xAxes = scales.yAxes || []
        yAxes = scales.xAxes || []
      }

      // 1-1. setup xAxes
      for (let i in xAxes) {
        let axis = xAxes[i]
        _setStacked(axis, stacked)
        _setScalesFont(axis, {
          fontSize,
          fontFamily
        })
        _setScalesAutoMinMax(axis)
        _setScalesTickRotation(axis)
        _setAxisTitle(axis)
        _setScalesTheme(axis, theme, fontColor)
        _appendTickCallback(axis.ticks)

        axis.categoryPercentage = 1 - axis.categorySpacing || 1
        axis.barPercentage = 1 - axis.barSpacing || 0.8
        axis.gridLines.display = options.xGridLine
      }

      // 1-2. setup yAxes
      for (let i in yAxes) {
        let axis = yAxes[i]

        if (i == 1) {
          _setMultiAxis(axis, multiAxis)
        }
        _setStacked(axis, yStacked[i])
        _setScalesFont(axis, {
          fontSize,
          fontFamily
        })
        _setScalesAutoMinMax(axis)
        _setAxisTitle(axis)
        _setScalesTheme(axis, theme, fontColor)
        _appendTickCallback(axis.ticks)

        if (i == 0) axis.gridLines.display = options.yGridLine

        if (i == 1) axis.gridLines.display = options.y2ndGridLine

        axis.categoryPercentage = 1 - axis.categorySpacing || 1
        axis.barPercentage = 1 - axis.barSpacing || 0.8
      }

      break
    case 'pie':
    case 'doughnut':
      break
    default:
      scale = options.scale || {}
      _setScalesFont(scale, {
        fontSize,
        fontFamily
      })
      break
  }

  // 2. setup legend
  _setLegendFont(legend, {
    fontSize,
    fontFamily
  })
  legend.labels.boxWidth = 15
  _setLegendTheme(legend, theme, fontColor)

  // 3. setup tooltips
  _setTooltipFont(tooltips, {
    fontSize,
    fontFamily
  })
  _setTooltipCallback(tooltips)
}

function _configureBackwardsCompatible(type, options) {
  switch (type) {
    case 'horizontalBar':
      if (!options.scales) options.scales = {}
      break
    case 'radar':
    case 'polarArea':
      if (options.defaultFontColor) {
        options.scale.ticks.fontColor = options.defaultFontColor
        if (options.scale.pointLabels) {
          options.scale.pointLabels.fontColor = options.defaultFontColor
        } else {
          options.scale.pointLabels = { fontColor: options.defaultFontColor }
        }
      }
      options.scale.ticks.backdropColor = options.fillStyle ? options.fillStyle : '#00ff0000'
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

function _setScalesFont(axis, { fontSize, fontFamily }) {
  axis.ticks = axis.ticks ? axis.ticks : {}
  axis.ticks.fontSize = fontSize
  if (fontFamily) axis.ticks.fontFamily = fontFamily

  axis.pointLabels = axis.pointLabels || {}
  axis.pointLabels.fontSize = fontSize
  if (fontFamily) axis.pointLabels.fontFamily = fontFamily
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

function _setScalesTickRotation(axis) {
  axis.ticks = axis.ticks ? axis.ticks : {}
  // axis.ticks.maxRotation = 0
}

function _setScalesTheme(axis, theme, fontColor) {
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
  axis.ticks.fontColor = fontColor
    ? fontColor
    : baseColor
        .clone()
        .setAlpha(0.5)
        .toString()
}

function _setLegendFont(legend, { fontFamily, fontSize }) {
  legend.labels = legend.labels ? legend.labels : {}
  legend.labels.fontSize = fontSize
  if (fontFamily) legend.labels.fontFamily = fontFamily
}

function _setLegendTheme(legend, theme, fontColor) {
  var baseColor = _getBaseColorFromTheme(theme)

  legend.labels = legend.labels ? legend.labels : {}
  legend.labels.fontColor = fontColor
    ? fontColor
    : baseColor
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

  baseColor = new TinyColor(baseColor)

  return baseColor
}

function _setSeriesConfigures(series, chart) {
  var type = series.type || chart.type
  var stackGroup = `${type} ${series.yAxisID} ${series.stack || series.dataKey}`
  var color = series.color ? series.color : series.backgroundColor

  switch (type) {
    case 'bar':
    case 'horizontalBar':
      series.borderColor = series.backgroundColor = color
      break

    case 'line':
    case 'radar':
      color = series.color ? series.color : series.borderColor
      series.pointBackgroundColor = series.pointBorderColor = series.borderColor = series.backgroundColor = color
      series.pointBorderWidth = series.borderWidth * 0.5
      series.pointHoverRadius = series.pointRadius
      if (series.fill == undefined) series.fill = false
      break

    default:
      series.borderColor = series.backgroundColor = color
      break
  }

  series.stack = stackGroup
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

function _setTooltipFont(tooltips, { fontSize, fontFamily }) {
  tooltips.titleFontSize = tooltips.bodyFontSize = tooltips.footerFontSize = fontSize
  if (fontFamily) tooltips.titleFontFamily = tooltips.bodyFontFamily = tooltips.footerFontFamily = fontFamily
}

function _setTooltipCallback(tooltips) {
  tooltips.callbacks = tooltips.callbacks || {}

  tooltips.intersect = false
  tooltips.mode = 'index'

  tooltips.callbacks.label = function(tooltipItem, data) {
    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
    var datasetLabel = data.datasets[tooltipItem.datasetIndex].label
    var label = datasetLabel || data.labels[tooltipItem.index]
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

export default convertConfigure
