import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import WithRender from './card.html?style=./card.scss';

@WithRender
@Component
export default class Card extends Vue {
  @Prop() title: string;
  @Prop() subtitle: string;
  @Prop() date: string | Date;
  @Prop({default: true}) row: boolean;
  @Prop({default: false}) detail: boolean;

  get desc() {
    if (Object.prototype.toString.call(this.date) === '[object Date]') {
      const date = this.date as Date;
      const y = date.getFullYear();
      const M = date.getMonth() + 1;
      const d = date.getDate();
      const h = date.getHours();
      const m = date.getMinutes();
      if (this.detail) {
        return `更新: ${M < 10 ? '0' + M : M}.${d < 10 ? '0' + d : d} ${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`
      }
      return '';
    }
    return this.date;
  }
}
