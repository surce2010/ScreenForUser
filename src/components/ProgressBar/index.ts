import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import WithRender from './bar.html?style=./bar.scss';

@WithRender
@Component
export default class ProgressBar extends Vue {
  @Prop() name: string;
  @Prop() value: number | string;
  @Prop() percent: number;
  @Prop({default: () => ['#1DE9B6', '#1DC4E9']}) color: string[];
}
