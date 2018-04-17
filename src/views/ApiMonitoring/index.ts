import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import {State} from 'vuex-class';
import WithRender from './apiMonitoring.html?style=./apiMonitoring.scss';
import Card from '@components/Card';
import PieChartWithLegend from '@components/PieChartWithLegend';
import RowProgressBarGroup from '@components/RowProgressBarGroup';
import Legend from '@components/Legend';
import Top5 from '@components/Top5';
import NoProblem from '@components/NoProblem';
import LineChart from '@components/LineChart';
import create from '@utils/websocket';
import format, {formatNumber} from '@utils/dataFormat';
import NumCardGroup from '@components/NumCardGroup';
import axios from '@utils/axios';
// import '@utils/mockdb';

@WithRender
@Component({
  components: {
    Card,
    PieChart: PieChartWithLegend,
    RowProgressBarGroup: RowProgressBarGroup,
    vLegend: Legend,
    Top5,
    NoProblem,
    LineChart,
    NumCardGroup
  }
})
export default class ApiMonitoring extends Vue {
  date = new Date();
  apiNum = '';
  normalApiNum = '';
  wrongApiNum = '';
  todayCallNum = 0;
  todayfailCallNum = 0;
  callNum = 0;
  failCallNum = 0;
  last30DaysApiUseStatiscX = [];
  last30DaysApiUseStatisc = [];
  callNumApiTop5 = [];
  todayCallNumApiTop5 = [];
  last30DayTimeCostApiTop5 = [];
  callApiWrongInfos = [];
  apiAppStatisc = [];
  apiTypeStatisc = [];
  leftScale = 1;
  rightScale = 1;
  leftPercent = '';
  rightPercent = '';

  created() {
    create().subscribe('/topic/schoolApiStatisc/' + this.$route.query.schoolCode, {
      flag: true
    }, json => {
      if (!json) {
        return;
      }
      //接口基本信息
      const apiBaseInfoOrigin = format(json.apiBaseInfo)[0];
      this.apiNum = formatNumber(apiBaseInfoOrigin.apiNum || 0);
      this.normalApiNum = formatNumber(apiBaseInfoOrigin.normalApiNum || 0);
      this.wrongApiNum = formatNumber(apiBaseInfoOrigin.wrongApiNum || 0);

      //接口调用情况
      const apiUseStatiscOrigin = format(json.apiUseStatisc)[0];
      this.todayCallNum = apiUseStatiscOrigin.todayCallNum || 0;
      this.todayfailCallNum = apiUseStatiscOrigin.todayfailCallNum || 0;
      this.callNum = apiUseStatiscOrigin.callNum || 0;
      this.failCallNum = apiUseStatiscOrigin.failCallNum || 0;

      //近30日接口调用量
      const last30DaysApiUseStatiscOrigin = format(json.last30DaysApiUseStatisc) || [];
      const x = [];
      const arr1 = [];
      const arr2 = [];
      last30DaysApiUseStatiscOrigin.forEach(d => {
        x.push((d.statiscDate || '').substr(5));
        arr1.push(d.callNum);
        arr2.push(d.failCallNum);
      });
      this.last30DaysApiUseStatiscX = x;
      this.last30DaysApiUseStatisc = [{
        name: '成功调用',
        value: arr1
      }, {
        name: '失败调用',
        value: arr2
      }];

      //累计高频调用接口Top5
      const callNumApiTop5Origin = format(json.callNumApiTop5) || [];
      this.callNumApiTop5 = callNumApiTop5Origin.map(item => {
        return {
          name: item.apiName,
          value: item.callNum
        }
      });

      //今日高频调用接口Top5
      const todayCallNumApiTop5Origin = format(json.callNumApiTop5) || [];
      this.todayCallNumApiTop5 = todayCallNumApiTop5Origin.map(item => {
        return {
          name: item.apiName,
          value: item.callNum
        }
      });

      //近30日耗时接口Top5
      const last30DayTimeCostApiTop5Origin = format(json.callNumApiTop5) || [];
      this.last30DayTimeCostApiTop5 = last30DayTimeCostApiTop5Origin.map(item => {
        return {
          name: item.apiName,
          value: item.timeCost
        }
      });

      //异常接口列表
      this.callApiWrongInfos = (format(json.callApiWrongInfos) || []).slice(0, 5);

      //接口归属统计
      const apiAppStatiscOrigin = (format(json.apiAppStatisc) || []).slice(0, 5);
      this.apiAppStatisc = apiAppStatiscOrigin.map(item => {
        return {
          name: item.appName,
          value: item.apiNum
        }
      });

      //接口归属统计
      this.apiTypeStatisc = (format(json.apiTypeStatisc) || []).slice(0, 2);
      const leftApiNum = this.apiTypeStatisc[0].apiNum || 0;
      const rightApiNum = this.apiTypeStatisc[1].apiNum || 0;
      const total = leftApiNum + rightApiNum;
      this.leftPercent = leftApiNum / total * 100 + '%';
      this.rightPercent = rightApiNum / total * 100 + '%';
      this.leftScale = leftApiNum > rightApiNum ? 1 : (1 - (rightApiNum - leftApiNum) / 2 / total);
      this.rightScale = rightApiNum > leftApiNum ? 1 : (1 - (leftApiNum - rightApiNum) / 2 / total);
    });
  }
}
