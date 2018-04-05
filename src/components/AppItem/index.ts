import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import WithRender from './item.html?style=./item.scss';

@WithRender
@Component
export default class AppItem extends Vue {
  @Prop({default: ''}) icon: string;
  @Prop({default: ''}) name: string;
  @Prop({default: '0'}) enable: string;
  @Prop({default: '0'}) safe: string;
  @Prop({default: '0'}) protect: string;

}
