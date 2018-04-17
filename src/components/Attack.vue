<template>
  <div ref="chart" id="attack_chart">
  </div>
</template>
<script>
  import echarts from 'echarts';
  import 'echarts/map/js/china';
  import 'echarts/map/js/world';

  export default {
    props: {
      geoType: {
        type: String,
        default: 'china'
      },
      lineSize: {
        type: Number,
        default: 20
      },
      attackLists: {
        type: Array
      },
      attackDest: {
        type: Object
      }
    },
    data() {
      return {
        chart: null,
        iIndex: null
      }
    },
    watch: {
      attackLists: {
        handler: function (val, oldval) {
          this.refresh();
        }
      }
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.resize)
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', this.resize);
        this.initChart();
      });
    },
    methods: {
      resize() {
        if (this.chart) {
          this.chart.resize();
        }
      },
      refresh() {
        clearInterval(this.iIndex);
        var points = this.getPoints();
        var lines = this.getLines(points);
        var that = this;
        that.chart.setOption(that.getOption(lines, points))
      },
      getLines(points) {
        var lines = [];
        if (points) {
          var start = null;
          points.forEach(function (e, i) {
            if (i == 0) {
              start = e;
            } else {
              lines.push([e.value, start.value]);
            }
          });
        }

        return lines;
      },
      getPoints() {
        var arr = [];

        if (this.attackDest) {
          arr.push({name: this.attackDest.desti_name, value: [this.attackDest.long, this.attackDest.lati]});
        }

        if (this.attackLists) {
          this.attackLists.forEach(function (e) {
            if (e.attack_origin) {
              arr.push({name: e.address, value: [e.attack_origin.long, e.attack_origin.lati]});
            } else {
              arr.push({name: e.address, value: [e.long, e.lati]});
            }
          });
        }

        return arr;
      },
      initChart() {
        // 绘图方法
        this.chart = echarts.init(this.$refs.chart);
        // 皮肤添加同一般使用方式
        this.chart.showLoading();

        this.chart.setOption(this.getOption([], []));
        this.chart.hideLoading();
      },
      getOption(gcData, vData) {
        var planePath = 'arrow';

        var seriesTemp = [];

        seriesTemp.push({
          type: 'lines',
          zlevel: 2,
          effect: {
            zlevel: 3,
            show: true,
            period: 2,
            trailLength: 0.5,
            color: '#FA5E4C',
            symbol: planePath,
            symbolSize: 5
          },
          lineStyle: {
            normal: {
              color: '#FA5E4C',
              width: 0,
              opacity: 1,
              curveness: 0
            }
          },
          // animation: true,
          // animationEasing: 'quadraticIn',
          // animationDelay: function(idx) {
          //     // 越往后的数据延迟越大
          //     return idx * 1000;
          // },
          data: gcData
        });

        var attackS = [];

        vData.forEach(function (e, i) {
          if (i != 0) {
            attackS.push(e);
          }
        });


        seriesTemp.push({
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 4,
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{b}'
            }
          },
          symbolSize: 5,
          itemStyle: {
            normal: {
              color: '#FA5E4C',
              borderColor: '#FA5E4C'
            }
          },

          data: attackS
        });

        var defend = [];
        defend.push(vData[0]);

        seriesTemp.push({
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 5,
          rippleEffect: {
            zlevel: 5,
            period: 4,
            scale: 8,
            brushType: 'stroke'
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            }
          },
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: '#04bb77',
              borderColor: '#04bb77'
            }
          },

          data: defend
        });

        var option = {
          tooltip: {
            trigger: 'item',
          },
          geo: {
            map: this.geoType,
            label: {
              emphasis: {
                show: false
              }
            },
            zoom: 1.2,
            silent: true,
            itemStyle: {
              normal: {
                areaColor: '#1B78DD',
                borderColor: 'rgba(255, 255, 255, 0.5)'
              },
              emphasis: {
                areaColor: '#2a333d'
              }
            }
          }
        };

        option.series = seriesTemp;

        return option;
      }
    }
  }
</script>


