import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import {State} from 'vuex-class';
import WithRender from './behavior.html?style=./behavior.scss';
import Card from '@components/Card';
import PercentBar from '@components/PercentBar';
import Legend from '@components/Legend';
import TwoPieChart from '@components/TwoPieChart';
import create from '@utils/websocket';
import format from '@utils/DataFormat';
import ProgressBarGroup from '@components/ProgressBarGroup';
import IconItem from '@components/IconItem';
import Chart from '@components/Chart';
import 'echarts/map/js/china';
import axios from "@utils/axios";
import '@utils/mockdb'

@WithRender
@Component({
  components: {Card, PercentBar, vLegend: Legend, TwoPieChart, Chart, ProgressBarGroup, IconItem}
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
    student: [0, 0],
    teacher: [0, 0]
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

  created() {
    //默认查询一次
    this.schoolUserStatiscLoop();

    setInterval(() => {
      this.schoolUserStatiscLoop();
    }, 5000);
  }

  async querySchoolAppStatisc() {
    const {data} = await axios.get('/topic/schoolUserStatisc/', {
      params: {
        schoolCode: this.$route.query.schoolCode
      }
    });
    if (data) {
      return data;
    }
  }

  async schoolUserStatiscLoop() {
    //用户分析接口信息
    const json = await this.querySchoolAppStatisc();
    if (!json) {
      return;
    }
    this.date = new Date();
    const accountActiveStatisc = format(json.accountActiveStatisc)[0] || {};
    let activeS = Math.floor(accountActiveStatisc.active_account_num_s / accountActiveStatisc.account_num_s * 100);
    if (isNaN(activeS)) {
      this.accountActive.student = [50, 50];
    } else {
      this.accountActive.student = [100 - activeS, activeS];
    }
    let activeT = Math.floor(accountActiveStatisc.active_account_num_t / accountActiveStatisc.account_num_t * 100);
    if (isNaN(activeT)) {
      this.accountActive.teacher = [50, 50];
    } else {
      this.accountActive.teacher = [100 - activeT, activeT];
    }

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
    }]

    const accountAuditStatisc = format(json.accountAuditStatisc)[0] || {};
    this.history.guess = accountAuditStatisc.pws_guess_num || 0;
    this.history.ip = accountAuditStatisc.malic_ip_num || 0;

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
    const studentNetworkStatisc = format(json.studentNetworkStatisc);
    networkX = studentNetworkStatisc.map(d => d.network_provider);
    const teacherNetworkStatisc = format(json.teacherNetworkStatisc);
    teacherNetworkStatisc.forEach(d => {
      if (networkX.indexOf(d.network_provider) === -1) {
        networkX.push(d.network_provider)
      }
    });
    this.network.x = networkX; //所有常用运行商名称
    console.log('networkX:', networkX);
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

    const studentBrowserTop5Statisc = format(json.studentBrowserTop5Statisc);
    sum = 0;
    studentBrowserTop5Statisc.forEach(d => sum += d.user_num);
    this.browserTop5.student = studentBrowserTop5Statisc.map(d => {
      return {
        name: d.browser,
        value: Math.round(d.user_num / (sum || 1) * 100)
      }
    })

    const teacherBrowserTop5Statisc = format(json.teacherBrowserTop5Statisc);
    sum = 0;
    teacherBrowserTop5Statisc.forEach(d => sum += d.user_num);
    this.browserTop5.teacher = teacherBrowserTop5Statisc.map(d => {
      return {
        name: d.browser,
        value: Math.round(d.user_num / (sum || 1) * 100)
      }
    })
  }
}
