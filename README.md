# things-scene-chartjs

## build

`$ yarn build`

| type | filename                   | for            | tested |
| ---- | -------------------------- | -------------- | ------ |
| UMD  | things-scene-chartjs.js    | modern browser | X      |
| UMD  | things-scene-chartjs-ie.js | ie 11          | O      |
| ESM  | things-scene-chartjs.mjs   | modern browser | X      |

## IE 11 Support

ie11에서 사용하기 위해 다음과 같은 polyfill을 추가해야 함.

```html
<script src="//cdn.polyfill.io/v2/polyfill.min.js"></script>
<script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
<script src="/node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>
```
