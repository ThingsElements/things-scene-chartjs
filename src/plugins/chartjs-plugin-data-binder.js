/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
function convertObject(dataArray, chartInstance) {
  if (!dataArray) return null

  if (typeof dataArray == 'string') {
    try {
      dataArray = JSON.parse(dataArray)
    } catch (e) {
      console.warn('invalid chart data format', e)
      return null
    }
  }

  if (!(dataArray instanceof Array)) {
    // is not Array
    if (dataArray instanceof Object) {
      return dataArray
    }
    return null
  }

  if (dataArray.length === 0) {
    return null
  }

  // modeling중 변수 기본값에 대한 처리
  if (dataArray[0].hasOwnProperty('__field1')) {
    dataArray = toObjectArrayValue(dataArray)
  }

  let label = chartInstance.data.labelDataKey
  let seriesKeys = []

  for (let i in chartInstance.data.datasets) {
    seriesKeys.push(chartInstance.data.datasets[i].dataKey)
  }

  let seriesData = []
  let labelData = []

  let convertedObject = {
    seriesData: seriesData,
    labelData: labelData
  }

  for (let i in dataArray) {
    let currData = dataArray[i]
    labelData.push(currData[label])

    for (let i in seriesKeys) {
      if (!seriesKeys[i]) continue

      if (!seriesData[i]) seriesData[i] = []

      // 값이 NaN 경우엔 차트를 그리지 않음
      if (Number(currData[seriesKeys[i]]) == NaN) {
        currData[seriesKeys[i]] = NaN
      }

      seriesData[i].push(currData[seriesKeys[i]])
    }
  }

  return convertedObject
}

function toObjectArrayValue(array) {
  if (!array || array.length === 0) return null

  let indexKeyMap = {}
  let value = []

  for (let key in array[0]) {
    indexKeyMap[key] = array[0][key]
  }

  for (var i = 1; i < array.length; i++) {
    let object = {}
    let thisObject = array[i]
    for (let key in indexKeyMap) {
      let k = indexKeyMap[key]
      let v = thisObject[key]
      object[k] = v
    }

    value.push(object)
  }

  return value
}

function updateSeriesDatas(chartInstance) {
  if (!chartInstance.data.rawData) {
    return
  }

  let seriesData = chartInstance.data.rawData.seriesData
  let chartId = chartInstance.id

  if (!seriesData || seriesData.length === 0) seriesData = [null]

  for (let key in chartInstance.data.datasets) {
    chartInstance.data.datasets[key].data = seriesData[key] || []
  }
}

function updateLabelDatas(chartInstance) {
  let labelData = chartInstance.data.rawData.labelData
  chartInstance.config.data.labels = labelData || []
}

export default {
  id: 'data-binder',
  beforeUpdate: function(chartInstance) {
    if (!chartInstance.data) return

    if (!chartInstance.data.rawData) chartInstance.data.rawData = []

    chartInstance.data.rawData = convertObject(chartInstance.data.rawData, chartInstance) || {
      seriesData: [],
      labelData: []
    }

    let seriesData = chartInstance.data.rawData.seriesData
    updateLabelDatas(chartInstance)
    updateSeriesDatas(chartInstance)
  }
}
