/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { Component, HTMLOverlayElement, error } from '@hatiolab/things-scene'
import tinycolor from 'tinycolor2'
import clone from './clone'
import './chartjs-element'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'chartjs',
      label: '',
      name: 'chart'
    }
  ],
  'value-property': 'data'
}

export default class ChartJS extends HTMLOverlayElement {
  get nature() {
    return NATURE
  }

  get hasTextProperty() {
    return false
  }

  get tagName() {
    return 'things-chartjs'
  }

  createElement() {
    super.createElement()

    var { width, height } = this.bounds
    var { chart: chartConfig } = this.state
    var element = this.element
    var data = this.data

    element.width = width
    element.height = height

    this.convertConfigure(chartConfig)
    element.options = clone(chartConfig)
    element.data = this.convertObject(data)
  }

  /* component.property => element.property */
  setElementProperties(element) {
    var { chart: chartConfig } = this.state
    var { width, height } = this.bounds
    var data = this.data

    try {
      element.width = width
      element.height = height

      if (chartConfig && this._isChartChanged) {
        this.convertConfigure(chartConfig)
        element.options = clone(chartConfig)

        this._isChartChanged = false
      }

      if (this._isDataChanged) {
        element.data = this.convertObject(data)
        this._isDataChanged = false
      }
    } catch (e) {
      error(e)
    }
  }

  convertObject(dataArray) {
    if (!dataArray) return null

    if (typeof dataArray == 'string') {
      try {
        dataArray = JSON.parse(dataArray)
      } catch (e) {
        console.warn('invalid chart data format', e)
        return null
      }
    }

    if (!(dataArray instanceof Array)) {
      // is not Array
      if (dataArray instanceof Object) {
        return dataArray
      }
      return null
    }

    if (dataArray.length === 0) {
      return null
    }

    // modeling중 변수 기본값에 대한 처리
    if (dataArray[0].hasOwnProperty('__field1')) {
      dataArray = this.toObjectArrayValue(dataArray)
    }

    let label = this.model.chart.data.labelDataKey
    let seriesKeys = []

    for (let i in this.model.chart.data.datasets) {
      seriesKeys.push(this.model.chart.data.datasets[i].dataKey)
    }

    let seriesData = []
    let labelData = []

    let convertedObject = {
      seriesData: seriesData,
      labelData: labelData
    }

    for (let i in dataArray) {
      let currData = dataArray[i]
      labelData.push(currData[label])

      for (let i in seriesKeys) {
        if (!seriesKeys[i]) continue

        if (!seriesData[i]) seriesData[i] = []

        // 값이 NaN 경우엔 차트를 그리지 않음
        if (Number(currData[seriesKeys[i]]) == NaN) {
          currData[seriesKeys[i]] = NaN
        }

        seriesData[i].push(currData[seriesKeys[i]])
      }
    }

    return convertedObject
  }

  convertConfigure(chart) {
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
    var fontSize = this.model.fontSize || options.defaultFontSize
    var fontFamily = (options.defaultFontFamily = this.model.fontFamily)
    var theme = options.theme

    // backward compatible
    this._configureBackwardsCompatible(chart.type, options)

    // setup series configure
    for (let i in datasets) {
      let series = datasets[i]
      this._setSeriesConfigures(series)

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
          this._setStacked(axis, stacked)
          this._setScalesFontSize(axis, fontSize)
          this._setScalesFontFamily(axis, fontFamily)
          this._setScalesAutoMinMax(axis)
          this._setAxisTitle(axis)
          this._setScalesTheme(axis, theme)
          this._appendTickCallback(axis.ticks)

          axis.gridLines.display = options.xGridLine
        }

        // 1-2. setup yAxes
        for (let i in yAxes) {
          let axis = yAxes[i]

          if (i == 1) {
            this._setMultiAxis(axis, multiAxis)
          }
          this._setStacked(axis, stacked)
          this._setScalesFontSize(axis, fontSize)
          this._setScalesFontFamily(axis, fontFamily)
          this._setScalesAutoMinMax(axis)
          this._setAxisTitle(axis)
          this._setScalesTheme(axis, theme)
          this._appendTickCallback(axis.ticks)

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
    this._setLegendTheme(legend, theme)

    // 3. setup tooltips
    tooltips.titleFontSize = tooltips.bodyFontSize = tooltips.footerFontSize = fontSize
    tooltips.titleFontFamily = tooltips.bodyFontFamily = tooltips.footerFontFamily = fontFamily
    this._setTooltipCallback(tooltips)
  }

  _configureBackwardsCompatible(type, options) {
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

  _configureBackwardsCompatible(type, options) {
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

  _setStacked(axis, stacked) {
    axis.stacked = stacked
  }

  _setMultiAxis(axis, multiAxis) {
    axis.display = multiAxis
  }

  _setAxisTitle(axis) {
    if (!axis.scaleLabel) axis.scaleLabel = {}
    axis.scaleLabel.labelString = axis.axisTitle
    axis.scaleLabel.display = axis.axisTitle ? true : false
  }

  _setScalesFontSize(axis, fontSize) {
    axis.ticks = axis.ticks ? axis.ticks : {}
    axis.ticks.fontSize = fontSize
  }

  _setScalesFontFamily(axis, fontFamily) {
    axis.ticks = axis.ticks ? axis.ticks : {}
    axis.ticks.fontFamily = fontFamily
  }

  _setScalesAutoMinMax(axis) {
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

  _setScalesTheme(axis, theme) {
    var baseColor = this._getBaseColorFromTheme(theme)

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

  _setLegendTheme(legend, theme) {
    var baseColor = this._getBaseColorFromTheme(theme)

    legend.labels = legend.labels ? legend.labels : {}
    legend.labels.fontColor = baseColor
      .clone()
      .setAlpha(0.5)
      .toString()
  }

  _getBaseColorFromTheme(theme) {
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

  _setSeriesConfigures(series) {
    var type = series.type || this.model.chart.type || 'line'

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

  _appendTickCallback(ticks) {
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

  _setTooltipCallback(tooltips) {
    tooltips.callbacks = {
      label: function(tooltipItem, data) {
        var label = data.labels[tooltipItem.index]
        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
        var toNumValue = Number(value)

        if (!isNaN(toNumValue)) {
          value = toNumValue
        }

        if (value) value = value.toLocaleString()

        var prefix = data.datasets[tooltipItem.datasetIndex].valuePrefix || ''
        var suffix = data.datasets[tooltipItem.datasetIndex].valueSuffix || ''

        return prefix + value + suffix
      }
    }
  }

  onchange(after, before) {
    this._isChartChanged = false

    var keys = Object.getOwnPropertyNames(after)
    var key = keys && keys[0]
    var keySplit = key.split('.')

    if ('chart' in after || key[0] == 'chart' || 'fontSize' in after || 'fontFamily' in after) {
      this._isChartChanged = true
    }

    if (keySplit.length > 1) {
      delete this.model[key]
    }

    super.onchange(after, before)
  }

  onchangeData(data) {
    this._isDataChanged = true
  }
}

Component.register('chartjs', ChartJS)
