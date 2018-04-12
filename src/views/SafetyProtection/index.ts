import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import {State} from 'vuex-class';
import WithRender from './safetyProtection.html?style=./safetyProtection.scss';
import Card from '@components/Card';
import NumCardGroup from '@components/NumCardGroup';
import LineChart from '@components/LineChart';
import Legend from '@components/Legend';
import NoProblem from '@components/NoProblem';
import ProgressBarGroup from '@components/ProgressBarGroup';
import Top5 from '@components/Top5';
import Attack from '@components/Attack.vue';
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
    ProgressBarGroup,
    NoProblem,
    Attack,
    Top5
  }
})
export default class Secure extends Vue {
  date = new Date();
  preventedAttackedTimes = {
    visitToday: '',
    output: '',
    input: '',
    preventedToday: '',
    preventedTotal: '',
    preventedCountLast7Days: [],
    visitTotal: ''
  };
  totalApps = '';
  attackedDetail = {
    attack_dest: {},
    attackLists: []
  };
  waitDealEvent = [];
  attackSources = [];
  attackedApps = {
    total_statis: [],
    today_statis: []
  };
  timer = null;
  displayDate = 'today';
  intervalTime = 5000;
  attackMode = [];
  foreignAttack = [];

  created() {
    //默认查询一次
    this.getSafetyProtectBigScreenNewLoop();

    setInterval(() => {
      this.getSafetyProtectBigScreenNewLoop();
    }, 5000);

    this.timer = setTimeout(() => {
      if (this.displayDate === 'today') {
        this.toggleDisplayDate('today')
      } else {
        this.toggleDisplayDate('total')
      }
    }, this.intervalTime);
  }

  async getSafetyProtectBigScreenNew() {
    const {data} = await axios.get('/cldPortal_new/event/getSafetyProtectBigScreenNew', {
      params: {
        schoolCode: this.$route.query.schoolCode
      }
    });
    if (data) {
      return data;
    }
  }

  async getSafetyProtectBigScreenNewLoop() {
    //用户分析接口信息
    const json = await this.getSafetyProtectBigScreenNew();
    if (!json) {
      return;
    }
    this.date = new Date();

    //守护应用总数
    this.totalApps = formatNumber(json.totalApps || 0);

    //汇总数据
    const preventedAttackedTimesOrigin = json.preventedAttackedTimes;
    this.preventedAttackedTimes = {
      visitToday: formatNumber(preventedAttackedTimesOrigin.visitToday || 0),
      output: formatNumber(preventedAttackedTimesOrigin.output || 0),
      input: formatNumber(preventedAttackedTimesOrigin.input || 0),
      preventedToday: formatNumber(preventedAttackedTimesOrigin.preventedToday || 0),
      preventedTotal: formatNumber(preventedAttackedTimesOrigin.preventedTotal || 0),
      preventedCountLast7Days: preventedAttackedTimesOrigin.preventedCountLast7Days,
      visitTotal: formatNumber(preventedAttackedTimesOrigin.visitTotal || 0)
    };

    //实时攻击明细
    this.attackedDetail = json.attackedDetail;
    this.scrollShow();

    //被攻击top5应用/次
    this.attackedApps = json.attackedApps;

    //累计攻击方式top5/次
    this.attackMode = json.attackMode;

    //累计攻击来源top5/次
    this.foreignAttack = json.foreignAttack;
  }

  get closeTime() {
    const date = this.date;
    const y = date.getFullYear();
    const M = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const m = date.getMinutes();
    return `截止${y}/${M < 10 ? '0' + M : M}/${d < 10 ? '0' + d : d} ${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`
  }

  get preventedCountLast7DaysX() {
    return this.preventedAttackedTimes.preventedCountLast7Days.map(item => item.date)
  }

  get preventedCountLast7DaysData() {
    return this.preventedAttackedTimes.preventedCountLast7Days.map(item => item.count)
  }

  get attackedAppsToday() {
    return this.attackedApps.today_statis.map(item => ({
      app_name: item.app_name,
      count: item.count,
      normal_count: item.normal_count
    }))
  }

  get attackedAppsTotal() {
    return this.attackedApps.total_statis.map(item => ({
      app_name: item.app_name,
      count: item.count,
      normal_count: item.normal_count
    }))
  }

  toggleDisplayDate(name: string) {
    this.displayDate = name;
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setTimeout(() => {
      if (this.displayDate === 'today') {
        this.toggleDisplayDate('total')
      } else {
        this.toggleDisplayDate('today')
      }
    }, this.intervalTime);
  };

  @Watch('displayDate')
  onDisplayDeviceChange(nData: String) {
    if (nData === 'today') {
      this.toggleDisplayDate('today')
    } else {
      this.toggleDisplayDate('total')
    }
  }

  scrollShow() {
    let that = this;
    let size = 4;
    let temList = this.attackedDetail.attackLists;
    if (!temList) {
      return;
    }
    let count = temList.length;
    clearInterval(this.intervalIndex);
    let i = 0;
    this.intervalIndex = setInterval(function () {
      if (i >= count) {
        i = 0;
      }
      let attactTemp = [];
      for (let m = i; m < count && m < i + size; m++) {
        let o = temList[m];
        attactTemp.push(o);
        if (m < count - 1 && o.attack_time !== temList[m + 1].attack_time) {
          break;
        } else {
          i++;
        }
      }
      attactTemp.forEach(function (e) {
        that.waitDealEvent.unshift(e);
      });
      while (that.waitDealEvent.length > size) {
        that.waitDealEvent.pop();
      }
      i++;
      that.attackSources = attactTemp;
    }, 2000);
  }
}
