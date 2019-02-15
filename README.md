# things-scene-chartjs

An element providing a starting point for your own reusable Polymer elements.

## Dependencies

Element dependencies are managed via [Bower](http://bower.io/). You can
install that via:

    npm install -g bower

Then, go ahead and download the element's dependencies:

    bower install

## Playing With Your Element

If you wish to work on your element in isolation, we recommend that you use
[Polyserve](https://github.com/PolymerLabs/polyserve) to keep your element's
bower dependencies in line. You can install it via:

    npm install -g polyserve

And you can run it via:

    polyserve

Once running, you can preview your element at
`http://localhost:8080/components/things-scene-chartjs/`, where `things-scene-chartjs` is the name of the directory containing it.

## Testing Your Element

Simply navigate to the `/test` directory of your element to run its tests. If
you are using Polyserve: `http://localhost:8080/components/things-scene-chartjs/test/`

### web-component-tester

The tests are compatible with [web-component-tester](https://github.com/Polymer/web-component-tester).
Install it via:

    npm install -g web-component-tester

Then, you can run your tests on _all_ of your local browsers via:

    wct

#### WCT Tips

`wct -l chrome` will only run tests in chrome.

`wct -p` will keep the browsers alive after test runs (refresh to re-run).

`wct test/some-file.html` will test only the files you specify.

## Yeoman support

If you'd like to use Yeoman to scaffold your element that's possible. The official [`generator-polymer`](https://github.com/yeoman/generator-polymer) generator has a [`seed`](https://github.com/yeoman/generator-polymer#seed) subgenerator.

# 모듈 지원

## UMD

- things-scene-chartjs-ie.js (ie11 지원용 UMD 모듈)
- things-scene-chartjs.js (modern browser용 UMD 모듈)

## ES Module

- things-scene-chartjs.mjs (modern browser용 ES 모듈)

## IE 11 Support

ie11에서 사용하기 위해 다음과 같은 polyfill을 추가해야 함.

```html
<script src="//cdn.polyfill.io/v2/polyfill.min.js"></script>
<script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
<script src="/node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>
```
