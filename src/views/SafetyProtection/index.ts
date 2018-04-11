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
import {splitNumber} from '@utils/DataFormat';

@WithRender
@Component({
  components: {Card, NumCardGroup, LineChart, vLegend: Legend, ProgressBarGroup, NoProblem, Attack, Top5}
})
export default class Secure extends Vue {

  freshTime = new Date();
  attackMode = [];
  attackedApps = {today_statis: [], total_statis: []};
  attackedDetail = {};
  foreignAttack = [];
  waitDealEvent = [];
  attackSources = [];
  intervalIndex = null;
  current = 0;
  split = 30;
  preventedCountLast7Days = [];
  preventedTodays = [];
  preventedTotals = [];

  get preventedToday() {
    return this.preventedTodays[this.current] || 0;
  }

  get preventedTotal() {
    return this.preventedTotals[this.current] || 0;
  }

  get prevDate() {
    return new Date(this.freshTime.getTime() - 86400000)
  }

  get preventedCountLast7DaysX() {
    return this.preventedCountLast7Days.map(item => item.date)
  }

  get preventedCountLast7DaysData() {
    return this.preventedCountLast7Days.map(item => item.count)
  }

  get attackedAppsToday() {
    return this.attackedApps.today_statis.slice(0, 3).map(item => ({name: item.app_name, value: item.count}))
  }

  get attackedAppsTotal() {
    return this.attackedApps.total_statis.slice(0, 3).map(item => ({name: item.app_name, value: item.count}))
  }

  get foreignAttackChart() {
    return this.foreignAttack.map(item => ({value: item.count, name: item.address}))
  }

  get attackModeChart() {
    return this.attackMode.map(item => ({value: item.count, name: item.address}));
  }


  created() {
    create().subscribe('/getCoreAppsBigScreen', {
      login: this.$route.query.schoolCode,
      token: this.$route.query.token,
      interfaceName: 'bigScreen-getSafetyProtectBigScreen'
    }, result => {
      this.freshTime = new Date();
      this.attackMode = result.attackMode.sort(function (a, b) {
        return parseInt(b.count) - parseInt(a.count);
      });
      this.attackedApps = result.attackedApps;
      this.attackedDetail = result.attackedDetail;
      this.foreignAttack = result.foreignAttack.sort(function (a, b) {
        return parseInt(b.count) - parseInt(a.count);
      });
      this.preventedCountLast7Days = result.preventedAttackedTimes.preventedCountLast7Days || [];
      this.preventedTodays = splitNumber(this.preventedToday, result.preventedAttackedTimes.preventedToday || 0, this.split);
      this.preventedTotals = splitNumber(this.preventedTotal, result.preventedAttackedTimes.preventedTotal || 0, this.split);
      this.scrollShow();
    });
  }

  mounted() {
    setInterval(() => {
      if (this.current >= this.split - 1) {
        this.current = this.split - 1;
      } else {
        this.current++;
      }
    }, 3000);
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

  getValArr(arr, key) {
    var temp = [];
    if (arr) {
      arr.forEach(function (element) {
        temp.push(element[key]);
      });
    }

    return temp;
  }

  scrollShow() {
    var that = this;
    var page = 1;
    var size = 4;

    var temList = this.attackedDetail.attackLists;

    if (!temList) {
      return;
    }


    var count = temList.length;

    clearInterval(this.intervalIndex);
    var i = 0;
    this.intervalIndex = setInterval(function () {
      if (i >= count) {
        i = 0;
      }

      var attactTemp = [];

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
