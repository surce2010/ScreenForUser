import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import WithRender from './icon.html?style=./icon.scss';

import teacher from '@assets/images/teacher.png';
import student from '@assets/images/student.png';


const map = {
  student: '学生',
  teacher: '老师'
}
const mapIcon = {
  student: student,
  teacher: teacher
}

@WithRender
@Component
export default class IconItem extends Vue {
  @Prop({default: 'student'}) role: string;
  @Prop({default: true}) column: boolean;

  get name() {
    return map[this.role] || '';
  }
  get icon() {
    return mapIcon[this.role] || '';
  }
}
