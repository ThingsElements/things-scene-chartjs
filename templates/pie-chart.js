/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import icon from '../assets/pie-chart.png'

export default {
  type: 'pie chart',
  description: 'ChartJS - pie chart',
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
      type: 'pie',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderWidth: 0,
            dataKey: 'value'
          }
        ],
        labelDataKey: 'label'
      },
      options: {
        theme: 'dark',
        legend: {
          display: true,
          position: 'top'
        },
        animation: {
          animateScale: true
        }
      }
    },
    data: [
      {
        label: 'A',
        value: 80
      },
      {
        label: 'B',
        value: 15
      },
      {
        label: 'C',
        value: 15
      }
    ]
  }
}
