import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import WithRender from './problem.html?style=./problem.scss';

@WithRender
@Component
export default class NoProblem extends Vue {
  @Prop({default: '暂无问题'}) title: string;
}
