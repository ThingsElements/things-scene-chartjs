/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import icon from '../assets/radar-chart.png'

export default {
  type: 'radar chart',
  description: 'ChartJS - radar chart',
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
      type: 'radar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'My First dataset',
            type: 'radar',
            backgroundColor: 'rgb(66, 110, 164)',
            borderColor: 'rgb(66, 110, 164)',
            pointBackgroundColor: 'rgba(255,255,255,1)',
            pointBorderColor: 'rgb(66, 110, 164)',
            data: [],
            fill: false,
            dataKey: 'rate1'
          },
          {
            label: 'My Second dataset',
            type: 'radar',
            backgroundColor: 'rgb(62, 196, 221)',
            borderColor: 'rgb(62, 196, 221)',
            pointBackgroundColor: 'rgba(255,255,255,1)',
            pointBorderColor: 'rgb(62, 196, 221)',
            data: [],
            fill: false,
            dataKey: 'rate2'
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
