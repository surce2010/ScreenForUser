import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import WithRender from './operationData.html?style=./operationData.scss';
import Card from '@components/Card';
import Chart from '@components/Chart';
import LineBarChart from '@components/LineBarChart';
import '../../extensions/graphx.js';
import format, {formatNumber} from '@utils/DataFormat';
import axios from '@utils/axios';
import create from "@utils/websocket";
// import '@utils/mockdb';

@WithRender
@Component({
  components: {Card, Chart, LineBarChart}
})
export default class OperationData extends Vue {
  dealHeight = '7em';
  extendOpt = {};
  systemNum = '';
  apiNum = '';
  wrongApiNum = '';
  dataVolume = '';
  dataConsLatest30DaysX = [];
  dataConsLatest30Days = [];
  dataCenterStatisc = {
    validTableNum: '',
    tableNum: '',
    rowNum: '',
  };
  schoolStandardStatisc = {
    validTableNum: '',
    tableNum: '',
    rowNum: '',
  };
  dataBackStatisc = {
    backTableNum: '',
    backRowNum: ''
  };
  problemTotalNum = {};
  problemStatisc = [];

  created() {
    const width = document.body.getBoundingClientRect().width;
    if (width > 1560) {
      this.dealHeight = '15em';
    }

    create().subscribe('/topic/schoolDataStatisc/' + this.$route.query.schoolCode, {
      flag: true
    }, json => {
      if (!json) {
        return;
      }
      //概况
      const dataSummaryStatisc = format(json.dataSummaryStatisc)[0];
      this.systemNum = formatNumber(dataSummaryStatisc.systemNum || 0);
      this.apiNum = formatNumber(dataSummaryStatisc.apiNum || 0);
      this.wrongApiNum = formatNumber(dataSummaryStatisc.wrongApiNum || 0);
      this.dataVolume = formatNumber(dataSummaryStatisc.dataVolume || 0);

      //数据拓扑
      const topology = format(json.dataTopology);
      const sys = function (topology) {
        const items = topology;
        const nodes = {};
        items.forEach(item => {
          nodes[item.mbsjy] = item.mbsjymc;
          nodes[item.ybsjy] = item.ybsjymc;
        });
        return nodes;
      };
      const centerSys = function (nodes) {
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
      };

      const colors = ['#D6D9DD', '#AAAEB3', '#6F737A']
      const items = sys(topology);
      const center = centerSys(items);
      let count = -1;
      for (let key in items) {
        count++;
      }
      const tick = Math.floor(360 / count);
      const data = [];

      let i = 0;
      for (let key in items) {
        if (key === center.id) {
          continue;
        }
        let size = 40;
        let jksl = 0;
        topology.forEach(item => {
          if (item.ybsjy === key) {
            // size += item.jksl;
            jksl = item.jksl;
          }
        });
        let color = colors[0];
        if (jksl > 5 && jksl <= 10) {
          color = colors[1];
        } else if (jksl > 10) {
          color = colors[2];
          size = Number(size) + Number(jksl);
        }
        data.push({
          x: Math.round(360 + Math.sin(tick * i) * 100),
          y: Math.round(360 - Math.cos(tick * i) * 100),
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
        });
        i++;
      }
      if (center) {
        data.unshift(center);
      }
      let links = topology.map(item => ({
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
      this.extendOpt = {
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

      //数据中心统计
      const dataCenterStatiscOrigin = format(json.dataCenterStatisc)[0];
      this.dataCenterStatisc = {
        validTableNum: formatNumber(dataCenterStatiscOrigin.validTableNum || 0),
        tableNum: formatNumber(dataCenterStatiscOrigin.tableNum || 0),
        rowNum: formatNumber(Number((dataCenterStatiscOrigin.rowNum / 10000).toFixed(2)) || 0),
      };
      //学校标准统计
      const schoolStandardStatiscOrigin = format(json.schoolStandardStatisc)[0];
      this.schoolStandardStatisc = {
        validTableNum: formatNumber(schoolStandardStatiscOrigin.validTableNum || 0),
        tableNum: formatNumber(schoolStandardStatiscOrigin.tableNum || 0),
        rowNum: formatNumber(Number((schoolStandardStatiscOrigin.rowNum / 10000).toFixed(2)) || 0),
      };
      //数据备份统计
      const dataBackStatiscOrigin = format(json.dataBackStatisc)[0];
      this.dataBackStatisc = {
        backTableNum: formatNumber(dataBackStatiscOrigin.backTableNum || 0),
        backRowNum: formatNumber(Number((dataBackStatiscOrigin.backRowNum / 10000).toFixed(2)) || 0),
      };

      //待处理问题总数
      const problemTotalNumStatisc = format(json.problemTotalNumStatisc)[0];
      this.problemTotalNum = formatNumber(Number((problemTotalNumStatisc.problemTotalNum / 10000).toFixed(2)) || 0);

      //待处理问题总数
      this.problemStatisc = format(json.problemStatisc);

      //近30天数据量
      const dataConsLatest30DaysOrigin = format(json.dataConsLatest30Days);
      const x = [];
      const t = [];
      const s = [];
      dataConsLatest30DaysOrigin.forEach(data => {
        x.push(data.statisc_time.slice(5));
        t.push(((data.total_added || 0) / 10000).toFixed(2));
        s.push(((data.through_put || 0) / 10000).toFixed(2));
      });
      this.dataConsLatest30DaysX = x;
      this.dataConsLatest30Days = [{
        name: '总记录数据日增量',
        type: 'bar',
        yAxisIndex: 0,
        icon: 'circle',
        value: t
      }, {
        name: '吞吐量',
        type: 'line',
        yAxisIndex: 1,
        value: s
      }];
    });
  }
}
