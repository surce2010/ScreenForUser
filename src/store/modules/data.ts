import {DATA_HEALTH, DATA_SUMMARY, DATA_TECH, DATA_INTERFACE, DATA_DATABASE, DATA_CODE, DATA_QUALITY, DATA_BAK, DATA_RESOLVE, DATA_TOPOLOGY, DATA_LAST30DAYSPROCESSPROBLEMSTATISC} from '@store/Constants';
import axios from '@utils/axios';
import format, {formatNumber} from '@utils/DataFormat';

const state = {
  healthX: [],
  healthData: [],
  summay: [],
  techCount: 0,
  interfaceCount: 0,
  databaseCount: 0,
  codeCount: 0,
  qualityCount: 0,
  bakCount: 0,
  resolves: [],
  resolveCount: 0,
  topology: [],
  last30days: []
}
const mutations = {
  [DATA_HEALTH](state, res = {}) {
    const d = format(res);
    const x = [];
    const data = [];
    d.forEach(item => {
      x.push(item.zxsj_day.substr(8) + '日');
      data.push(parseFloat(item.zfs));
    });
    state.healthX = x;
    state.healthData = data;
  },
  [DATA_SUMMARY](state, res = {}) {
    state.summay = format(res);
  },
  [DATA_TECH](state, res = {}) {
    const item = format(res)[0] || {};
    state.techCount = formatNumber(item.problem_num || 0);
  },
  [DATA_INTERFACE](state, res = {}) {
    const item = format(res)[0] || {};
    state.interfaceCount = formatNumber(item.problen_num || 0);
  },
  [DATA_DATABASE](state, res = {}) {
    const item = format(res)[0] || {};
    state.databaseCount = formatNumber(item.problem_num || 0);
  },
  [DATA_CODE](state, res = {}) {
    const item = format(res)[0] || {};
    state.codeCount = formatNumber(item.problem_num || 0);
  },
  [DATA_QUALITY](state, res = {}) {
    const item = format(res)[0] || {};
    state.qualityCount = formatNumber(item.problem_num || 0);
  },
  [DATA_BAK](state, res = {}) {
    const item = format(res)[0] || {};
    state.bakCount = formatNumber(item.problem_num || 0);
  },
  [DATA_RESOLVE](state, res = {}) {
    state.resolves = format(res);
    state.resolveCount = formatNumber(res.pageInfo.total) || 0
  },
  [DATA_TOPOLOGY](state, res = {}) {
    state.topology = format(res);
  },
  [DATA_LAST30DAYSPROCESSPROBLEMSTATISC](state, res = {}) {
    state.last30days = format(res);
  }
}
const actions = {
  async [DATA_HEALTH]({commit}, {schoolId=''} = {}) {
    const {data, status} = await axios.post('/dataHealthStatisc', {
      schoolId
    })
    if (status === 200 || status === 202) {
      commit(DATA_HEALTH, data);
    }
  },
  async [DATA_SUMMARY]({commit}, {schoolId=''} = {}) {
    const {data, status} = await axios.post('/dataSummaryStatisc', {
      schoolId
    })
    if (status === 200 || status === 202) {
      commit(DATA_SUMMARY, data);
    }
  },
  async [DATA_TECH]({commit}, {schoolId=''} = {}) {
    const {data, status} = await axios.post('/metaDataTechnicalAttrProblemNum', {
      schoolId
    })
    if (status === 200 || status === 202) {
      commit(DATA_TECH, data);
    }
  },
  async [DATA_INTERFACE]({commit}, {schoolId=''} = {}) {
    const {data, status} = await axios.post('/IntegIntfRunProblemNum', {
      schoolId
    })
    if (status === 200 || status === 202) {
      commit(DATA_INTERFACE, data);
    }
  },
  async [DATA_DATABASE]({commit}, {schoolId=''} = {}) {
    const {data, status} = await axios.post('/metaDataConsistencyProblemNum', {
      schoolId
    })
    if (status === 200 || status === 202) {
      commit(DATA_DATABASE, data);
    }
  },
  async [DATA_CODE]({commit}, {schoolId=''} = {}) {
    const {data, status} = await axios.post('/CodeConsistencyProblemNum', {
      schoolId
    })
    if (status === 200 || status === 202) {
      commit(DATA_CODE, data);
    }
  },
  async [DATA_QUALITY]({commit}, {schoolId=''} = {}) {
    const {data, status} = await axios.post('/dataQualityProblemNum', {
      schoolId
    })
    if (status === 200 || status === 202) {
      commit(DATA_QUALITY, data);
    }
  },
  async [DATA_BAK]({commit}, {schoolId=''} = {}) {
    const {data, status} = await axios.post('/dataBackupProblemNum', {
      schoolId
    })
    if (status === 200 || status === 202) {
      commit(DATA_BAK, data);
    }
  },
  async [DATA_RESOLVE]({commit}, {schoolId=''} = {}) {
    const {data, status} = await axios.post('/resolveProblemList', {
      schoolId,
      // pageNum: 1,
      // pageSize: 7
    })
    if (status === 200 || status === 202) {
      commit(DATA_RESOLVE, data);
    }
  },
  async [DATA_TOPOLOGY]({commit}, {schoolId=''} = {}) {
    const {data, status} = await axios.post('/dataTopology', {
      schoolId
    })
    if (status === 200 || status === 202) {
      commit(DATA_TOPOLOGY, data);
    }
  },
  async [DATA_LAST30DAYSPROCESSPROBLEMSTATISC]({commit}, {schoolId=''} = {}) {
    const {data, status} = await axios.post('/last30DaysProcessProblemStatisc', {
      schoolId
    })
    if (status === 200 || status === 202) {
      commit(DATA_LAST30DAYSPROCESSPROBLEMSTATISC, data);
    }
  }
}

export default {
  state,
  mutations,
  actions
}
