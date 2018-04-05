import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import WithRender from './legend.html?style=./legend.scss';

@WithRender
@Component
export default class Legend extends Vue {
  @Prop({default: () => []}) data: ChartItem[];
}
