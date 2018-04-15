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

@WithRender
@Component({
  components: {
    Card,
    PieChart: PieChartWithLegend,
    RowProgressBarGroup: RowProgressBarGroup,
    vLegend: Legend,
    Top5,
    NoProblem,
    LineChart
  }
})
export default class ApiMonitoring extends Vue {

  date = new Date();
  lastDate = "";
  stompClient = null;
  chartData = [];
  hostRunningStatus = {};
  eventsCountTop = [];
  eventsReasonTop = [];
  operationSystem = [];
  osPipeData = [];
  hostException = {};
  hostResource = {busyHost: [], idleHost: []};
  componentUsage = [];
  componentPipeDate = [];
  pieSize = 6;
  exceptionList = [];
  scroolIntevel = null;

  get busyHostChart() {
    return this.hostResource.busyHost.map(item => {
      return {
        value: item.busy_degree,
        ip: item.host_ip,
        name: item.host_name
      }
    })
  }

  get idleHostChart() {
    return this.hostResource.idleHost.map(item => {
      return {
        value: item.busy_degree,
        ip: item.host_ip,
        name: item.host_name
      }
    })
  }

  get eventsCountTop5() {
    return this.eventsCountTop.map(item => {
      return {
        ...item,
        purpose2: item.purpose.replace(`(${item.ip})`, ''),
        value: item.event_count,
        name: item.purpose
      }
    })
  }

  get eventsReasonTop5() {
    return this.eventsReasonTop.map(item => {
      return {
        ...item,
        value: item.event_count,
        name: item.event_reason
      }
    });
  }

  created() {
    create().subscribe('/getCoreAppsBigScreen', {
      login: this.$route.query.schoolCode,
      token: this.$route.query.token,
      interfaceName: 'bigScreen-getHostsMonitorBigScreen'
    }, result => {
      this.hostRunningStatus = result.hostRunningStatus;
      this.eventsCountTop = result.eventsCountTop;
      this.initChartData();

      this.eventsReasonTop = result.eventsReasonTop;
      this.eventsReasonTop.sort(function (a, b) {
        return parseInt(b.event_count) - parseInt(a.event_count);
      });


      this.operationSystem = result.operationSystem;
      this.osPipeData = this.getPipeData(this.operationSystem, 'os_name', 'os_count');

      this.hostException = result.hostException;
      this.hostResource = result.hostResource;
      this.componentUsage = result.componentUsage;
      this.componentPipeDate = this.getPipeData(this.componentUsage, 'component_name', 'component_count');

      this.screelShow();
    });

  }

  screelShow() {
    var that = this;
    var exceptions = this.hostException.exception_list;
    var start = 0;
    var pageSize = 5;
    if (this.scroolIntevel) {
      clearInterval(this.scroolIntevel);
    }
    var showFun = function () {
      that.exceptionList = [];
      for (let i = 0; i < pageSize && start < exceptions.length; i++ , start++) {
        that.exceptionList.push(exceptions[start]);
      }

      if (start >= exceptions.length) {
        start = 0;
      }
    }
    showFun();
    this.scroolIntevel = setInterval(function () {
      showFun();
    }, 10000);
  }

  initChartData() {
    let exception_count = this.hostRunningStatus.exception_count;
    let normal_count = this.hostRunningStatus.normal_count;
    let total = this.hostRunningStatus.total;

    var temp = [{name: '正常'}, {name: '异常'}];
    temp[0].value = parseInt(normal_count / total * 100);
    temp[1].value = parseInt(exception_count / total * 100);

    this.chartData = temp;

  }

  getPipeData(arr, nameKey, valKey) {
    var arrData = [];
    let total = this.getTotal(arr, valKey);
    var that = this;
    arr.forEach(function (e, i) {
      if (i >= that.pieSize) {
        return;
      }
      var item = {};

      item.name = e[nameKey];
      item.value = e[valKey];

      arrData.push(item);
    });

    return arrData;
  }

  getTotal(arr, valKey) {
    var total = 0;
    var size = this.pieSize;
    arr.forEach(function (e, i) {
      if (i < size) {
        total = total + parseInt(e[valKey]);
      }
    });

    return total;
  }

  getMax(arr, key) {
    var max = 0;
    arr.forEach(function (element) {
      var val = parseInt(element[key]);
      if (val > max) {
        max = val;
      }
    });

    return max;
  }
}
