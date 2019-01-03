import { Component, HTMLOverlayElement, error } from '@hatiolab/things-scene'
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
  ]
}

export default class ChartJS extends HTMLOverlayElement {
  get nature() {
    return NATURE
  }

  get tagName() {
    return 'things-chartjs'
  }

  createElement() {
    super.createElement()

    /* element.property => component.property */
    // this.element.onchange = e => {
    //   this.value = this.element.value
    // }
  }

  /* component.property => element.property */
  setElementProperties(element) {
    var { chart: chartConfig } = this.state
    var { width, height } = this.bounds

    try {
      element.width = width
      element.height = height

      element.options = JSON.parse(JSON.stringify(chartConfig))
    } catch (e) {
      error(e)
    }
  }
}

Component.register('chartjs', ChartJS)
