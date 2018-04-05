import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import {State} from 'vuex-class';
import WithRender from './running.html?style=./running.scss';
import Card from '@components/Card';
import PieChartWithLegend from '@components/PieChartWithLegend';
import NumCardGroup from '@components/NumCardGroup';
import LineChart from '@components/LineChart';
import IconItem from '@components/IconItem';
import ProgressBarGroup from '@components/ProgressBarGroup';
import NoProblem from '@components/NoProblem';
import Rating from '@components/Rating';
import create from '@utils/websocket';
import format from '@utils/DataFormat';
import axios from '@utils/axios';

@WithRender
@Component({
  components: {
    Card,
    PieChart: PieChartWithLegend,
    NumCardGroup,
    LineChart,
    IconItem,
    ProgressBarGroup,
    NoProblem,
    Rating
  }
})
export default class Running extends Vue {
  date = new Date();
  appNum = 0;
  active = 0;
  unactive = 0;
  pc = 0;
  mobile = 0;
  appCatagoryStatisc = [];
  spv = 0;
  suv = 0;
  tpv = 0;
  tuv = 0;
  last30DaysAccessX = [];
  last30DaysAccess = [];
  last30DaysAccessPC = [];
  last30DaysAccessMobile = [];
  studentAppTop4 = [];
  teacherAppTop4 = [];
  todayTop5AppForS = [];
  todayTop5AppForT = [];
  score = 0;
  recordNum = 0;
  appName = '';
  imgSrc = '';
  category = '';
  assessDetail = [];
  activeCommet = 0;
  loop = 0;
  loopList = [];
  color = ['#4BC969', '#3B8EF0'];
  displayDevice = 'PC';
  timer = null;

  get appCategoryTop10() {
    const top10 = this.appCatagoryStatisc.slice(0, 10);
    const arr = [];
    for (let i = 0; i < top10.length; i += 2) {
      arr.push([top10[i], top10[i + 1]])
    }
    return arr;
  }

  get appCategoryTopChart() {
    let sum = 0;
    this.appCatagoryStatisc.forEach(app => sum += app.app_num);
    return this.appCatagoryStatisc.slice(0, 10).map(data => ({
      value: Math.round(data.app_num / sum * 100),
      name: data.app_catagory_name
    }))
  }

  created() {
    const schoolId = this.$route.query.schoolCode;
    const token = this.$route.query.token;
    setInterval(() => {
      if (this.displayDevice === 'PC') {
        this.hiscoreAppLoop();
      } else {
        this.loop = (this.loop + 1) % this.assessDetail.length;
        if (this.assessDetail[this.loop]) {
          this.loopList.shift();
          this.loopList.push(this.assessDetail[this.loop]);
        }
      }
    }, 5000);
    this.hiscoreAppLoop();

    this.timer = setTimeout(() => {
      if (this.displayDevice === 'PC') {
        this.toggleDieviceDisplay('Mobile')
      } else {
        this.toggleDieviceDisplay('PC')
      }
    }, 60000);

    create('http://116.62.162.198:8080/appsummary/endpoint')
      .subscribe(`/topic/schoolAppStatisc/${schoolId}`, {token}, json => {
        this.date = new Date();
        const schoolAppStatisc = format(json.schoolAppStatisc)[0] || {};
        this.appNum = schoolAppStatisc.app_num || 0
        this.active = schoolAppStatisc.active_app_num || 0;
        this.unactive = this.appNum - this.active;
        this.pc = schoolAppStatisc.pc_app_num || 0;
        this.mobile = schoolAppStatisc.mobile_app_num || 0;

        this.appCatagoryStatisc = format(json.appCatagoryStatisc);

        const todayAccessStatisc = format(json.todayAccessStatisc)[0] || {};

        this.spv = todayAccessStatisc.spv || 0;
        this.suv = todayAccessStatisc.suv || 0;
        this.tpv = todayAccessStatisc.tpv || 0;
        this.tuv = todayAccessStatisc.tuv || 0;

        const last30DaysAccessStatisc = format(json.last30DaysAccessStatisc);
        const x = [];
        const s = [];
        const t = [];
        const s1 = [];
        const t1 = [];
        last30DaysAccessStatisc.forEach(d => {
          x.push((d.statisc_date || '').substr(5));
          s.push(d.suv);
          t.push(d.tuv);
          s1.push(d.suv + 100);
          t1.push(d.tuv + 10000);
        });
        this.last30DaysAccessX = x;
        this.last30DaysAccessPC = [{
          name: '学生', value: s
        }, {
          name: '老师', value: t
        }];
        this.last30DaysAccessMobile = [{
          name: '学生', value: s1
        }, {
          name: '老师', value: t1
        }];
        this.last30DaysAccess = this.last30DaysAccessPC;

        const studentAppTop4 = format(json.studentAppTop4)
        this.studentAppTop4 = studentAppTop4.map(d => {
          return {
            name: d.APP_NAME,
            url: `http://www.campusphere.cn/appcenter_2.2/umanager/getImg144?appID=${d.APP_ID}&version=${d.VERSION}&schoolID=${d.schoolid}`
          }
        });

        const teacherAppTop4 = format(json.teacherAppTop4);
        this.teacherAppTop4 = teacherAppTop4.map(d => {
          return {
            name: d.APP_NAME,
            url: `http://www.campusphere.cn/appcenter_2.2/umanager/getImg144?appID=${d.APP_ID}&version=${d.VERSION}&schoolID=${d.schoolid}`
          }
        });

        let max = 0;
        const todayTop5AppForS = format(json.todayTop5AppForS);
        const todayTop5AppForT = format(json.todayTop5AppForT);

        for (let i = 0; i < todayTop5AppForS.length; i++) {
          if (todayTop5AppForS[i].pv > max) {
            max = todayTop5AppForS[i].pv
          }
        }
        for (let i = 0; i < todayTop5AppForT.length; i++) {
          if (todayTop5AppForT[i].pv > max) {
            max = todayTop5AppForT[i].pv
          }
        }

        this.todayTop5AppForS = todayTop5AppForS.map(d => {
          return {
            name: d.APP_NAME,
            value: d.pv//Math.round(d.pv / max * 100)
          }
        })
        this.todayTop5AppForT = todayTop5AppForT.map(d => {
          return {
            name: d.APP_NAME,
            value: d.pv//Math.round(d.pv / max * 100)
          }
        });

        const appAssessDetailList = format(json.appAssessDetailList);
        if (appAssessDetailList.length > 0) {
          this.assessDetail = appAssessDetailList;
          this.loop = 0;
          this.loopList.shift();
          this.loopList.push(appAssessDetailList[0]);
        }
        // console.log(json)
      })
  }

  async queryHiscoreApp(rn = -1) {
    const {data} = await axios.post('http://116.62.162.198:8080/data-open-web/do/api/realTimeQuery/call/queryAssess', {
      rn,
      schoolCode: this.$route.query.schoolCode
    });
    if (data.dataSet && data.dataSet[0]) {
      return data.dataSet[0]
    }
    return null;
  }

  async queryCommetsByAppId(appId) {
    const {data} = await axios.post('http://116.62.162.198:8080/data-open-web/do/api/realTimeQuery/call/appAssessDetailList', {
      schoolCode: this.$route.query.schoolCode,
      appId
    });
    return data.dataSet;
  }

  async hiscoreAppLoop() {
    this.activeCommet++;
    const data = await this.queryHiscoreApp(this.activeCommet);
    if (!data) {
      return;
    }
    if (this.activeCommet >= data.total_count) {
      this.activeCommet = 0;
    }
    this.recordNum = data.record_num;
    this.score = data.score;
    this.appName = data.app_name;
    this.category = data.category_name;
    this.imgSrc = `http://www.campusphere.cn/appcenter_2.2/umanager/getImg144?appID=${data.app_id}&version=${data.version}&schoolID=${data.schoolid}`
    const commets = await this.queryCommetsByAppId(data.app_id);
    if (commets && commets.length > 0) {
      this.assessDetail = commets;
      this.loop = 0;
      this.loopList.shift();
      this.loopList.push(commets[0]);
    }
  }

  toggleDieviceDisplay(name: string) {
    this.displayDevice = name;
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setTimeout(() => {
      if (this.displayDevice === 'PC') {
        this.toggleDieviceDisplay('Mobile')
      } else {
        this.toggleDieviceDisplay('PC')
      }
    }, 60000);
  };


  @Watch('displayDevice')
  onDisplayDeviceChange(nData: String) {
    nData === 'PC' ? this.last30DaysAccess = this.last30DaysAccessPC : this.last30DaysAccess = this.last30DaysAccessMobile;
  }
}
