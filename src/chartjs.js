import { Component, HTMLOverlayElement, error } from '@hatiolab/things-scene'
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

    console.log('changed!', chartConfig)

    try {
      element.width = width
      element.height = height

      element.options = clone(chartConfig)
    } catch (e) {
      error(e)
    }
  }

  onchange(after, before) {
    super.onchange(after, before)

    console.log(after, before)
  }
}

Component.register('chartjs', ChartJS)
