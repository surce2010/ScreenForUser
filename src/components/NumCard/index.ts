import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import WithRender from './number.html?style=./number.scss';

@WithRender
@Component
export default class NumCard extends Vue {
  @Prop({default: 0}) num: number;
  @Prop({default: 5}) size: number;
  @Prop({default: 'rgba(0, 0, 0, 0.4)'}) bgColor: string;
  @Prop({default: () => ['#f1f1f1', '#adadad']}) color: string[];
}
