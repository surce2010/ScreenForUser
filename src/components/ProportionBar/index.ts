import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import WithRender from './proportion.html?style=./proportion.scss';
import IconItem from '@components/IconItem';

@WithRender
@Component({
  components: { IconItem }
})
export default class PercentBar extends Vue {
  @Prop() role: string;
  @Prop() value: number;
  @Prop() total: number;
  @Prop({default: () => ['#E9B042']}) color: string[];

  get proportion() {
    return Math.floor(this.value / this.total * 100);
  }
}
