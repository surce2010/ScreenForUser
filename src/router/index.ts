import Vue, {ComponentOptions} from 'vue';
import Router from 'vue-router';
import {RESCONTEXT} from '@utils/context';

function view(name: string): ComponentOptions<Vue> {
  return resolve => require([`../views/${name}`], resolve);
}

Vue.use(Router);
export default new Router({
  // mode: "history",
  base: RESCONTEXT,
  routes: [{
    path: '/',
    component: view('App'),
    redirect: {
      name: 'core'
    },
    children: [{
      path: '/CoreApp',
      name: 'core',
      meta: {
        title: '重点关注的应用'
      },
      component: view('CoreApps')
    }, {
      path: '/VisitStastics',
      name: 'visit',
      meta: {
        title: '应用访问统计'
      },
      component: view('Visit')
    }, {
      path: '/AppAnalysis',
      name: 'running',
      meta: {
        title: '应用运行监控'
      },
      component: view('Running')
    }, {
      path: '/DataAnalysis',
      name: 'data',
      meta: {
        title: '数据运行监控'
      },
      component: view('Data')
    }, {
      path: '/UserAction',
      name: 'behavior',
      meta: {
        title: '用户分析'
      },
      component: view('Behavior')
    }, {
      path: '/SecureDefend',
      name: 'secure',
      meta: {
        title: '安全防护态势'
      },
      component: view('Secure')
    }, {
      path: '/HostStatus',
      name: 'host',
      meta: {
        title: '主机运行监测'
      },
      component: view('Host')
    }, {
      path: '/SystemAnalysis',
      name: 'system',
      meta: {
        title: '系统运行分析'
      },
      component: view('SystemAnalysis')
    }, {
      path: '/OperationData',
      name: 'operation',
      meta: {
        title: '运行数据分析'
      },
      component: view('OperationData')
    }, {
      path: '/SafetyProtection',
      name: 'safetyProtection',
      meta: {
        title: '安全守护'
      },
      component: view('SafetyProtection')
    }, {
      path: '/SafetyMonitoring',
      name: 'SafetyMonitoring',
      meta: {
        title: '安全监测'
      },
      component: view('SafetyMonitoring')
    }]
  }]
});
