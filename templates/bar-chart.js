/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import icon from '../assets/bar-chart.png'

export default {
  type: 'bar chart',
  description: 'ChartJS - barchart',
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
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'series 1',
            type: 'bar',
            data: [],
            backgroundColor: 'rgb(66, 110, 164)',
            borderColor: 'rgb(66, 110, 164)',
            borderWidth: 0,
            dataKey: 'value',
            yAxisID: 'left'
          }
        ],
        labelDataKey: 'color'
      },
      options: {
        theme: 'dark',
        xGridLine: false,
        yGridLine: true,
        legend: {
          display: true,
          position: 'top'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              },
              scaleLabel: {
                labelString: '',
                display: false
              },
              ticks: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              id: 'left',
              position: 'left',
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
            },
            {
              id: 'right',
              position: 'right',
              display: false,
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
        value: 12
      },
      {
        color: 'Blue',
        value: 19
      },
      {
        color: 'Yellow',
        value: 3
      },
      {
        color: 'Green',
        value: 5
      },
      {
        color: 'Purple',
        value: 2
      },
      {
        color: 'Orange',
        value: 3
      }
    ]
  }
}
