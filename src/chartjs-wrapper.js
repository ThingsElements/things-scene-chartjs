import SceneChart from './chart-overload'

var { Component, Rect } = scene

export default class ChartJSWrapper extends Rect {

  _draw(context) {

    if(!this._chart) {
      var { chart, data } = this.model

      if(chart) {
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

    if(after.width || after.height) {
      this._draw_once = false;
      this.invalidate();
    }

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
          this._draw_once = false;
          this.invalidate();
        }

      }
    }

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
