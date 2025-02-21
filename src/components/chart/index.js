/*
 * @Description:
 * @Author: ldx
 * @Date: 2024-01-19 15:04:07
 * @LastEditors: ldx
 * @LastEditTime: 2024-07-22 14:58:44
 */
import _ from "lodash"
import * as echarts from "echarts"



export const markPoint = {
  symbol: "circle",
  symbolSize: 0,
  label: {
    fontSize: 12,
    fontWeight: "bolder",
    color: "auto",
    formatter: function (params) {
      return params.value.toFixed(2) // 保留两位小数
    }
  },

  data: [
    {
      type: "max",
      name: "最大值",
      symbolOffset: [0, -10]
    },
    {
      type: "min",
      name: "最小值",
      symbolOffset: [0, -10]
    }
  ]
}

/** 创建图表的Option数据 */
export function createChartOption(option = {}) {
  return echarts.util.merge(option, {
    xAxis: {
      type: "category",
      data: []
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          dashOffset: 2
        }
      },
      axisLabel: {
        interval: 0,
        color: "#909399",
        fontSize: 10
      },
      // min: "dataMin",
      // max: "dataMax",
      // scale: true //自适应
    },
    dataZoom: [
      {
        show: false,
        realtime: false,
        start: 0,
        end: 100,
        height: 0
      },
      {
        type: "inside",
        realtime: true,
        start: 0,
        end: 100
      }
    ],
    grid: {
      top: 28,
      left: 34,
      right: 10,
      bottom: 24
    },
    tooltip: {
      trigger: "axis"
    },
    series: []
  })
}
/** 条形图 */
export function createyAxisBarOption(option = {}) {
  return echarts.util.merge(option, {
    grid: {
      top: 0,
      bottom: -20,
      containLabel: true
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      },
      valueFormatter: (value) => Number(value).toFixed(2) + "MW"
    },
    dataZoom: [
      {
        show: false,
        realtime: false,
        type: "slider",
        start: 0,
        end: 40,
        width: 10,
        yAxisIndex: 0
      },
      {
        type: "inside",
        realtime: true,
        start: 0,
        end: 100,
        yAxisIndex: 0
      }
    ],
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      show: false
    },
    yAxis: {
      type: "category",
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        color: "#328F84",
        fontSize: 10,
        fontWeight: "bold"
      },
      data: []
    },

    series: [
      {
        type: "bar",
        data: [],
        color: {
          type: "linear",
          x: 0, //右
          y: 0, //下
          x2: 1, //左
          y2: 0, //上
          colorStops: [
            {
              offset: 0,
              color: "rgba(32, 153, 128, 1)" // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: "rgba(32, 153, 128, 0.78)" // 100% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(32, 153, 128, 0.20)" // 100% 处的颜色
            }
          ]
        }
      }
    ]
  })
}
/** 柱状图 */
export function createBarOption(option = {}) {
  return echarts.util.merge(option, {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      },
      valueFormatter: (value) => Number(value).toFixed(0) + "万t"
    },
    grid: {
      right: 10,
      top: 20,
      left: 8,
      bottom: 6,
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: [],
      axisLabel: {
        interval: 0,
        color: "#fff",
        fontSize: 10
      }
    },
    yAxis: {
      type: "value",
      show: true,
      axisLabel: {
        interval: 0,
        color: "#fff",
        fontSize: 10
      }
    },
    series: [
      {
        name: "",
        type: "bar",
        emphasis: {
          focus: "series"
        },
        data: [],
        color: {
          type: "linear",
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "rgba(32, 153, 128, 1)"
            },
            {
              offset: 0.5,
              color: "rgba(32, 153, 128, 0.78)"
            },
            {
              offset: 1,
              color: "rgba(32, 153, 128, 0.20)"
            }
          ]
        }
      }
    ]
  })
}

/** 圆环图 */
export function createRingOption(option = {}) {
  return echarts.util.merge(option, {
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    series: [
      {
        type: "gauge",
        startAngle: -60,
        endAngle: 300,
        pointer: {
          show: false
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: "rgba(32, 153, 128, 0.40)" // 终点颜色
              },
              {
                offset: 0,

                color: "rgba(32, 153, 128, 1)" // 起点颜色
              }
            ]),
            shadowColor: "rrgba(32, 153, 128, 0.78)"
          }
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false
        },
        axisLine: {
          lineStyle: {
            width: 12
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        data: [
          {
            value: 0,
            name: "当前最大缺口",
            title: {
              offsetCenter: ["0%", "15%"]
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ["0%", "-15%"]
            }
          }
        ],
        title: {
          fontSize: 11
        },
        detail: {
          color: "#4ABB9F",
          fontSize: 14,
          formatter: "0MW"
        }
      }
    ]
  })
}
/** 饼图 */
export function createPieOption(option = {}) {
  return echarts.util.merge(option, {
    tooltip: {
      trigger: "item",
      valueFormatter: (value) => Number(value).toFixed(2) + "万t"
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      right: 0,
      bottom: 0,
      top:'center',
      itemWidth: 10, // 调整图例项的宽度
      itemHeight: 30, // 调整图例项的高度
      icon: "circle",
      textStyle: {
        rich: {
          a: {
            color: "#fff",
            fontWeight: "bold",
            fontSize: 11,
            width: 32
          },
          b: {
            color: "#fff",
            fontWeight: "normal",
            fontSize: 11,
            width: 40,
            padding: [0, 0, 0, 10]
          },
          c: {
            color: "#fff",
            fontWeight: "normal",
            fontSize: 11,
            width: 20,
            padding: [0, 0, 0, 10]
          }
        }
      },
    },
    yAxis: {
      show: false
    },
    xAxis: {
      show: false
    },
    graphic: [
      {
        type: "text",
        left: "84",
        top: "40%",
        style: {
          text: 10655,
          textAlign: "center",
          fill: "#fff",
          fontSize: 16,
          fontWeight: "bold"
        }
      },
      {
        type: "text",
        left: "17%",
        top: "53%",
        style: {
          text: "总排放量(万t)",
          textAlign: "center",
          fill: "#fff",
          fontSize: 14,
          fontWeight: "normal"
        }
      }
    ],
    series: [
      {
        type: "pie",
        radius: ["60%", "86%"],
        center: ["28%", "50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: "#dadada",
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false
          }
        },
        labelLine: {
          show: false
        },
        data: []
      }
    ]
  })
}

/** 气泡图 */
export function createBubbleOption(option = {}) {
  const chartdata = [
    {
      name: "充电桩A_1",
      value: "305",
      size: 86
    },
    {
      name: "充电桩A_2",
      value: "193",
      size: 80
    },
    {
      name: "充电桩A_3",
      value: "484",
      size: 110
    },
    {
      name: "充电桩B_1",
      value: "355",
      size: 90
    },
    {
      name: "充电桩B_2",
      value: "103",
      size: 70
    },
    {
      name: "充电桩B_3",
      value: "474",
      size: 105
    },

  ];


  const color = ['#6DFFA1', '#56C7F6', '#F9F08A', '#6DFFA1', '#56C7F6', '#F9F08A'];
  const data = []

  chartdata.map((item, index) => {
    data.push(
      {
        name: item.name + '\n\n' + item.value + '万t',
        value: 111,
        symbolSize: item.size,
        // draggable: true,
        label: {
          normal: {
            textStyle: {
              fontSize: 12,
              color: '#fff',
            },
          },
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
              {
                offset: 0.2,
                color: 'rgba(27, 54, 72, 0.2)',
              },
              {
                offset: 0.8,
                color: color[index],
              },
            ]),
            opacity: 1,
            borderWidth: 1,
            borderColor: color[index],
            shadowBlur: 7,
            symbolOffset: 0.6,
            shadowColor: color[index],
          },
        },
      },
    )
  })

  return echarts.util.merge(option, {
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params, ticket, callback) {
        return params.data.tips || params.name;
      },
    },
    animationEasingUpdate: 'bounceIn',
    cursor: 'pointer',
    series: [
      {
        type: 'graph',
        layout: 'force',
        cursor: 'pointer',
        force: {
          repulsion: 200,
          edgeLength: 100,
        },
        // roam: true,
        label: {
          normal: {
            show: true,
          },
        },

        data,
      },
    ],
  })
}