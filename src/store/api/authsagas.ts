import {
  call,
  put,
  takeEvery,
  CallEffect,
  PutEffect,
  AllEffect,
} from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";

const CREATE_SESSION_REQUEST = "CREATE_SESSION_REQUEST";
const CREATE_SESSION_SUCCESS = "CREATE_SESSION_SUCCESS";
const CREATE_SESSION_FAILURE = "CREATE_SESSION_FAILURE";

const createSessionRequest = () => ({ type: CREATE_SESSION_REQUEST });

const createSessionSuccess = (data: any) => ({
  type: CREATE_SESSION_SUCCESS,
  payload: data,
});

const createSessionFailure = (error: string) => ({
  type: CREATE_SESSION_FAILURE,
  payload: error,
});

function* createSessionSaga(): Generator<
  | CallEffect<AxiosResponse<any>>
  | PutEffect<any>
  | AllEffect<AxiosResponse<any>>,
  void,
  AxiosResponse<any>
> {
  try {
    const response: AxiosResponse<any> = yield call(
      axios.get,
      "https://linkedin-cv-crawler.beta-limited.workers.dev/interview/createsession",
    );
    yield put(createSessionSuccess(response.data));
  } catch (error) {
    yield put(createSessionFailure(error.message));
  }
}

function* watchCreateSession() {
  yield takeEvery(CREATE_SESSION_REQUEST, createSessionSaga);
}

export {
  CREATE_SESSION_REQUEST,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_FAILURE,
  createSessionRequest,
  createSessionSuccess,
  createSessionFailure,
  createSessionSaga,
  watchCreateSession,
};
