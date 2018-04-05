import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import {State} from 'vuex-class';
import WithRender from './visit.html?style=./visit.scss';
import Card from '@components/Card';

@WithRender
@Component({
  components: { Card }
})
export default class Visit extends Vue {

}
