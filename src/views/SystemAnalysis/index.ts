import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import {State} from 'vuex-class';
import WithRender from './systemAnalysis.html?style=./systemAnalysis.scss';
import Card from '@components/Card';
import ProportionBar from '@components/ProportionBar';
import PercentBar from '@components/PercentBar';
import Legend from '@components/Legend';
import TwoPieChart from '@components/TwoPieChart';
import create from '@utils/websocket';
import format, {formatNumber} from '@utils/DataFormat';
import ProgressBarGroup from '@components/ProgressBarGroup';
import RowProgressBarGroup from '@components/RowProgressBarGroup';
import IconItem from '@components/IconItem';
import LineChart from '@components/LineChart';
import PieChartWithLegend from '@components/PieChartWithLegend';
import Chart from '@components/Chart';
import 'echarts/map/js/china';
import axios from "@utils/axios";
// import '@utils/mockdb';

@WithRender
@Component({
  components: {
    Card,
    ProportionBar,
    PercentBar,
    vLegend: Legend,
    TwoPieChart,
    Chart,
    ProgressBarGroup,
    IconItem,
    LineChart,
    PieChart: PieChartWithLegend,
    RowProgressBarGroup
  }
})
export default class SystemAnalysis extends Vue {
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

  systemOverview = {
    'system_count': '',
    'last_30_days_pv': '',
    'last_30_days_ip': ''
  };
  last30DaysPvuvX = [];
  last30DaysPvuv = [];
  pvAppTop2 = [];
  pvAppTopOther = [];
  worldPvDistribute = [];
  providerPvDistribute = [];
  browserPvDistribute = [];

  created() {
    //默认查询一次
    this.getSystemAnalysisScreenNewLoop();

    setInterval(() => {
      this.getSystemAnalysisScreenNewLoop();
    }, 5000);
  }

  async getSystemAnalysisScreenNew() {
    const {data} = await axios.get('/cldPortal_new/eventopen/getSystemAnalysisScreenNew', {
      params: {
        schoolCode: this.$route.query.schoolCode
      }
    });
    if (data) {
      return data;
    }
  }

  async getSystemAnalysisScreenNewLoop() {
    //系统运行分析接口信息
    const json = await this.getSystemAnalysisScreenNew();
    if (!json) {
      return;
    }

    //业务系统概览
    this.systemOverview = {
      system_count: formatNumber(json.system_overview.system_count),
      last_30_days_pv: formatNumber(json.system_overview.last_30_days_pv),
      last_30_days_ip: formatNumber(json.system_overview.last_30_days_ip)
    };

    //近30日访问量
    let last_30_days_pvuv = json.last_30_days_pvuv;
    const x = [];
    const pv = [];
    const uv = [];
    last_30_days_pvuv.forEach(d => {
      x.push((d.statis_date || '').substr(5));
      pv.push(d.pv);
      uv.push(d.uv);
    });
    this.last30DaysPvuvX = x;
    this.last30DaysPvuv = [{
      name: 'PV',
      value: pv
    }, {
      name: 'UV',
      value: uv
    }];

    //访问量高的业务系统Top5
    let top5_pv_app = json.top5_pv_app || [];
    top5_pv_app.forEach(d => {
      d.pv = formatNumber(d.pv);
    });
    if (top5_pv_app.length > 2) {
      this.pvAppTop2 = top5_pv_app.slice(0, 2);
      this.pvAppTopOther = top5_pv_app.slice(2);
    } else {
      this.pvAppTop2 = top5_pv_app;
      this.pvAppTopOther = [];
    }

    //国内访问量分布
    const china_pv_distribute = json.china_pv_distribute;
    let temp = [];
    let max = 0;
    for (let i = 0; i < china_pv_distribute.length; i++) {
      const province = china_pv_distribute[i].name.replace(/省|市|回族|壮族|维吾尔|自治区|特别行政区/g, '');
      if (china_pv_distribute[i].count > max) {
        max = china_pv_distribute[i].count;
      }
      temp.push({
        name: province,
        value: china_pv_distribute[i].count
      })
    }
    this.opts.visualMap.max = max || 100;
    this.opts.series[0].data = temp;

    //境外访问量分布
    const world_pv_distribute = json.world_pv_distribute;
    let sum = 0;
    world_pv_distribute.forEach(d => sum += d.count);
    this.worldPvDistribute = world_pv_distribute.map(d => {
      return {
        name: d.name,
        value: Math.round(d.count / (sum || 1) * 100)
      }
    });

    //来访用户运营商分布
    const provider_pv_distribute = json.provider_pv_distribute;
    let total = 0;
    provider_pv_distribute.forEach(d => total += d.count);
    this.providerPvDistribute = provider_pv_distribute.map(d => {
      return {
        name: d.name,
        value: Math.round(d.count / (total || 1) * 100)
      }
    });

    //来访用户常用浏览器Top5
    const browser_pv_distribute = json.browser_pv_distribute;
    this.browserPvDistribute = browser_pv_distribute.map(d => {
      return {
        name: d.browser,
        value: d.count
      }
    });
  }
}
