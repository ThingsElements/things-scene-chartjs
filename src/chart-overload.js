import helpers from './chart-helpers-overload'
import ChartController from './chart-controller-overload'

function noop() {}

var helpers_backup = Chart.helpers;
var controller_backup = Chart.Controller;

export default class SceneChart extends Chart {
  constructor(context, config, component) {
    SceneChart.backup()

    super(context, config)

    SceneChart.restore()

    this._component = component
  }

  static backup() {
    Chart.helpers = helpers
    Chart.Controller = ChartController
  }

  static restore() {
    Chart.helpers = helpers_backup
    Chart.Controller = controller_backup
  }
}
