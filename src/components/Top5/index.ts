import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import WithRender from './top.html?style=./top.scss';

@WithRender
@Component
export default class Top5 extends Vue {
  @Prop({default: () => ['#3AC868', '#A085D3', '#27A6F6', '#ED5854', '#E9B042']}) color: string[];
  @Prop() data: ChartItem[];

  @Prop({default: () => []}) showKey: ChartItem[];

  get percents() {
    let max = 0;
    this.data.forEach(item => item.value > max ? max = item.value as number : null);
    return this.data.slice(0, 5).map((item, idx) => {
      return {
        ...item,
        percent: Math.floor((item.value as number) / max * 100),
        color: this.color[idx % this.color.length]
      }
    })
  }


}
