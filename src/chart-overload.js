import helpers from './chart-helpers-overload'
import ChartController from './chart-controller-overload'

function noop() {}

var helpers_backup = Chart.helpers;
var controller_backup = Chart.Controller;

function backup() {
  Chart.helpers = helpers
  Chart.Controller = ChartController
}

function restore() {
  Chart.helpers = helpers_backup
  Chart.Controller = controller_backup
}

export default class SceneChart extends Chart {
  constructor(context, config, component) {
    backup()

    super(context, config)

    restore()

    this._component = component
  }
}
