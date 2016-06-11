import monkeyPatch from './monkey-patch'

if(typeof window !== 'undefined')
  window.monkeyPatch = monkeyPatch

if (typeof global !== 'undefined') {
  global.monkeyPatch  = monkeyPatch
}


export { default as ChartJSLine } from './line'
