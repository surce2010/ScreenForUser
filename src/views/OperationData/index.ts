import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import {State, Action} from 'vuex-class';
import WithRender from './operationData.html?style=./operationData.scss';
import Card from '@components/Card';
import Chart from '@components/Chart';
import LineBarChart from '@components/LineBarChart';
import '../../extensions/graphx.js';
import {DATA_HEALTH, DATA_SUMMARY, DATA_TECH, DATA_INTERFACE, DATA_DATABASE, DATA_CODE, DATA_QUALITY, DATA_BAK, DATA_RESOLVE, DATA_TOPOLOGY, DATA_LAST30DAYSPROCESSPROBLEMSTATISC} from '@store/Constants';
import {formatNumber} from '@utils/DataFormat';
import axios from "../../utils/axios";
import format from "../../utils/dataFormat";
import '@utils/mockdb';


// import lineIcon from '@assets/images/oval.png';

@WithRender
@Component({
  components: { Card, Chart, LineBarChart }
})
export default class Data extends Vue {
  @Action(DATA_TOPOLOGY) queryDataTopology: Function;
  @State(state => state.data.topology) topology;

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

  dataConsLatest30DaysX = [];
  dataConsLatest30Days = [];


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

  created () {
    const width = document.body.getBoundingClientRect().width;
    if (width > 1560) {
      this.dealHeight = '15em';
    }
    const param = {schoolId: this.$route.query.schoolCode};
    this.queryDataTopology(param);



    this.getSchoolDataStatiscLoop();
    setTimeout(() => {
      this.queryDataTopology(param);


      this.getSchoolDataStatiscLoop();
    }, 86400000);

  //   this.last30DaysAccessX = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
  //   this.last30DaysAccess = [
  //     {
  //       name:'降水量',
  //       type:'bar',
  //       icon: 'circle',
  //       value:[820, 580, 640, 820, 580, 640, 820, 580, 640, 820, 580, 640, 820, 580, 640, 820, 580, 640, 820, 580, 640, 820, 580, 640, 820, 580, 640, 820, 580, 640]
  //     },
  //     {
  //       name:'平均温度',
  //       type:'line',
  //       // icon: 'image://'+lineIcon,
  //       value:[880, 630, 690, 880, 630, 690, 880, 630, 690, 880, 630, 690, 880, 630, 690, 880, 630, 690, 880, 630, 690, 880, 630, 690, 880, 630, 690, 880, 630, 690]
  //     }];
  }

}
