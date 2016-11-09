import SceneChart from './chart-overload'

var { Component, RectPath } = scene

Chart.defaults.global.defaultFontSize = 10

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'chartjs-properties',
    label: '',
    name: 'chart'
  }]
}
export default class ChartJSWrapper extends RectPath(Component) {

  _draw(context) {

    var {
      left,
      top,
      width,
      height
    } = this.bounds;

    context.beginPath();
    context.rect(left, top, width, height);
    this.drawFill(context);
    this.drawStroke(context);

    context.closePath();

    if(!this._chart) {
      var { chart, data } = this.model

      if(chart) {
        this.initChart(context)
      }

    }

    var { width, height, left, top } = this.model;

    var self = this;

    context.translate(left, top);

    var data = this.get('data')

    if(data) {
      this._chart.data.rawData = this.convertObject(data)
    }

    if(!this._draw_once) {
      this._chart.reset(width, height, context);
      this._chart.update(0);
      this._draw_once = true;
    } else {
      if(this._chart.chart.ctx != context){
        this._chart.reset(width, height, context);
      }

      this._chart.draw(this._chart.__ease__);

    }

    context.translate(-left, -top);

  }

  get nature() {
    return NATURE
  }

  initChart(context) {

    var {chart} = this.model

    if(chart.options){
      this.convertOptions(chart)
    }

    this._chart = new SceneChart(context,
      JSON.parse(JSON.stringify(chart)),
      this
    )
  }

  destroyChart() {
    this._chart.destroy()
    this._chart = null
  }

  convertObject(dataArray) {
    if(!dataArray)
      return null

    if(!(dataArray instanceof Array)) {
      if(dataArray instanceof Object) {
        return dataArray
      }
      return null
    }

    // modeling중 변수 기본값에 대한 처리
    if(dataArray[0].hasOwnProperty('__field1')) {
      dataArray = this.toObjectArrayValue(dataArray)
    }

    let label = this.model.chart.data.labelDataKey
    let seriesKeys = []

    for(let i in this.model.chart.data.datasets) {
      seriesKeys.push(this.model.chart.data.datasets[i].dataKey)
    }

    let seriesData = []
    let labelData = []

    let convertedObject = {
      seriesData: seriesData,
      labelData: labelData
    }

    for(let i in dataArray) {
      let currData = dataArray[i]
      labelData.push(currData[label])

      for(let i in seriesKeys) {
        if(!seriesData[i])
          seriesData[i] = []
        seriesData[i].push(currData[seriesKeys[i]])
      }
    }

    return convertedObject
  }

  toObjectArrayValue(array) {
    if(!array || array.length === 0)
      return null

    let indexKeyMap = {}
    let value = []

    for(let key in array[0]) {
      indexKeyMap[key] = array[0][key]
    }

    for(var i = 1; i < array.length; i++) {
      let object = {}
      let thisObject = array[i]
      for(let key in indexKeyMap) {
        let k = indexKeyMap[key];
        let v = thisObject[key];
        object[k] = v
      }

      value.push(object)
    }

    return value
  }

  convertOptions(chart) {
    this.setStacked(chart.options)
    this.setMultiAxis(chart)
    this.setFontSize(chart.options)
    this.setTheme(chart.options)
  }

  setStacked(options) {
    if(!options)
      return

    var stacked = options.stacked

    if(!options.scales)
      options.scales = {}

    if(options.scales && options.scales.xAxes){
      for(let axis of options.scales.xAxes) {
        axis.stacked = stacked
      }
    }

    if(options.scales && options.scales.yAxes){
      for(let axis of options.scales.yAxes) {
        axis.stacked = stacked
      }
    }
  }

  setMultiAxis(chart) {
    if(!chart)
      return

    var options = chart.options
    if(!options)
      return

    var multiAxis = options.multiAxis

    if(!options.scales)
      options.scales = {}

    if(!options.scales.yAxes)
      return

    var datasets = chart.data.datasets
    if(multiAxis){

      if(options.scales.yAxes.length === 1) {
        options.scales.yAxes.push({
          position: 'right',
          id: 'right'
        })
      }
    } else {
      if(datasets) {
        for(let dataset of datasets) {
          if(dataset.yAxisID == 'right')
            dataset.yAxisID = 'left'
        }
      }

      if(options.scales.yAxes.length > 1) {
        options.scales.yAxes = [options.scales.yAxes[0]]
      }
    }
  }

  setTheme(options) {
    if(!options)
      return

    var theme = options.theme

    let darkColor = "#000"
    let lightColor = "#fff"

    var baseColor;

    switch(theme) {
      case 'light' :
        baseColor = lightColor
        break;
      case 'dark' :
      default:
        baseColor = darkColor
        break;
    }

    baseColor = tinycolor(baseColor)

    var isDark = baseColor.isDark();

    var operatorFunction = isDark ? "brighten" : "darken"

    if(!options.legend)
      options.legend = {}

    if(!options.legend.labels)
      options.legend.labels = {}

    options.legend.labels.fontColor = baseColor.clone().setAlpha(.5).toString();

    if(!options.scales)
      options.scales = {}

    if(options.scales && options.scales.xAxes){
      for(let axis of options.scales.xAxes) {
        if(!axis.gridLines)
          axis.gridLines = {}

        axis.gridLines.display = options.xGridLine
        axis.gridLines.zeroLineColor = baseColor.clone().setAlpha(.5).toString();
        axis.gridLines.color = baseColor.clone().setAlpha(.1).toString();

        if(!axis.ticks)
          axis.ticks = {}

        axis.ticks.fontColor = baseColor.clone().setAlpha(.5).toString();
      }
    }

    if(options.scales && options.scales.yAxes){
      for(let axis of options.scales.yAxes) {
        if(!axis.gridLines)
          axis.gridLines = {}

        axis.gridLines.display = options.yGridLine
        axis.gridLines.zeroLineColor = baseColor.clone().setAlpha(.5).toString();
        axis.gridLines.color = baseColor.clone().setAlpha(.1).toString();

        if(!axis.ticks)
          axis.ticks = {}

        axis.ticks.fontColor = baseColor.clone().setAlpha(.5).toString();
      }
    }

  }

  setFontSize(options) {
    if(!options)
      return

    var fontSize = options.fontSize

    let darkColor = "#000"
    let lightColor = "#fff"

    if(!options.legend)
      options.legend = {}

    if(!options.legend.labels)
      options.legend.labels = {}

    options.legend.labels.fontSize = fontSize;

    if(!options.scales)
      options.scales = {}

    if(options.scales && options.scales.xAxes){
      for(let axis of options.scales.xAxes) {
        if(!axis.ticks)
          axis.ticks = {}

        axis.ticks.fontSize = fontSize
      }
    }

    if(options.scales && options.scales.yAxes){
      for(let axis of options.scales.yAxes) {
        if(!axis.ticks)
          axis.ticks = {}

        axis.ticks.fontSize = fontSize;
      }
    }

  }

  onchange(after) {

    var isChartChanged = false

    if (after.hasOwnProperty('chart')) {
      isChartChanged = true;
      this.model.chart = JSON.parse(JSON.stringify(after.chart))
    }

    if(after.hasOwnProperty('data')) {
      // this.model.data = after.data
      if(this._chart) {
        this._chart.config.data.rawData = after.data || {};
        this._chart.update()
      }
    }

    if(isChartChanged)
      this.destroyChart()

    this._draw_once = false;
    this.invalidate()

  }

  onclick(e) {
    e.chartJSWrapper = this;
    if(this._chart)
      this._chart.eventHandler(e)
  }

  ondragstart(e) {

  }

  onmousemove(e) {
    e.chartJSWrapper = this;
    if(this._chart)
      this._chart.eventHandler(e)
  }
}

Component.register('chartjs', ChartJSWrapper)
