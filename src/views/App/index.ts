import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import {State} from 'vuex-class';
import WithRender from './app.html?style=./app.scss';
import TimeDisplay from '@components/TimeDisplay';

@WithRender
@Component({
  components: { TimeDisplay }
})
export default class App extends Vue {

  title = '';

  created () {
    const meta = this.$route.meta;
    if (meta) {
      this.setTitle(meta.title)
    }
    document.addEventListener('keyup', ({keyCode}) => {
      if (keyCode === 13) {
        document.documentElement.webkitRequestFullscreen();
      }
    })
  }

  @Watch('$route')
  onRouteChange(route) {
    if (route.meta) {
      this.setTitle(route.meta.title);
    }
  }

  setTitle(title) {
    document.title = title;
    this.title = title;
  }

}
