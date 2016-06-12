function noop() {}

var helpers_backup = Chart.helpers;
var controller_backup = Chart.Controller;

var helpers = Object.assign({}, Chart.helpers);
helpers.retinaScale = noop;
helpers.addResizeListener = noop;
helpers.removeResizeListener = noop;

export default helpers
