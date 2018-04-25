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
// import '@utils/mockdb'

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
  displayDevice = 'pc';
  timer = null;
  appNum = 0;
  active = 0;
  unactive = 0;
  pc = 0;
  mobile = 0;
  appCatagoryStatisc = [];
  spv = 0;
  spvPC = 0;
  spvMobile = 0;
  suv = 0;
  suvPC = 0;
  suvMobile = 0;
  tpv = 0;
  tpvPC = 0;
  tpvMobile = 0;
  tuv = 0;
  tuvPC = 0;
  tuvMobile = 0;
  last30DaysAccessX = [];
  last30DaysAccess = [];
  last30DaysAccessPC = [];
  last30DaysAccessMobile = [];
  studentAppTop4 = [];
  studentAppTop4PC = [];
  studentAppTop4Mobile = [];
  teacherAppTop4 = [];
  teacherAppTop4PC = [];
  teacherAppTop4Mobile = [];
  todayTop5AppForS = [];
  todayTop5AppForSPC = [];
  todayTop5AppForSMobile = [];
  todayTop5AppForT = [];
  todayTop5AppForTPC = [];
  todayTop5AppForTMobile = [];
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
  intervalTime = 300000; //切换设备的间隔时间

  get appCategoryTopChart() {
    let sum = 0;
    this.appCatagoryStatisc.forEach(app => sum += app.app_num);
    return this.appCatagoryStatisc.slice(0, 10).map(data => ({
      value: Math.round(data.app_num / sum * 100),
      name: data.app_catagory_name
    }))
  }

  created() {
    create().subscribe('/topic/schoolAppStatisc/' + this.$route.query.schoolCode, {
      flag: true
    }, json => {
      if (!json) {
        return;
      }
      //校园应用统计
      let schoolAppStatisc = format(json.schoolAppStatisc)[0] || {};
      this.appNum = schoolAppStatisc.app_num || 0;
      this.active = schoolAppStatisc.active_app_num || 0;
      this.unactive = this.appNum - this.active;
      this.pc = schoolAppStatisc.pc_app_num || 0;
      this.mobile = schoolAppStatisc.mobile_app_num || 0;

      //应用分类（部门）统计
      this.appCatagoryStatisc = format(json.appCatagoryStatisc) || [];

      //PC
      let pc = {
        last30DaysAccessStatisc: [],//最近30天访问情况
        studentAppTop4: [],//学生累计热门应用
        todayTop5AppForS: [],//教师今日热门应用Top5
        todayTop5AppForT: [],//学生今日热门应用Top5
        teacherAppTop4: [],//累计教师应用Top5
        todayAccessStatisc: {
          tuv: 0,
          suv: 0,
          spv: 0,
          tpv: 0,
        },//今日访问统计
      };
      pc.last30DaysAccessStatisc = format(json.pc.last30DaysAccessStatisc) || [];//最近30天访问情况
      const x = [];
      const s = [];
      const t = [];
      pc.last30DaysAccessStatisc.forEach(d => {
        x.push((d.statisc_date || '').substr(5));
        s.push(d.suv);
        t.push(d.tuv);
      });
      this.last30DaysAccessX = x;
      this.last30DaysAccessPC = [{
        name: '学生', value: s
      }, {
        name: '老师', value: t
      }];
      pc.studentAppTop4 = format(json.pc.studentAppTop4);//学生累计热门应用
      this.studentAppTop4PC = pc.studentAppTop4.map(d => {
        return {
          name: d.APP_NAME,
          url: d.iconUrl
        }
      });
      pc.teacherAppTop4 = format(json.pc.teacherAppTop4);//累计教师应用Top5
      this.teacherAppTop4PC = pc.teacherAppTop4.map(d => {
        return {
          name: d.APP_NAME,
          url: d.iconUrl
        }
      });
      pc.todayAccessStatisc = format(json.pc.todayAccessStatisc)[0];//今日访问统计
      this.tuvPC = pc.todayAccessStatisc.tuv;
      this.suvPC = pc.todayAccessStatisc.suv;
      this.spvPC = pc.todayAccessStatisc.spv;
      this.tpvPC = pc.todayAccessStatisc.tpv;
      pc.todayTop5AppForS = format(json.pc.todayTop5AppForS);//教师今日热门应用Top5
      pc.todayTop5AppForT = format(json.pc.todayTop5AppForT);//学生今日热门应用Top5
      let max = 0;
      for (let i = 0; i < pc.todayTop5AppForS.length; i++) {
        if (pc.todayTop5AppForS[i].pv > max) {
          max = pc.todayTop5AppForS[i].pv
        }
      }
      for (let i = 0; i < pc.todayTop5AppForT.length; i++) {
        if (pc.todayTop5AppForT[i].pv > max) {
          max = pc.todayTop5AppForT[i].pv
        }
      }
      this.todayTop5AppForSPC = pc.todayTop5AppForS.map(d => {
        return {
          name: d.APP_NAME,
          value: d.pv //Math.round(d.pv / max * 100)
        }
      });
      this.todayTop5AppForTPC = pc.todayTop5AppForT.map(d => {
        return {
          name: d.APP_NAME,
          value: d.pv //Math.round(d.pv / max * 100)
        }
      });

      //Mobile
      let mobile = {
        last30DaysAccessStatisc: [],//最近30天访问情况
        studentAppTop4: [],//学生累计热门应用
        todayTop5AppForS: [],//教师今日热门应用Top5
        todayTop5AppForT: [],//学生今日热门应用Top5
        teacherAppTop4: [],//累计教师应用Top5
        todayAccessStatisc: {
          tuv: 0,
          suv: 0,
          spv: 0,
          tpv: 0,
        },//今日访问统计
      };
      mobile.last30DaysAccessStatisc = format(json.mobile.last30DaysAccessStatisc) || [];//最近30天访问情况
      const x1 = [];
      const s1 = [];
      const t1 = [];
      mobile.last30DaysAccessStatisc.forEach(d => {
        x1.push((d.statisc_date || '').substr(5));
        s1.push(d.suv);
        t1.push(d.tuv);
      });
      this.last30DaysAccessX = x1;
      this.last30DaysAccessMobile = [{
        name: '学生', value: s1
      }, {
        name: '老师', value: t1
      }];
      mobile.studentAppTop4 = format(json.mobile.studentAppTop4);//学生累计热门应用
      this.studentAppTop4Mobile = mobile.studentAppTop4.map(d => {
        return {
          name: d.APP_NAME,
          url: d.iconUrl
        }
      });
      mobile.teacherAppTop4 = format(json.mobile.teacherAppTop4);//累计教师应用Top5
      this.teacherAppTop4Mobile = mobile.teacherAppTop4.map(d => {
        return {
          name: d.APP_NAME,
          url: d.iconUrl
        }
      });
      mobile.todayAccessStatisc = format(json.mobile.todayAccessStatisc)[0];//今日访问统计
      this.tuvMobile = mobile.todayAccessStatisc.tuv;
      this.suvMobile = mobile.todayAccessStatisc.suv;
      this.spvMobile = mobile.todayAccessStatisc.spv;
      this.tpvMobile = mobile.todayAccessStatisc.tpv;
      mobile.todayTop5AppForS = format(json.mobile.todayTop5AppForS);//教师今日热门应用Top5
      mobile.todayTop5AppForT = format(json.mobile.todayTop5AppForT);//学生今日热门应用Top5
      let max1 = 0;
      for (let i = 0; i < mobile.todayTop5AppForS.length; i++) {
        if (mobile.todayTop5AppForS[i].pv > max1) {
          max1 = mobile.todayTop5AppForS[i].pv
        }
      }
      for (let i = 0; i < mobile.todayTop5AppForT.length; i++) {
        if (mobile.todayTop5AppForT[i].pv > max1) {
          max1 = mobile.todayTop5AppForT[i].pv
        }
      }
      this.todayTop5AppForSMobile = mobile.todayTop5AppForS.map(d => {
        return {
          name: d.APP_NAME,
          value: d.pv //Math.round(d.pv / max * 100)
        }
      });
      this.todayTop5AppForTMobile = mobile.todayTop5AppForT.map(d => {
        return {
          name: d.APP_NAME,
          value: d.pv //Math.round(d.pv / max * 100)
        }
      });

      if (this.displayDevice === 'pc') {
        this.last30DaysAccess = this.last30DaysAccessPC;
        this.studentAppTop4 = this.studentAppTop4PC;
        this.teacherAppTop4 = this.teacherAppTop4PC;
        this.tuv = this.tuvPC;
        this.suv = this.suvPC;
        this.spv = this.spvPC;
        this.tpv = this.tpvPC;
        this.todayTop5AppForS = this.todayTop5AppForSPC;
        this.todayTop5AppForT = this.todayTop5AppForTPC;
      } else {
        this.last30DaysAccess = this.last30DaysAccessMobile;
        this.studentAppTop4 = this.studentAppTop4Mobile;
        this.teacherAppTop4 = this.teacherAppTop4Mobile;
        this.tuv = this.tuvMobile;
        this.suv = this.suvMobile;
        this.spv = this.spvMobile;
        this.tpv = this.tpvMobile;
        this.todayTop5AppForS = this.todayTop5AppForSMobile;
        this.todayTop5AppForT = this.todayTop5AppForTMobile;
      }
    });

    if (this.displayDevice === 'pc') {
      //应用评价统计
      this.activeCommet = 0;
      this.activeCommet++;
      this.queryCallDetail('pc');
    } else {
      //应用评价统计
      this.activeCommet = 0;
      this.activeCommet++;
      this.queryCallDetail('mobile');
    }

    setInterval(() => {
      if (this.loop === this.assessDetail.length - 1) {
        this.activeCommet++;
        this.queryCallDetail(this.displayDevice);
      } else {
        this.loop = (this.loop + 1) % this.assessDetail.length;
        if (this.assessDetail[this.loop]) {
          this.loopList.shift();
          this.loopList.push(this.assessDetail[this.loop]);
        }
      }
    }, 5000);

    this.timer = setTimeout(() => {
      if (this.displayDevice === 'pc') {
        this.toggleDieviceDisplay('mobile')
      } else {
        this.toggleDieviceDisplay('pc')
      }
    }, this.intervalTime);
  }

  async querySchoolAppStatisc() {
    const {data} = await axios.get('/topic/schoolAppStatisc/', {
      params: {
        schoolCode: this.$route.query.schoolCode
      }
    });
    if (data) {
      return data;
    }
  }

  async queryHiscoreApp(rn = -1, appType: string) {
    const {data} = await axios.post('http://116.62.162.198:8080/data-open-web/do/api/realTimeQuery/call/queryAssess', {
      rn,
      schoolCode: this.$route.query.schoolCode,
      appType
    });
    if (data.dataSet && data.dataSet[0]) {
      return data.dataSet[0]
    }
    return null;
  }

  async queryCommetsByAppId(appId, appType: string) {
    const {data} = await axios.post('http://116.62.162.198:8080/data-open-web/do/api/realTimeQuery/call/appAssessDetailList', {
      schoolCode: this.$route.query.schoolCode,
      appId,
      appType
    });
    return data.dataSet;
  }

  async queryCallDetail(appType: string) {
    //应用评价统计
    const data = await this.queryHiscoreApp(this.activeCommet, appType);
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
    this.imgSrc = `http://www.campusphere.cn/appcenter_2.2/umanager/getImg144?appID=${data.app_id}&version=${data.version}&schoolID=${data.schoolid}`;

    //应用评价详情列表
    const commets = await this.queryCommetsByAppId(data.app_id, appType);
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
      if (this.displayDevice === 'pc') {
        this.toggleDieviceDisplay('mobile')
      } else {
        this.toggleDieviceDisplay('pc')
      }
    }, this.intervalTime);
  };

  @Watch('displayDevice')
  onDisplayDeviceChange(nData: String) {
    if (nData === 'pc') {
      this.last30DaysAccess = this.last30DaysAccessPC;
      this.studentAppTop4 = this.studentAppTop4PC;
      this.teacherAppTop4 = this.teacherAppTop4PC;
      this.tuv = this.tuvPC;
      this.suv = this.suvPC;
      this.spv = this.spvPC;
      this.tpv = this.tpvPC;
      this.todayTop5AppForS = this.todayTop5AppForSPC;
      this.todayTop5AppForT = this.todayTop5AppForTPC;

      this.activeCommet = 0;
      this.activeCommet++;
      this.queryCallDetail('pc');
    } else {
      this.last30DaysAccess = this.last30DaysAccessMobile;
      this.studentAppTop4 = this.studentAppTop4Mobile;
      this.teacherAppTop4 = this.teacherAppTop4Mobile;
      this.tuv = this.tuvMobile;
      this.suv = this.suvMobile;
      this.spv = this.spvMobile;
      this.tpv = this.tpvMobile;
      this.todayTop5AppForS = this.todayTop5AppForSMobile;
      this.todayTop5AppForT = this.todayTop5AppForTMobile;

      this.activeCommet = 0;
      this.activeCommet++;
      this.queryCallDetail('mobile');
    }
  }
}
