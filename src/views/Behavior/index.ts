import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import {State} from 'vuex-class';
import WithRender from './behavior.html?style=./behavior.scss';
import Card from '@components/Card';
import ProportionBar from '@components/ProportionBar';
import PercentBar from '@components/PercentBar';
import Legend from '@components/Legend';
import TwoPieChart from '@components/TwoPieChart';
import create from '@utils/websocket';
import format, {formatNumber} from '@utils/DataFormat';
import ProgressBarGroup from '@components/ProgressBarGroup';
import IconItem from '@components/IconItem';
import Chart from '@components/Chart';
import 'echarts/map/js/china';
import axios from "@utils/axios";
// import '@utils/mockdb';

@WithRender
@Component({
  components: {Card, ProportionBar, PercentBar, vLegend: Legend, TwoPieChart, Chart, ProgressBarGroup, IconItem}
})
export default class Behavior extends Vue {
  activeLegendColor = ['#E9B042', '#37A2F7'];
  safeLegendColor = ['#E9B042', '#9D81D2', '#37A2F7', '#42c76c'];
  date = new Date();
  opts = {
    tooltip: {
      trigger: 'item'
    },
    visualMap: {
      show: false,
      max: 100,
      color: ['#1D4ADC', '#C1CDDD']
    },
    series: [{
      name: '用户地域分布',
      type: 'map',
      top: 0,
      bottom: 0,
      mapType: 'china',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#C2CFDE',
          borderColor: '#333333',
          borderWidth: 1
        }
      },
      data: []
    }]
  };
  accountActive = {
    student: 0,
    teacher: 0,
    total: ''
  };
  onlineStudent = [];
  onlineTeacher = [];
  loginX = [];
  loginStudent = [];
  loginTeacher = [];
  clientStudent = [];
  clientTeacher = [];
  history = {
    ip: 0,
    guess: 0
  };
  historyToday = {
    ip: 0,
    guess: 0
  };
  historyTotal = {
    ip: 0,
    guess: 0
  };
  accountSafe = {
    student: [25, 25, 25, 25],
    teacher: [25, 25, 25, 25]
  };
  network = {
    x: [],
    student: [],
    teacher: []
  };
  browserTop5 = {
    student: [],
    teacher: []
  };
  timer = null;
  historySource = 'today';
  intervalTime = 60000;
  userForeignAreaTop5Statisc = [];

  created() {
    create().subscribe('/topic/schoolUserStatisc/' + this.$route.query.schoolCode, {
      flag: true
    }, json => {
      if (!json) {
        return;
      }
      this.date = new Date();
      //账号身份分布
      const accountActiveStatisc = format(json.accountActiveStatisc)[0] || {};
      this.accountActive.student = accountActiveStatisc.account_num_s;
      this.accountActive.teacher = accountActiveStatisc.account_num_t;
      let total = this.accountActive.student + this.accountActive.teacher;
      this.accountActive.total = formatNumber(total);

      const x = ['<0.5h', '0.5-1h', '1-2h', '2-3h', '>3h'];

      const studentOnlineTimeStatisc = format(json.studentOnlineTimeStatisc);
      let sum = 0;
      let temp = [];
      const student = [];
      studentOnlineTimeStatisc.forEach(d => sum += d.user_num);
      for (let i = 0; i < x.length; i++) {
        let filter = studentOnlineTimeStatisc.filter(d => d.online_time_grade === x[i])
        if (filter.length === 0) {
          filter = [{online_time_grade: x[i], user_num: 0}];
        }
        temp = temp.concat(filter)
      }
      for (let i = 0; i < temp.length; i++) {
        const index = x.indexOf(temp[i].online_time_grade);
        student.push({
          value: parseFloat((temp[i].user_num / (sum || 1) * 100).toFixed(1)),
          name: temp[i].online_time_grade
        })
      }
      this.onlineStudent = student;

      const teacherOnlineTimeStatisc = format(json.teacherOnlineTimeStatisc);
      sum = 0;
      temp = [];
      let teacher = []
      teacherOnlineTimeStatisc.forEach(d => sum += d.user_num);
      for (let i = 0; i < x.length; i++) {
        let filter = teacherOnlineTimeStatisc.filter(d => d.online_time_grade === x[i])
        if (filter.length === 0) {
          filter = [{online_time_grade: x[i], user_num: 0}];
        }
        temp = temp.concat(filter)
      }
      for (let i = 0; i < temp.length; i++) {
        teacher.push({
          value: parseFloat((temp[i].user_num / (sum || 1) * 100).toFixed(1)),
          name: temp[i].online_time_grade
        })
      }
      this.onlineTeacher = teacher;

      let loginX = [];
      const studentLoginTypeStatisc = format(json.studentLoginTypeStatisc);
      const teacherLoginTypeStatisc = format(json.teacherLoginTypeStatisc);
      loginX = studentLoginTypeStatisc.map(d => d.login_type);
      teacherLoginTypeStatisc.forEach(d => {
        if (loginX.indexOf(d.login_type) === -1) {
          loginX.push(d.login_type);
        }
      })
      this.loginX = loginX;

      temp = [];
      teacher = [];
      sum = 0;
      studentLoginTypeStatisc.forEach(d => sum += d.user_num);
      for (let i = 0; i < loginX.length; i++) {
        let filter = studentLoginTypeStatisc.filter(d => d.login_type === loginX[i])
        if (filter.length === 0) {
          filter = [{login_type: x[i], user_num: 0}];
        }
        temp = temp.concat(filter)
      }
      this.loginStudent = temp.map(d => {
        return {
          value: (d.user_num / (sum || 1) * 100).toFixed(1),
          name: d.login_type
        }
      })

      temp = [];
      teacher = [];
      sum = 0;
      teacherLoginTypeStatisc.forEach(d => sum += d.user_num);
      for (let i = 0; i < loginX.length; i++) {
        let filter = teacherLoginTypeStatisc.filter(d => d.login_type === loginX[i])
        if (filter.length === 0) {
          filter = [{login_type: x[i], user_num: 0}];
        }
        temp = temp.concat(filter)
      }
      this.loginTeacher = temp.map(d => {
        return {
          value: (d.user_num / (sum || 1) * 100).toFixed(1),
          name: d.login_type
        }
      })

      const studentClientStatisc = format(json.studentClientStatisc);
      sum = 0;
      studentClientStatisc.forEach(d => sum += d.user_num);
      temp = [];
      let pc = studentClientStatisc.find(d => d.client_type === 'pc') || {user_num: 0};
      let mobile = studentClientStatisc.find(d => d.client_type === 'mobile') || {user_num: 0};

      this.clientStudent = [{
        value: parseInt((pc.user_num / (sum || 1) * 100).toFixed(0)),
        name: pc.client_type
      }, {
        value: parseInt((mobile.user_num / (sum || 1) * 100).toFixed(0)),
        name: mobile.client_type
      }]

      const teacherClientStatisc = format(json.teacherClientStatisc);
      sum = 0;
      teacherClientStatisc.forEach(d => sum += d.user_num);
      temp = [];
      pc = teacherClientStatisc.find(d => d.client_type === 'pc') || {user_num: 0};
      mobile = teacherClientStatisc.find(d => d.client_type === 'mobile') || {user_num: 0};
      this.clientTeacher = [{
        value: parseInt((pc.user_num / (sum || 1) * 100).toFixed(0)),
        name: pc.client_type
      }, {
        value: parseInt((mobile.user_num / (sum || 1) * 100).toFixed(0)),
        name: mobile.client_type
      }];

      const accountAuditStatisc = format(json.accountAuditStatisc)[0] || {};
      this.historyTotal.guess = accountAuditStatisc.pws_guess_num || 0;
      this.historyTotal.ip = accountAuditStatisc.malic_ip_num || 0;
      const todayAccountAuditStatisc = format(json.todayAccountAuditStatisc)[0] || {};
      this.historyToday.guess = todayAccountAuditStatisc.pws_guess_num || 0;
      this.historyToday.ip = todayAccountAuditStatisc.malic_ip_num || 0;
      if (this.historySource === 'today') {
        this.history = this.historyToday;
      } else {
        this.history = this.historyTotal;
      }

      const studentAccountSafeStatisc = format(json.studentAccountSafeStatisc);

      sum = 0;
      studentAccountSafeStatisc.forEach(d => sum += d.user_num);
      let strong = studentAccountSafeStatisc.find(d => d.pwd_safe_grade === '强') || {user_num: 0}
      let normal = studentAccountSafeStatisc.find(d => d.pwd_safe_grade === '中') || {user_num: 0}
      let weak = studentAccountSafeStatisc.find(d => d.pwd_safe_grade === '弱') || {user_num: 0}
      let none = studentAccountSafeStatisc.find(d => d.pwd_safe_grade === '无安全等级') || {user_num: 0}
      let val1 = Math.floor(strong.user_num / (sum || 1) * 100) || 0;
      let val2 = Math.floor(normal.user_num / (sum || 1) * 100) || 0;
      let val3 = Math.floor(weak.user_num / (sum || 1) * 100) || 0;
      let val4 = Math.floor(none.user_num / sum * 100) || 0;
      if (val1 === 0 && val2 === 0 && val3 === 0 && val4 === 0) {
        val4 = 0;
      } else {
        this.accountSafe.student = [
          val1, val2, val3, 100 - val1 - val2 - val3
          // Math.floor(none.user_num / sum * 100) || 0,
        ]
      }

      const teacherAccountSafeStatisc = format(json.teacherAccountSafeStatisc);
      sum = 0;
      teacherAccountSafeStatisc.forEach(d => sum += d.user_num);
      strong = teacherAccountSafeStatisc.find(d => d.pwd_safe_grade === '强') || {user_num: 0}
      normal = teacherAccountSafeStatisc.find(d => d.pwd_safe_grade === '中') || {user_num: 0}
      weak = teacherAccountSafeStatisc.find(d => d.pwd_safe_grade === '弱') || {user_num: 0}
      none = teacherAccountSafeStatisc.find(d => d.pwd_safe_grade === '无安全等级') || {user_num: 0}
      val1 = Math.floor(strong.user_num / (sum || 1) * 100) || 0;
      val2 = Math.floor(normal.user_num / (sum || 1) * 100) || 0;
      val3 = Math.floor(weak.user_num / (sum || 1) * 100) || 0;
      val4 = Math.floor(none.user_num / sum * 100) || 0;
      if (val1 === 0 && val2 === 0 && val3 === 0 && val4 === 0) {
        val4 = 0;
      } else {
        this.accountSafe.teacher = [
          val1, val2, val3, 100 - val1 - val2 - val3
          // Math.floor(none.user_num / sum * 100) || 0,
        ]
      }

      //用户常用运营商
      let networkX = [];
      const studentNetworkStatisc = format(json.studentNetworkStatisc).slice(0, 3);
      networkX = studentNetworkStatisc.map(d => d.network_provider);
      const teacherNetworkStatisc = format(json.teacherNetworkStatisc).slice(0, 3);
      teacherNetworkStatisc.forEach(d => {
        if (networkX.indexOf(d.network_provider) === -1) {
          networkX.push(d.network_provider)
        }
      });
      this.network.x = networkX; //所有常用运行商名称
      temp = [];
      sum = 0;
      studentNetworkStatisc.forEach(d => sum += d.user_num);
      for (let i = 0; i < networkX.length; i++) {
        const finded = studentNetworkStatisc.find(d => d.network_provider === networkX[i]);
        temp.push({
          name: networkX[i],
          value: finded ? Math.round(finded.user_num / (sum || 1) * 100) : 0
        })
      }
      this.network.student = temp;

      temp = [];
      sum = 0;
      teacherNetworkStatisc.forEach(d => sum += d.user_num);
      for (let i = 0; i < networkX.length; i++) {
        const finded = teacherNetworkStatisc.find(d => d.network_provider === networkX[i]);
        temp.push({
          name: networkX[i],
          value: finded ? Math.round(finded.user_num / (sum || 1) * 100) : 0
        })
      }
      this.network.teacher = temp;

      const userAreaStatisc = format(json.userAreaStatisc);
      temp = [];
      let max = 0;
      for (let i = 0; i < userAreaStatisc.length; i++) {
        const province = userAreaStatisc[i].province.replace(/省|市|回族|壮族|维吾尔|自治区|特别行政区/g, '');
        if (userAreaStatisc[i].user_num > max) {
          max = userAreaStatisc[i].user_num;
        }
        temp.push({
          name: province,
          value: userAreaStatisc[i].user_num
        })
      }
      this.opts.visualMap.max = max || 100;
      this.opts.series[0].data = temp;

      const userForeignAreaTop5Statisc = format(json.userForeignAreaTop5Statisc).slice(0, 5);
      sum = 0;
      userForeignAreaTop5Statisc.forEach(d => sum += d.userNum);
      this.userForeignAreaTop5Statisc = userForeignAreaTop5Statisc.map(d => {
        return {
          name: d.country,
          value: Math.round(d.userNum / (sum || 1) * 100)
        }
      });

      const studentBrowserTop5Statisc = format(json.studentBrowserTop5Statisc);
      sum = 0;
      studentBrowserTop5Statisc.forEach(d => sum += d.user_num);
      this.browserTop5.student = studentBrowserTop5Statisc.map(d => {
        return {
          name: d.browser,
          value: Math.round(d.user_num / (sum || 1) * 100)
        }
      });

      const teacherBrowserTop5Statisc = format(json.teacherBrowserTop5Statisc);
      sum = 0;
      teacherBrowserTop5Statisc.forEach(d => sum += d.user_num);
      this.browserTop5.teacher = teacherBrowserTop5Statisc.map(d => {
        return {
          name: d.browser,
          value: Math.round(d.user_num / (sum || 1) * 100)
        }
      })
    });

    this.timer = setTimeout(() => {
      if (this.historySource === 'today') {
        this.toggleHistorySource('total')
      } else {
        this.toggleHistorySource('today')
      }
    }, this.intervalTime);
  }

  toggleHistorySource(name: string) {
    this.historySource = name;
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setTimeout(() => {
      if (this.historySource === 'today') {
        this.toggleHistorySource('total')
      } else {
        this.toggleHistorySource('today')
      }
    }, this.intervalTime);
  };

  @Watch('historySource')
  onHistorySourceChange(nData: String) {
    if (nData === 'today') {
      this.history = this.historyToday;
    } else {
      this.history = this.historyTotal;
    }
  }
}
