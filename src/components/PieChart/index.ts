import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import WithRender from './pie.html?style=./pie.scss';
import Chart from '@components/Chart';

@WithRender
@Component({
  components: {Chart}
})
export default class PieChart extends Vue {
  @Prop({default: '100%'}) height: number | string;
  @Prop({default: true}) notMerge: boolean;
  @Prop({default: false}) showValue: boolean;
  @Prop({default: () => []}) data: ChartItem[];
  @Prop({default: 0.6}) inner: number;
  @Prop({default: 1}) outer: number;
  @Prop({default: () => ['#A085D3', '#27A6F6', '#F25B58', '#3AC868', '#ECB045', '#E9B042', '#ED5854']}) color: string[];

  options = {}

  @Watch('data')
  onDataChange(nData: ChartItem[]) {
    if (nData.every(item => item.value === 0)) {
      return;
    }
    const width = document.body.getBoundingClientRect().width;
    let fontSize = 12;
    if (width > 1000 && width <= 1440) {
      fontSize = 16;
    } else if (width > 1440) {
      fontSize = 18;
    }
    this.options = {
      color: this.color,
      series: [{
        type:'pie',
        hoverAnimation: false,
        radius: [`${this.inner * 100}%`, `${this.outer * 100}%`],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'inside',
            fontFamily: 'DINCondensed',
            fontSize: fontSize,
            formatter: ({percent, value}) => {
              const p = this.showValue ? parseInt(value) : parseInt(percent);
              if (p < 1) {
                return '';
              }
              return `${p}%`;
            }
          }
        },
        data: this.data
      }]
    }
  }

  mounted () {
    this.onDataChange(this.data);
  }

}
