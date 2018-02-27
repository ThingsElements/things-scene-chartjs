export default [{
  type: 'bar chart',
  model: {
    type: 'chartjs',
    top: 200,
    left: 300,
    width: 200,
    height: 200,
    lineWidth: 5,
    alpha: 1,
    chart: {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'series 1',
          type: 'bar',
          data: [],
          backgroundColor: 'rgb(66, 110, 164)',
          borderColor: 'rgb(66, 110, 164)',
          borderWidth: 0,
          dataKey: 'value',
          yAxisID: 'left'
        }],
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
          xAxes: [{
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
          }],
          yAxes: [{
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
          }, {
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
          }]
        }
      }
    },
    data: [{
      color: "Red",
      value: 12
    }, {
      color: "Blue",
      value: 19
    }, {
      color: "Yellow",
      value: 3
    }, {
      color: "Green",
      value: 5
    }, {
      color: "Purple",
      value: 2
    }, {
      color: "Orange",
      value: 3
    }]
  }
}, {
  type: 'horizontal bar chart',
  model: {
    type: 'chartjs',
    top: 200,
    left: 300,
    width: 200,
    height: 200,
    lineWidth: 5,
    alpha: 1,
    chart: {
      type: 'horizontalBar',
      data: {
        labels: [],
        datasets: [{
          label: 'series 1',
          data: [],
          backgroundColor: 'rgb(66, 110, 164)',
          borderColor: 'rgb(66, 110, 164)',
          borderWidth: 0,
          dataKey: 'value1'
        }, {
          label: 'series 2',
          data: [],
          backgroundColor: "rgb(62, 196, 221)",
          borderColor: "rgb(62, 196, 221)",
          borderWidth: 0,
          dataKey: 'value2'
        }],
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
          xAxes: [{
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
          }],
          yAxes: [{
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
          }]
        }
      }
    },
    data: [{
      color: "Red",
      value1: 12,
      value2: 24
    }, {
      color: "Blue",
      value1: 19,
      value2: 9
    }, {
      color: "Yellow",
      value1: 3,
      value2: 6
    }, {
      color: "Green",
      value1: 5,
      value2: 2
    }, {
      color: "Purple",
      value1: 2,
      value2: 4
    }, {
      color: "Orange",
      value1: 3,
      value2: 1
    }]
  }
}, {
  type: 'line chart',
  model: {
    type: 'chartjs',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    lineWidth: 5,
    chart: {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: "series 1",
          type: 'line',
          backgroundColor: "rgb(66, 110, 164)",
          borderColor: "rgb(66, 110, 164)",
          borderWidth: 3,
          pointBorderColor: "rgb(66, 110, 164)",
          pointBorderWidth: 3,
          pointBackgroundColor: "rgba(255,255,255,1)",
          lineTension: 0.4,
          yAxisID: 'left',
          data: [],
          dataKey: 'value1',
          fill: false
        }, {
          label: "series 2",
          type: 'line',
          backgroundColor: "rgb(62, 196, 221)",
          borderColor: "rgb(62, 196, 221)",
          borderWidth: 3,
          pointBorderColor: "rgb(62, 196, 221)",
          pointBorderWidth: 3,
          pointBackgroundColor: "rgba(255,255,255,1)",
          lineTension: 0.4,
          yAxisID: 'left',
          data: [],
          dataKey: 'value2',
          fill: false
        }],
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
          xAxes: [{
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
          }],
          yAxes: [{
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
          }, {
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
          }]
        }
      }
    },
    data: [{
      data: "Data 1",
      value1: 20,
      value2: 60
    }, {
      data: "Data 2",
      value1: 30,
      value2: 10
    }, {
      data: "Data 3",
      value1: 80,
      value2: 40
    }, {
      data: "Data 4",
      value1: 20,
      value2: 30
    }, {
      data: "Data 5",
      value1: 40,
      value2: 80
    }, {
      data: "Data 6",
      value1: 10,
      value2: 30
    }, {
      data: "Data 7",
      value1: 60,
      value2: 20
    }]
  }
}, {
  type: 'mixed chart',
  model: {
    type: 'chartjs',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    fontColor: '#FF0000',
    lineWidth: 5,
    chart: {
      type: 'bar',
      subType: 'mixed',
      data: {
        labels: [],
        datasets: [{
          type: 'line',
          label: "series 1",
          backgroundColor: "rgb(66, 110, 164)",
          borderColor: "rgb(66, 110, 164)",
          borderWidth: 3,
          pointBorderColor: "rgb(66, 110, 164)",
          pointBorderWidth: 3,
          pointBackgroundColor: "rgba(255,255,255,1)",
          lineTension: 0.4,
          fill: false,
          yAxisID: 'left',
          data: [],
          dataKey: 'value1'
        }, {
          type: 'bar',
          label: "series 2",
          backgroundColor: "rgb(62, 196, 221)",
          borderColor: "rgb(62, 196, 221)",
          borderWidth: 0,
          yAxisID: 'right',
          data: [],
          dataKey: 'value2'
        }],
        labelDataKey: 'data'
      },
      options: {
        theme: 'dark',
        multiAxis: true,
        xGridLine: false,
        yGridLine: true,
        legend: {
          display: true,
          position: 'top'
        },
        scales: {
          xAxes: [{
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
          }],
          yAxes: [{
            position: 'left',
            id: 'left',
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
          }, {
            id: 'right',
            position: 'right',
            display: true,
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
          }]
        }
      }
    },
    data: [{
      data: "Data 1",
      value1: 20,
      value2: 60
    }, {
      data: "Data 2",
      value1: 30,
      value2: 10
    }, {
      data: "Data 3",
      value1: 80,
      value2: 40
    }, {
      data: "Data 4",
      value1: 20,
      value2: 30
    }, {
      data: "Data 5",
      value1: 40,
      value2: 80
    }, {
      data: "Data 6",
      value1: 10,
      value2: 30
    }, {
      data: "Data 7",
      value1: 60,
      value2: 20
    }]
  }
}, {
  type: 'radar chart',
  model: {
    type: 'chartjs',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    fontColor: '#FF0000',
    lineWidth: 5,
    chart: {
      type: 'radar',
      data: {
        labels: [],
        datasets: [
          {
            label: "My First dataset",
            type: 'radar',
            backgroundColor: "rgb(66, 110, 164)",
            borderColor: "rgb(66, 110, 164)",
            pointBackgroundColor: "rgba(255,255,255,1)",
            pointBorderColor: "rgb(66, 110, 164)",
            data: [],
            fill: false,
            dataKey: 'rate1'
          },
          {
            label: "My Second dataset",
            type: 'radar',
            backgroundColor: "rgb(62, 196, 221)",
            borderColor: "rgb(62, 196, 221)",
            pointBackgroundColor: "rgba(255,255,255,1)",
            pointBorderColor: "rgb(62, 196, 221)",
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
          ticks: {
          }
        }
      }
    },
    data: [{
      hobby: "Eating",
      rate1: 65,
      rate2: 28
    }, {
      hobby: "Drinking",
      rate1: 59,
      rate2: 48
    }, {
      hobby: "Sleeping",
      rate1: 90,
      rate2: 40
    }, {
      hobby: "Designing",
      rate1: 81,
      rate2: 19
    }, {
      hobby: "Coding",
      rate1: 56,
      rate2: 96
    }, {
      hobby: "Cycling",
      rate1: 55,
      rate2: 27
    }, {
      hobby: "Running",
      rate1: 40,
      rate2: 100
    }]
  }
}, {
  type: 'polar area chart',
  model: {
    type: 'chartjs',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    fontColor: '#FF0000',
    lineWidth: 5,
    chart: {
      type: 'polarArea',
      data: {
        labels: [],
        datasets: [{
          label: "My First dataset",
          backgroundColor: [
            "rgba(248, 42, 18, 1)",
            "rgba(255,99,132,1)",
            "rgba(9, 64, 169, 1)",
            "rgba(24, 185, 87, 1)",
            "rgba(216, 100, 19, 1)",
            "rgba(82, 8, 99, 1)",
            "rgba(225, 102, 234, 1)"
          ],
          borderColor: "rgba(179,181,198,1)",
          borderWidth: 0,
          data: [],
          dataKey: 'rate1'
        }],
        labelDataKey: 'hobby'
      },
      options: {
        theme: 'dark',
        legend: {
          display: true,
          position: 'top'
        }
      }
    },
    data: [{
      hobby: "Eating",
      rate1: 65,
      rate2: 28
    }, {
      hobby: "Drinking",
      rate1: 59,
      rate2: 48
    }, {
      hobby: "Sleeping",
      rate1: 90,
      rate2: 40
    }, {
      hobby: "Designing",
      rate1: 81,
      rate2: 19
    }, {
      hobby: "Coding",
      rate1: 56,
      rate2: 96
    }, {
      hobby: "Cycling",
      rate1: 55,
      rate2: 27
    }, {
      hobby: "Running",
      rate1: 40,
      rate2: 100
    }]
  }
}, {
  type: 'pie chart',
  model: {
    type: 'chartjs',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    fontColor: '#FF0000',
    lineWidth: 5,
    chart: {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          borderWidth: 0,
          dataKey: 'value'
        }],
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
    data: [{
      label: "A",
      value: 80
    }, {
      label: "B",
      value: 15
    }, {
      label: "C",
      value: 15
    }]
  }
}, {
  type: 'doughnut chart',
  model: {
    type: 'chartjs',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    fontColor: '#FF0000',
    lineWidth: 5,
    chart: {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          borderWidth: 0,
          dataKey: 'value'
        }],
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
    data: [{
      label: "Red",
      value: 300
    }, {
      label: "Blue",
      value: 50
    }, {
      label: "Yellow",
      value: 100
    }]
  }
}].map(t => {
  return {
    name: 'chartjs',
    /* 다국어 키 표현을 어떻게.. */
    description: '...',
    /* 다국어 키 표현을 어떻게.. */
    group: 'chartAndGauge',
    /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
    icon: '../',
    /* 또는, Object */
    template: t
  }
})
