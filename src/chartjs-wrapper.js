import SceneChart from './chart-overload'

var { Component, Rect } = scene

Chart.defaults.global.defaultFontSize = 10

export default class ChartJSWrapper extends Rect {

  _draw(context) {

    if(!this._chart) {
      var { chart, data } = this.model

      if(chart) {
        if(chart.options){
          this.convertOptions(chart)

        }

        this._chart = new SceneChart(context,
          JSON.parse(JSON.stringify(chart)),
          this
        )
      }

      if(data) {
        this._chart.data.rawData = data
      }

    }

    var { width, height, left, top } = this.model;

    var self = this;

    context.translate(left, top);

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

  get controls() {}

  convertOptions(chart) {
    this.setStacked(chart.options)
    this.setMultiAxis(chart)
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
        axis.gridLines.zeroLineColor = baseColor.clone().setAlpha(.5).toString();
        axis.gridLines.color = baseColor.clone().setAlpha(.1).toString();

        if(!axis.ticks)
          axis.ticks = {}

        axis.ticks.fontColor = baseColor.clone().setAlpha(.5).toString();
      }
    }

  }

  onchange(after) {

    if (after.hasOwnProperty('chart')) {
      this._chart = null;
      this._draw_once = false;

      var datasets = this.model.chart.data.datasets;
      var seriesData = this.model.chart.data.rawData.seriesData;

      var data = [];

      if(datasets.length > seriesData.length) {
        for(var i = 0; i < this.model.chart.data.rawData.labelData.length; i++) {
          data.push(Math.floor(Math.random() * seriesData[0][i] / 2));
        }

        seriesData.push(data);
      }

      this.invalidate();
      return;
    }

    // if(after.width || after.height) {
    //   this._draw_once = false;
    //   this.invalidate();
    // }

    if(after.hasOwnProperty('data')) {
      this._chart.config.data.rawData = after.data || {};
      this._chart.update()
    }

    for (var key in after) {
      if (!after.hasOwnProperty(key)) {
        continue;
      }

      var lastObj = this.model;
      var lastChartObj = this;
      var keySplit = key.split('.');
      var value = after[key];

      if(typeof value === 'object') {
        value = JSON.parse(JSON.stringify(value));
      }

      if(keySplit.length > 0) {
        var isChartChanged = false;
        for(var i =0; i<keySplit.length; i++) {
          var k = keySplit[i]

          if(k === 'chart')
            isChartChanged = true;

          k = k.replace('#', '')

          if(i === keySplit.length - 1){
            lastObj[k] = value;
            lastChartObj[k] = value;
          }

          lastObj = lastObj[k];
          lastChartObj = lastChartObj[k] || lastChartObj["_"+k];
        }

        if(isChartChanged){
          this._chart = null;
          this._draw_once = false;
          this.invalidate();
        }

      }
    }

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
