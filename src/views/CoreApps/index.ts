import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import {State} from 'vuex-class';
import WithRender from './core.html?style=./core.scss';
import Card from '@components/Card';
import WaterBall from '@components/WaterBall';
import ProgressBarGroup from '@components/ProgressBarGroup';
import AppItem from '@components/AppItem';
import NoProblem from '@components/NoProblem';
import create from '@utils/websocket';

@WithRender
@Component({
  components: { Card, WaterBall, ProgressBarGroup, AppItem, NoProblem }
})
export default class CoreApps extends Vue {
  freshDate = new Date();
  appsInfo = [];
  avalibility = {};
  eventsToBeDealt= [];
  healthOfAll = {};
  healthOfApp = [];
  highFrequencyEvents = [];
  exceptionCount = 0;
  appCount = 0;
  days = 0;
  get hours() {
    return this.freshDate.getHours();
  }
  get mins() {
    return this.freshDate.getMinutes();
  }

  get healths() {
    return this.healthOfApp.map(data => ({
      name: data.name,
      value: data.score
    }))
  }

  created () {
    var dayMs = 1000 * 3600 * 24;
    var hourMs = 1000 * 3600;
    var minMs = 1000 * 60;
    setInterval(() => {
      if (this.eventsToBeDealt.length <= 5) {
        return;
      }
      const showed = this.eventsToBeDealt.shift();
      this.eventsToBeDealt.push(showed);
    }, 3000);
    setInterval(() => {
      this.freshDate = new Date();
    }, 10000);
    create().subscribe('/getCoreAppsBigScreen', {
      login: this.$route.query.schoolCode,
      token: this.$route.query.token,
      interfaceName: 'bigScreen-getEventDataForBigScreen'
    }, res => {
      console.log(res);

      this.appsInfo = res.appsInfo;
      this.avalibility = res.avalibility;
      this.eventsToBeDealt = res.eventsToBeDealt;
      this.healthOfAll = res.healthOfAll;
      this.healthOfApp = res.healthOfApp;
      this.highFrequencyEvents = res.highFrequencyEvents;
      const overview = res.overView || {};
      this.exceptionCount = overview.exception_count || 0
      this.appCount = overview.app_count || 0;
      var start = new Date(overview.start_time).getTime();
      this.freshDate = new Date();
      var end = this.freshDate.getTime();
      var dur = end - start;
      this.days = Math.floor(dur / dayMs);
    })
  }
}
