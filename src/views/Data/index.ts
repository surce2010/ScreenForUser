import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import {State, Action} from 'vuex-class';
import WithRender from './data.html?style=./data.scss';
import Card from '@components/Card';
import Chart from '@components/Chart';
import '../../extensions/graphx.js';
import {DATA_HEALTH, DATA_SUMMARY, DATA_TECH, DATA_INTERFACE, DATA_DATABASE, DATA_CODE, DATA_QUALITY, DATA_BAK, DATA_RESOLVE, DATA_TOPOLOGY, DATA_LAST30DAYSPROCESSPROBLEMSTATISC} from '@store/Constants';
import {formatNumber} from '@utils/DataFormat';

@WithRender
@Component({
  components: { Card, Chart }
})
export default class Data extends Vue {
  date = new Date();

  @Action(DATA_HEALTH) queryHealthList: Function;
  @Action(DATA_SUMMARY) queryDataSummary: Function;
  @Action(DATA_TECH) queryDataTechCount: Function;
  @Action(DATA_INTERFACE) queryDataInterfaceCount: Function;
  @Action(DATA_DATABASE) queryDataDatabaseCount: Function;
  @Action(DATA_CODE) queryDataCodeCount: Function;
  @Action(DATA_QUALITY) queryDataQualityCount: Function;
  @Action(DATA_BAK) queryDataBakCount: Function;
  @Action(DATA_RESOLVE) queryDataResolves: Function;
  @Action(DATA_TOPOLOGY) queryDataTopology: Function;
  @Action(DATA_LAST30DAYSPROCESSPROBLEMSTATISC) querylast30days: Function;
  @State(state => state.data.healthX) healthX;
  @State(state => state.data.healthData) healthData;
  @State(state => state.data.summay) summay;
  @State(state => state.data.techCount) techCount;
  @State(state => state.data.interfaceCount) interfaceCount;
  @State(state => state.data.databaseCount) databaseCount;
  @State(state => state.data.codeCount) codeCount;
  @State(state => state.data.qualityCount) qualityCount;
  @State(state => state.data.bakCount) bakCount;
  @State(state => state.data.resolves) resolves;
  @State(state => state.data.resolveCount) resolveCount;
  @State(state => state.data.topology) topology;
  @State(state => state.data.last30days) last30days;

  resolveTemp = [];
  resolvesShow = [];
  timer = null;

  @Watch('resolves')
  onResolvesChange(nList) {
    this.resolveTemp = nList.slice(0);
    if (this.resolvesShow.length === 0) {
      const items = this.resolveTemp.splice(0, 10);
      this.resolveTemp.concat(items);
      this.resolvesShow = items;
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      const item = this.resolveTemp.shift();
      this.resolvesShow.push(item);
      const showed = this.resolvesShow.shift();
      this.resolveTemp.push(showed);
    }, 2000);
  }


  get healthDataInt() {
    return this.healthData.map(item => Math.round(item))
  }
  get healthScore() {
    return this.healthDataInt[this.healthDataInt.length - 1] || 0;
  }
  get sysNum() {
    let latest = 0;
    const items = this.summay.filter(item => item.sjx === 'new_xtjc_xtsl');
    if (items.length === 0) {
      return 0;
    }
    return formatNumber(Math.round(items[items.length - 1].sj - 0)) || 0
  }
  get interfaceNum() {
    const items = this.summay.filter(item => item.sjx === 'new_xtjc_jksl');
    if (items.length === 0) {
      return 0;
    }
    return formatNumber(Math.round(items[items.length-1].sj - 0)) || 0
  }
  get readAndWrite1day() {
    const items = this.summay.filter(item => item.sjx === 'new_xtjc_ttl');
    if (items.length === 0) {
      return 0;
    }
    return formatNumber(Math.round(items[items.length-1].sj - 0)) || 0
  }

  get usefulCount() {
    const items = this.summay.filter(item => item.sjx === 'new_zsj_yxbs');
    if (items.length === 0) {
      return 0;
    }
    return formatNumber(Math.round(items[items.length - 1].sj - 0)) || 0
  }
  get totalTableCount() {
    const items = this.summay.filter(item => item.sjx === 'new_zsj_zbs');
    if (items.length === 0) {
      return 0;
    }
    return formatNumber(Math.round(items[items.length - 1].sj - 0)) || 0
  }
  get totalTableRecordCount() {
    const items = this.summay.filter(item => item.sjx === 'new_zsj_zjls');
    if (items.length === 0) {
      return 0;
    }
    return formatNumber(Math.round(items[items.length - 1].sj - 0)) || 0
  }
  get historyBakCount() {
    const items = this.summay.filter(item => item.sjx === 'new_lssj_bfbs');
    if (items.length === 0) {
      return 0;
    }
    return formatNumber(Math.round(items[items.length - 1].sj - 0)) || 0
  }
  get historyBakRecordCount() {
    const items = this.summay.filter(item => item.sjx === 'new_lssj_bfjls');
    if (items.length === 0) {
      return 0;
    }
    return formatNumber(Math.round(items[items.length - 1].sj - 0)) || 0
  }
  get historyVolumeCount() {
    const items = this.summay.filter(item => item.sjx === 'new_lssj_sjtj');
    if (items.length === 0) {
      return 0;
    }
    return formatNumber(Math.round(items[items.length - 1].sj - 0)) || 0
  }
  get codeUsefulCount() {
    const items = this.summay.filter(item => item.sjx === 'YSDMS');
    if (items.length === 0) {
      return 0;
    }
    return formatNumber(Math.round(items[items.length - 1].sj - 0)) || 0
  }
  get codeTotalCount() {
    const items = this.summay.filter(item => item.sjx === 'DMBZZBS');
    if (items.length === 0) {
      return 0;
    }
    return formatNumber(Math.round(items[items.length - 1].sj - 0)) || 0
  }
  get codeTotalRecordCount() {
    const items = this.summay.filter(item => item.sjx === 'DMBZZJLS');
    if (items.length === 0) {
      return 0;
    }
    return formatNumber(Math.round(items[items.length - 1].sj - 0)) || 0
  }

  get healthOpt() {
    return {
      grid: {
        bottom: 25,
        top: 20,
        left: 10,
        right: 10
      },
      xAxis: {
          show: true,
          type: 'category',
          data: this.healthX,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: 'white'
          }
      },
      yAxis: {
          show: false,
          type: 'value'
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{c}',
        backgroundColor: '#fff',
        textStyle: {
          color: '#000',
        },
        axisPointer: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.4)'
          }
        }
      },
      series: [{
          type: 'line',
          smooth: true,
          hoverAnimation: false,
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: 'white',
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10,
              shadowOffsetY: 5
            }
          },
          lineStyle: {
            normal: {
              width: 1,
              color: 'white',
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 10,
              shadowOffsetY: 10
            }
          },
          data: this.healthDataInt
      }]
    }
  }
  get codeOpt() {
    const items = this.summay.filter(item => item.sjx === 'new_dmbz_zjlsrzl');
    const x = [];
    const data = [];
    items.forEach(item => {
      x.push(item.tjrq.substr(5));
      data.push(Math.round(item.sj))
    })
    return {
      grid: {
        top: 10,
        bottom: 20,
        left: 20,
        right: 20
      },
      xAxis: {
        show: true,
        type: 'category',
        data: x,
        axisLabel: {
          show: true
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(234,234,234,0.23)'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      tooltip: {
        trigger: 'axis',
        formatter: ([{name, value}]) => {
          return `${name}<br/>${formatNumber(value)}`
        },
        backgroundColor: '#E6B03F',
        textStyle: {
          color: '#000',
        },
        axisPointer: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.4)'
          }
        }
      },
      series: [{
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          lineStyle: {
            normal: {
              width: 3,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#1DC4E9' // 0% 处的颜色
                }, {
                    offset: 1, color: '#1DE9B6' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          data: data
      }]
    }
  }
  get mainOpt() {
    const items = this.summay.filter(item => item.sjx === 'new_zsj_zjlsrzl');
    const x = [];
    const data = [];
    items.forEach(item => {
      x.push(item.tjrq.substr(5));
      data.push(Math.round(item.sj))
    })

    return {
      grid: {
        top:10,
        bottom: 25,
        left: 20,
        right: 20
      },
      tooltip: {
        trigger: 'axis',
        formatter: ([{name, value}]) => {
          return `${name}<br/>${formatNumber(value)}`
        },
        backgroundColor: '#E6B03F',
        textStyle: {
          color: '#000',
        },
        axisPointer: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.4)'
          }
        }
      },
      xAxis: {
        show: true,
        type: 'category',
        data: x,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(234,234,234,0.23)'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
          show: false,
          type: 'value'
      },
      series: [{
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          lineStyle: {
            normal: {
              width: 3,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#1DC4E9' // 0% 处的颜色
                }, {
                    offset: 1, color: '#1DE9B6' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          data: data
      }]
    }
  }
  get qaOpt() {
    const items = this.last30days;
    const x = [];
    const data = [];
    items.forEach(item => {
      x.push(item.statisc_date.substr(5));
      data.push(item.problem_num);
    })
    return {
      grid: {
        top:20,
        bottom: 20,
        left: 20,
        right: 20
      },
      xAxis: {
          show: true,
          type: 'category',
          data: x,
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(234,234,234,0.23)'
            }
          },
          axisTick: {
            show: false
          }
      },
      yAxis: {
          show: false,
          type: 'value'
      },
      tooltip: {
        trigger: 'axis',
        formatter: ([{name, value}]) => {
          return `${name}<br/>${formatNumber(value)}`
        },
        backgroundColor: '#E6B03F',
        textStyle: {
          color: '#000',
        },
        axisPointer: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.4)'
          }
        }
      },
      series: [{
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          lineStyle: {
            normal: {
              width: 3,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#6E45E2' // 0% 处的颜色
                }, {
                    offset: 1, color: '#88D3CE' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 0, color: '#1a236b' // 0% 处的颜色
                }, {
                  offset: 1, color: '#234271' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          data: data
      }]
    }
  }

  get sys() {
    const items = this.topology;
    const nodes = {};
    items.forEach(item => {
      nodes[item.mbsjy] = item.mbsjymc;
      nodes[item.ybsjy] = item.ybsjymc;
    })
    return nodes;
  }

  get centerSys() {
    const nodes = this.sys;
    for (let key in nodes) {
      if (nodes[key] === '主数据') {
        return {
          value: 143,
          symbolSize: 143,
          id: key,
          name: nodes[key],
          category: 'center',
          x: 360,
          y: 360,
          itemStyle: {
            normal: {
              color: '#04A9F5'
            }
          },
          label: {
            normal: {
              fontSize: 20
            }
          }
        }
      }
    }
    return null;
  }

  x = 360;
  y = 360;
  r = 100;

  colors = ['#D6D9DD', '#AAAEB3', '#6F737A']

  get extendOpt() {
    const center = this.centerSys;
    const items = this.sys;
    let count = -1;
    for (let key in items) {
      count ++;
    }
    const r = this.r;
    const x = this.x;
    const y = this.y;
    const tick =  Math.floor(360 / count);
    const data = [];

    let i = 0;
    for (let key in items) {
      if (key === center.id) {
        continue;
      }
      let size = 40;
      let jksl = 0;
      this.topology.forEach(item => {
        if (item.ybsjy === key) {
          // size += item.jksl;
          jksl = item.jksl;
        }
      })
      let color = this.colors[0];
      if (jksl > 5 && jksl <= 10) {
        color = this.colors[1];
      } else if (jksl > 10) {
        color = this.colors[2];
        size += 10;
      }
      data.push({
        x: Math.round(x + Math.sin(tick * i) * r),
        y: Math.round(y - Math.cos(tick * i) * r),
        name: items[key],
        id: key,
        value: size,//this.sys[i].jksl,
        symbolSize: size,
        category: 'other',
        itemStyle: {
          normal: {
            color: color
          }
        },
        label: {
          normal: {
            position: 'bottom'
          }
        }
      })
      i++;
    }
    if (this.centerSys) {
      data.unshift(this.centerSys);
    }
    let links = this.topology.map(item => ({
      source: item.ybsjy,
      target: item.mbsjy,
      symbol: ['none', 'arrow'],
      lineStyle: item.zt === '0' ? ({
        normal: {
          color: '#F4C22B'
        }
      }) : ({}),
      label: {
        normal: {
          show: true,
          formatter: item.jksl + '',
          fontSize: 12
        }
      }
    }));
    const temp = [];
    links.forEach(item => {
      const found = links.filter(link => link.ybsjy === item.mbsjy && link.mbsjy === item.ybsjy);
      if (found.length > 0 && !found[0].founded) {
        item.label.normal.formatter += `/${found[0].label.normal.formatter}`;
        item.symbol = ['arrow', 'arrow'];
        found[0].founded = true;
      }
      if (!item.founded) {
        temp.push(item);
      }
      item.founded = true;
    });
    return {
      series: [{
        type: 'graphx',
        legend: [{
          data: ['center', 'other']
        }],
        data: data,
        links: links,
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 1.5,
            curveness: 0.3
          }
        }
      }]
    }
  };

  dealHeight = '7em';

  created () {
    const width = document.body.getBoundingClientRect().width;
    if (width > 1560) {
      this.dealHeight = '15em';
    }
    const param = {schoolId: this.$route.query.schoolCode};
    this.queryHealthList(param);
    this.queryDataSummary(param);
    this.queryDataTechCount(param);
    this.queryDataInterfaceCount(param);
    this.queryDataDatabaseCount(param);
    this.queryDataCodeCount(param);
    this.queryDataQualityCount(param);
    this.queryDataBakCount(param);
    this.queryDataResolves(param);
    this.queryDataTopology(param);
    this.querylast30days(param);
    setTimeout(() => {
      this.queryHealthList(param);
      this.queryDataSummary(param);
      this.queryDataTechCount(param);
      this.queryDataInterfaceCount(param);
      this.queryDataDatabaseCount(param);
      this.queryDataCodeCount(param);
      this.queryDataQualityCount(param);
      this.queryDataBakCount(param);
      this.queryDataResolves(param);
      this.queryDataTopology(param);
      this.querylast30days(param);
    }, 86400000);
  }

}
