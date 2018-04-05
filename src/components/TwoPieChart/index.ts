import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import WithRender from './pie.html?style=./pie.scss';
import IconItem from '@components/IconItem';
import PieChart from '@components/PieChart';
import Legend from '@components/Legend';

@WithRender
@Component({
  components: { IconItem, PieChart, vLegend: Legend }
})
export default class TwoPieChart extends Vue {
  @Prop({default: () => []}) legend: string[];
  @Prop({default: () => []}) data: ChartItem[];
  @Prop({default: () => []}) data2: ChartItem[];
  @Prop({default: 0.6}) inner: number;
  @Prop({default: 1}) outer: number;
  @Prop({default: () => ['#E6B03F', '#E3544C', '#37A2F7', '#9D81D2', '#42c66c']}) color: string[];

  get legendWithColor() {
    return this.legend.map((l, idx) => {
      return {
        name: l,
        value: this.color[idx%this.color.length]
      }
    })
  }

}
