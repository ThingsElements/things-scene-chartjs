/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import icon from '../assets/polar-area-chart.png'

export default {
  type: 'polar area chart',
  description: 'ChartJS - ploar area chart',
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
      type: 'polarArea',
      data: {
        labels: [],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: [
              'rgba(248, 42, 18, 1)',
              'rgba(255,99,132,1)',
              'rgba(9, 64, 169, 1)',
              'rgba(24, 185, 87, 1)',
              'rgba(216, 100, 19, 1)',
              'rgba(82, 8, 99, 1)',
              'rgba(225, 102, 234, 1)'
            ],
            borderColor: 'rgba(179,181,198,1)',
            borderWidth: 0,
            data: [],
            dataKey: 'rate1'
          }
        ],
        labelDataKey: 'hobby'
      },
      options: {
        theme: 'dark',
        legend: {
          display: true,
          position: 'top'
        },
        scale: {
          ticks: {},
          pointLabels: {}
        }
      }
    },
    data: [
      {
        hobby: 'Eating',
        rate1: 65,
        rate2: 28
      },
      {
        hobby: 'Drinking',
        rate1: 59,
        rate2: 48
      },
      {
        hobby: 'Sleeping',
        rate1: 90,
        rate2: 40
      },
      {
        hobby: 'Designing',
        rate1: 81,
        rate2: 19
      },
      {
        hobby: 'Coding',
        rate1: 56,
        rate2: 96
      },
      {
        hobby: 'Cycling',
        rate1: 55,
        rate2: 27
      },
      {
        hobby: 'Running',
        rate1: 40,
        rate2: 100
      }
    ]
  }
}
