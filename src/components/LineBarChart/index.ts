import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import WithRender from './line.html?style=./line.scss';
import Chart from '@components/Chart';

@WithRender
@Component({
  components: {Chart}
})
export default class LineChart extends Vue {
  @Prop({default: '100%'}) height: number | string;
  @Prop({default: true}) notMerge: boolean;
  @Prop({default: false}) smooth: boolean;
  @Prop({default: () => []}) x: string[];
  @Prop({default: () => []}) data: ChartItem[];
  @Prop({default: () => ['#3AC868', '#FB7643']}) color: string[];

  options = {tooltip: {}, legend: {}, series: [], xAxis: [], yAxis: [], grid: {}, color: []}

  @Watch('data')
  onDataChange(nData: ChartItem[]) {
    const legend = [];
    const series = [];
    nData.forEach(d => {
      legend.push({
        name: d.name,
        icon: d.icon,
        textStyle: {
          color: '#fff'
        }
      });
      series.push({
        name: d.name,
        type: d.type,
        data: d.value,
        yAxisIndex: d.yAxisIndex
      });
    });
    this.options = {
      tooltip: {
        trigger: 'axis',
        show: true
      },
      legend: {
        show: true,
        left: 'center',
        data: legend
      },
      grid: {
        top: '10%',
        left: '4%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#eaeaea',
              opacity: 0.1
            }
          },
          axisLabel: {
            color: 'white'
          },
          axisLine: {
            lineStyle: {
              color: 'white'
            }
          },
          data: this.x
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '总记录数日增量/条',
          position: 'left',
          // boundaryGap: [0, '50%'],
          nameTextStyle: {
            color: '#ffffff',
            align: 'center'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#eaeaea',
              opacity: 0.1
            }
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: 'white'
          },
          axisTick: {
            show: false
          }
        }, {
          type: 'value',
          name: '数据吞吐量/条',
          position: 'right',
          // boundaryGap: [0, '50%'],
          nameTextStyle: {
            color: '#ffffff',
            align: 'center'
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#eaeaea',
              opacity: 0.1
            }
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: 'white'
          },
          axisTick: {
            show: false
          }
        }
      ],
      series: series,
      color: this.color
    }
  }

  mounted() {
    this.onDataChange(this.data);
  }
}
