export default class SceneChart extends Chart {
  constructor(context, config, component) {
    super(context, config)

    this._component = component
  }
}
