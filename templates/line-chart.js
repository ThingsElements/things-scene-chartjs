/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import icon from '../assets/line-chart.png'

export default {
  type: 'line chart',
  description: 'ChartJS - line chart',
  icon: icon,
  group: 'chartAndGauge',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  model: {
    type: 'chartjs',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    chart: {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'series 1',
            type: 'line',
            backgroundColor: 'rgb(66, 110, 164)',
            borderColor: 'rgb(66, 110, 164)',
            borderWidth: 3,
            pointBorderColor: 'rgb(66, 110, 164)',
            pointBorderWidth: 3,
            pointBackgroundColor: 'rgba(255,255,255,1)',
            lineTension: 0.4,
            yAxisID: 'left',
            data: [],
            dataKey: 'value1',
            fill: false
          },
          {
            label: 'series 2',
            type: 'line',
            backgroundColor: 'rgb(62, 196, 221)',
            borderColor: 'rgb(62, 196, 221)',
            borderWidth: 3,
            pointBorderColor: 'rgb(62, 196, 221)',
            pointBorderWidth: 3,
            pointBackgroundColor: 'rgba(255,255,255,1)',
            lineTension: 0.4,
            yAxisID: 'left',
            data: [],
            dataKey: 'value2',
            fill: false
          }
        ],
        labelDataKey: 'data'
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
        data: 'Data 1',
        value1: 20,
        value2: 60
      },
      {
        data: 'Data 2',
        value1: 30,
        value2: 10
      },
      {
        data: 'Data 3',
        value1: 80,
        value2: 40
      },
      {
        data: 'Data 4',
        value1: 20,
        value2: 30
      },
      {
        data: 'Data 5',
        value1: 40,
        value2: 80
      },
      {
        data: 'Data 6',
        value1: 10,
        value2: 30
      },
      {
        data: 'Data 7',
        value1: 60,
        value2: 20
      }
    ]
  }
}
