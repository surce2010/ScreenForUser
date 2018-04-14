import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import {State} from 'vuex-class';
import WithRender from './safetyMonitoring.html?style=./safetyMonitoring.scss';
import Card from '@components/Card';
import NumCardGroup from '@components/NumCardGroup';
import LineChart from '@components/LineChart';
import Legend from '@components/Legend';
import PieChartWithLegend from '@components/PieChartWithLegend';
import NoProblem from '@components/NoProblem';
import PercentBar from '@components/PercentBar';
import Top5 from '@components/Top5';
import create from '@utils/websocket';
import axios from "@utils/axios";
import {formatNumber} from "@utils/dataFormat";
import '@utils/mockdb';

@WithRender @Component({
  components: {
    Card,
    NumCardGroup,
    LineChart,
    vLegend: Legend,
    PieChart: PieChartWithLegend,
    PercentBar,
    NoProblem,
    Top5
  }
})
export default class SafetyMonitoring extends Vue {
  timer = null;
  intervalTime = 5000;
  inspectSource = 'app';
  app_inspect = {
    total_app: 0,
    normal: 0,
    abnormal: 0,
    tobe_inspect: 0,
    abnormal_count: 0,
    abnormal_list: [],
    inspect_list: []
  };
  currentAppInspect = {
    name: '',
    url: '',
    start_time: '',
    end_time: '',
    normal: ''
  };
  host_inspect = {
    total_app: 0,
    normal: 0,
    abnormal: 0,
    tobe_inspect: 0,
    abnormal_count: 0,
    abnormal_list: [],
    inspect_list: []
  };
  currentHostInspect = {
    name: '',
    url: '',
    start_time: '',
    normal: ''
  };
  unsolved_events = {
    total_count: 0,
    safetybug: 0,
    modified: 0,
    trojan: 0,
    sensitive: 0,
    hidden_link: 0,
    component: 0
  };
  operationSystemOrigin = [];
  componentUsageOrigin = [];

  created() {
    //默认查询一次
    this.getSafetyInspectScreenNewLoop();

    setInterval(() => {
      this.getSafetyInspectScreenNewLoop();
    }, 5000);

    this.timer = setTimeout(() => {
      if (this.inspectSource === 'app') {
        this.toggleInspectSource('host')
      } else {
        this.toggleInspectSource('app')
      }
    }, this.intervalTime);
  }

  async getSafetyInspectScreenNew() {
    const {data} = await axios.get('/cldPortal_new/event/getSafetyInspectScreenNew', {
      params: {
        schoolCode: this.$route.query.schoolCode
      }
    });
    if (data) {
      return data;
    }
  }

  async getSafetyInspectScreenNewLoop() {
    //安全监测接口信息
    const json = await this.getSafetyInspectScreenNew();
    if (!json) {
      return;
    }

    //应用监测
    this.app_inspect = json.app_inspect;
    this.currentAppInspect = json.app_inspect.inspect_list[0];

    //主机监测
    this.host_inspect = json.host_inspect;
    this.currentHostInspect = json.host_inspect.inspect_list[0];

    //当前未处理事件
    this.unsolved_events = json.unsolved_events;

    //使用系统分布
    this.operationSystemOrigin = json.operationSystem;

    //使用组件分布
    this.componentUsageOrigin = json.componentUsage;
  }

  get computingTime() {
    let _st = this.currentAppInspect.start_time;
    let _et = this.currentAppInspect.end_time;
    _st = _st.toString().replace(/-/g, "/");
    _et = _et.toString().replace(/-/g, "/");
    let _stime = new Date(_st).getTime();
    let _etime = new Date(_et).getTime();
    let _iT = (_etime - _stime) / 1000;
    let _D = Math.floor(_iT / 86400);
    let _H = Math.floor((_iT - 86400 * _D) / 3600);
    let _M = Math.floor((_iT - _D * 86400 - _H * 3600) / 60);
    let _S = Math.floor(_iT % 60);
    return _H + 'h ' + _M + 'm ' + _S + 's';
  }

  get applicationStateRatio() {
    return [this.app_inspect.normal, this.app_inspect.abnormal, this.app_inspect.tobe_inspect]
  }

  get hostStateRatio() {
    return [this.host_inspect.normal, this.host_inspect.abnormal, this.host_inspect.tobe_inspect]
  }

  get appAbnormalList() {
    return this.app_inspect.abnormal_list.slice(0, 3);
  }

  get appInspectList() {
    return this.app_inspect.inspect_list.slice(0, 8).map(item => {
      if (item.normal === '1') {
        item.typeName = '异常'
      } else if (item.normal === '2') {
        item.typeName = '正常'
      } else if (item.normal === '3') {
        item.typeName = '检测中'
      } else {
        item.typeName = ''
      }
      return item;
    });
  }

  get hostAbnormalList() {
    return this.host_inspect.abnormal_list.slice(0, 3);
  }

  get hostInspectList() {
    return this.host_inspect.inspect_list.slice(0, 8).map(item => {
      if (item.normal === '1') {
        item.typeName = '异常'
      } else if (item.normal === '2') {
        item.typeName = '正常'
      } else if (item.normal === '3') {
        item.typeName = '检测中'
      } else {
        item.typeName = ''
      }
      return item;
    });
  }

  get operationSystem() {
    return this.operationSystemOrigin.map(item => {
      return {
        name: item.os_name,
        value: item.os_count
      }
    })
  }

  get componentUsage() {
    return this.componentUsageOrigin.map(item => {
      return {
        name: item.component_name,
        value: item.component_count
      }
    })
  }

  toggleInspectSource(name: string) {
    this.inspectSource = name;
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setTimeout(() => {
      if (this.inspectSource === 'app') {
        this.toggleInspectSource('host')
      } else {
        this.toggleInspectSource('app')
      }
    }, this.intervalTime);
  };

  @Watch('inspectSource')
  onInspectSourceChange(nData: String) {
    if (nData === 'app') {
      this.toggleInspectSource('app')
    } else {
      this.toggleInspectSource('host')
    }
  }
}
