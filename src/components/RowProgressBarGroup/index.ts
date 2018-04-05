import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import WithRender from './group.html?style=./group.scss';
import ProgressBar from '@components/ProgressBar';

@WithRender
@Component({
  components: { ProgressBar }
})
export default class RowProgressBarGroup extends Vue {
  @Prop({default: false}) showValue: boolean;
  @Prop({default: false}) real: boolean;
  @Prop() data: ChartItem[];
  @Prop({default: () => ['#1DE9B6', '#1DC4E9']}) color: string[];

  get percents() {
    let max = 0;
    this.data.forEach(item => item.value > max ? max = item.value : 0);
    return this.data.map(item => {
      return {
        ...item,
        percent: this.real ? item.value : Math.floor((item.value as number) / max * 100)
      }
    });
  }

}
