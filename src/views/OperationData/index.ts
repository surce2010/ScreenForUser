import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import WithRender from './operationData.html?style=./operationData.scss';
import Card from '@components/Card';
import Chart from '@components/Chart';
import LineBarChart from '@components/LineBarChart';
import '../../extensions/graphx.js';
import format, {formatNumber} from '@utils/DataFormat';
import axios from '@utils/axios';
import '@utils/mockdb';


// import lineIcon from '@assets/images/oval.png';

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

  async getSchoolDataStatisc() {
    const {data} = await axios.get('/topic/schoolDataStatisc/', {
      params: {
        schoolCode: this.$route.query.schoolCode
      }
    });
    if (data) {
      return data;
    }
  }

  async getSchoolDataStatiscLoop() {
    //运行数据分析接口信息
    const json = await this.getSchoolDataStatisc();
    if (!json) {
      return;
    }

    //概况
    const dataSummaryStatisc = format(json.dataSummaryStatisc)[0];
    this.systemNum = dataSummaryStatisc.systemNum;
    this.apiNum = dataSummaryStatisc.apiNum;
    this.wrongApiNum = dataSummaryStatisc.wrongApiNum;
    this.dataVolume = dataSummaryStatisc.dataVolume;

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
        size += 10;
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
      rowNum: formatNumber(dataCenterStatiscOrigin.rowNum || 0),
    };
    //学校标准统计
    const schoolStandardStatiscOrigin = format(json.schoolStandardStatisc)[0];
    this.schoolStandardStatisc = {
      validTableNum: formatNumber(schoolStandardStatiscOrigin.validTableNum || 0),
      tableNum: formatNumber(schoolStandardStatiscOrigin.tableNum || 0),
      rowNum: formatNumber(schoolStandardStatiscOrigin.rowNum || 0),
    };
    //数据备份统计
    const dataBackStatiscOrigin = format(json.dataBackStatisc)[0];
    this.dataBackStatisc = {
      backTableNum: formatNumber(dataBackStatiscOrigin.backTableNum || 0),
      backRowNum: formatNumber(dataBackStatiscOrigin.backRowNum || 0),
    };

    //待处理问题总数
    const problemTotalNumStatisc = format(json.problemTotalNumStatisc)[0];
    this.problemTotalNum = formatNumber(problemTotalNumStatisc.problemTotalNum || 0);

    //待处理问题总数
    this.problemStatisc = format(json.problemStatisc);

    //近30天数据量
    const dataConsLatest30DaysOrigin = format(json.dataConsLatest30Days);
    const x = [];
    const t = [];
    const s = [];
    dataConsLatest30DaysOrigin.forEach(data => {
      x.push(data.statisc_date.slice(3));
      t.push(data.total_added);
      s.push(data.through_put);
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
  }

  created() {
    const width = document.body.getBoundingClientRect().width;
    if (width > 1560) {
      this.dealHeight = '15em';
    }

    this.getSchoolDataStatiscLoop();
    setTimeout(() => {
      this.getSchoolDataStatiscLoop();
    }, 86400000);
  }

}
