/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import icon from '../assets/horizontal-bar-chart.png'

export default {
  type: 'horizontal bar chart',
  description: 'ChartJS - horizontal barchart',
  icon: icon,
  group: 'chartAndGauge',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  model: {
    type: 'chartjs',
    top: 200,
    left: 300,
    width: 200,
    height: 200,
    chart: {
      type: 'horizontalBar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'series 1',
            data: [],
            backgroundColor: 'rgb(66, 110, 164)',
            borderColor: 'rgb(66, 110, 164)',
            borderWidth: 0,
            dataKey: 'value1'
          },
          {
            label: 'series 2',
            data: [],
            backgroundColor: 'rgb(62, 196, 221)',
            borderColor: 'rgb(62, 196, 221)',
            borderWidth: 0,
            dataKey: 'value2'
          }
        ],
        labelDataKey: 'color'
      },
      options: {
        theme: 'dark',
        xGridLine: true,
        yGridLine: false,
        legend: {
          display: true,
          position: 'top'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true
              },
              scaleLabel: {
                labelString: '',
                display: false
              },
              ticks: {
                autoMin: true,
                autoMax: true,
                display: true
              }
            }
          ],
          yAxes: [
            {
              id: 'left',
              position: 'left',
              gridLines: {
                display: false
              },
              scaleLabel: {
                labelString: '',
                display: false
              },
              ticks: {
                autoMin: true,
                autoMax: true,
                display: true
              }
            }
          ]
        }
      }
    },
    data: [
      {
        color: 'Red',
        value1: 12,
        value2: 24
      },
      {
        color: 'Blue',
        value1: 19,
        value2: 9
      },
      {
        color: 'Yellow',
        value1: 3,
        value2: 6
      },
      {
        color: 'Green',
        value1: 5,
        value2: 2
      },
      {
        color: 'Purple',
        value1: 2,
        value2: 4
      },
      {
        color: 'Orange',
        value1: 3,
        value2: 1
      }
    ]
  }
}
