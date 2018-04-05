import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import WithRender from './pie.html?style=./pie.scss';
import PieChart from '@components/PieChart';

@WithRender
@Component({
  components: {PieChart}
})
export default class PieChartWithLegend extends Vue {
  @Prop({default: '100%'}) height: number | string;
  @Prop({default: true}) notMerge: boolean;
  @Prop({default: false}) showValue: boolean;
  @Prop({default: false}) showReal: boolean;
  @Prop({default: () => []}) data: ChartItem[];
  @Prop({default: 0.6}) inner: number;
  @Prop({default: 1}) outer: number;
  @Prop({default: () => ['#A085D3', '#27A6F6', '#F25B58', '#3AC868', '#ECB045', '#F90042', '#ED5854']}) color: string[];
  @Prop({default: true}) column: boolean;
  @Prop({default: 2}) chartFlex: number;
  @Prop({default: 2}) cols: number;

  get legends() {
    const len = this.color.length;
    return this.data.map((d, idx) => {
      return {
        color: this.color[idx % len],
        value: d.value,
        name: d.name
      }
    })
  }
  get rows() {
    return Math.ceil(this.data.length / this.cols);
  }

}
