/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import Chart from 'chart.js'

export default class SceneChart extends Chart {
  constructor(context, config, component) {
    super(context, config)

    this._component = component
  }
}
