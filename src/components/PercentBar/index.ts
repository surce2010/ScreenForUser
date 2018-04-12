import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import WithRender from './percent.html?style=./percent.scss';
import IconItem from '@components/IconItem';

@WithRender
@Component({
  components: { IconItem }
})
export default class PercentBar extends Vue {
  @Prop() role: string;
  @Prop({default: true}) displayRole: boolean;
  @Prop() value: number[];
  @Prop({default: true}) displayNum: boolean;
  @Prop({default: () => ['#E9B042', '#37A2F7']}) color: string[];

  get percents() {
    const sum = this.value.reduce((a, b) => a + b, 0);
    let total = 100;
    const len = this.value.length;
    return this.value.map((d, idx) => {
      if (idx === len - 1) {
        return total;
      } else {
        const p = Math.floor(d / sum * 100);
        total -= p;
        return p;
      }
    })
  }

}
