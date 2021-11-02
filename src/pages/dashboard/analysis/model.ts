import type {Effect, Reducer} from 'umi';

import type {AnalysisData} from './data.d';
import {fakeChartData, chartData} from './service';

export interface ModelType {
  namespace: string;
  state: AnalysisData;
  effects: {
    fetch: Effect;
    fetchSalesData: Effect;
  };
  reducers: {
    save: Reducer<AnalysisData>;
    clear: Reducer<AnalysisData>;
  };
}

const initState = {
  visitData: [],
  visitData2: [],
  commentsData: [],
  viewsData: [],
  searchData: [],
  offlineData: [],
  offlineChartData: [],
  salesTypeData: [],
  salesTypeDataOnline: [],
  salesTypeDataOffline: [],
  radarData: [],
};

const Model: ModelType = {
  namespace: 'dashboardAndAnalysis',

  state: initState,

  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * fetchSalesData(_, {call, put}) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          commentsData: response.commentsData,
          viewsData: response.viewsData,
        },
      });
    },
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return initState;
    },
  },
};

export default Model;
