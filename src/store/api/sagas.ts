import {
  call,
  put,
  takeEvery,
  CallEffect,
  PutEffect,
  AllEffect,
  all,
} from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { watchCreateSession } from "./authsagas";
import { getCurrentSettings } from "src/shared/helpers";

const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
const FETCH_DATA_REQUEST_WITH_PARAMS = "FETCH_DATA_REQUEST_WITH_PARAMS";
const FETCH_VIEW_CART = "FETCH_VIEW_CART";
const FETCH_VIEW_CART_SUCCESS = "FETCH_VIEW_CART_SUCCESS";
const FETCH_VIEW_CART_FAILURE = "FETCH_VIEW_CART_FAILURE";
const ADD_PRODUCT_TO_CART_REQUEST = "ADD_PRODUCT_TO_CART_REQUEST";
const ADD_PRODUCT_TO_CART_SUCCESS = "ADD_PRODUCT_TO_CART_SUCCESS";
const ADD_PRODUCT_TO_CART_FAILURE = "ADD_PRODUCT_TO_CART_FAILURE";
const REMOVE_PRODUCT_FROM_CART_REQUEST = "REMOVE_PRODUCT_FROM_CART_REQUEST";
const REMOVE_PRODUCT_FROM_CART_SUCCESS = "REMOVE_PRODUCT_FROM_CART_SUCCESS";
const REMOVE_PRODUCT_FROM_CART_FAILURE = "REMOVE_PRODUCT_FROM_CART_FAILURE";

const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
const fetchDataRequestWithParams = (params: string) => ({
  type: FETCH_DATA_REQUEST_WITH_PARAMS,
  params,
});
const fetchViewCartRequest = () => ({ type: FETCH_VIEW_CART });
const addProductToCartRequest = (productId: string) => ({
  type: ADD_PRODUCT_TO_CART_REQUEST,
  productId,
});
const removeProductFromCartRequest = (productId: string) => ({
  type: REMOVE_PRODUCT_FROM_CART_REQUEST,
  productId,
});

const fetchDataSuccess = (data: any) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});
const fetchDataFailure = (error: string) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});
const fetchViewCartSuccess = (data: any) => ({
  type: FETCH_VIEW_CART_SUCCESS,
  payload: data,
});
const fetchViewCartFailure = (error: string) => ({
  type: FETCH_VIEW_CART_FAILURE,
  payload: error,
});
const addProductToCartSuccess = (data: number) => ({
  type: ADD_PRODUCT_TO_CART_SUCCESS,
  payload: data,
});
const addProductToCartFailure = (error: string) => ({
  type: ADD_PRODUCT_TO_CART_FAILURE,
  payload: error,
});
const removeProductFromCartSuccess = (data: number) => ({
  type: REMOVE_PRODUCT_FROM_CART_SUCCESS,
  payload: data,
});
const removeProductFromCartFailure = (error: string) => ({
  type: REMOVE_PRODUCT_FROM_CART_FAILURE,
  payload: error,
});

function* fetchData(): Generator<
  | CallEffect<AxiosResponse<any>>
  | PutEffect<any>
  | AllEffect<AxiosResponse<any>>,
  void,
  AxiosResponse<any>
> {
  try {
    const response: AxiosResponse<any> = yield call(
      axios.get,
      "https://linkedin-cv-crawler.beta-limited.workers.dev/interview/products",
    );

    yield put(fetchDataSuccess(response?.data));
  } catch (error: any) {
    yield put(fetchDataFailure(error.message));
  }
}

function* fetchDataWithParams(
  action: any,
): Generator<
  | CallEffect<AxiosResponse<any>>
  | PutEffect<any>
  | AllEffect<AxiosResponse<any>>,
  void,
  AxiosResponse<any>
> {
  try {
    const { params } = action;
    const response: AxiosResponse<any> = yield call(
      axios.get,
      `https://linkedin-cv-crawler.beta-limited.workers.dev/interview/search?name=${params}`,
    );

    yield put(fetchDataSuccess(response?.data));
  } catch (error: any) {
    yield put(fetchDataFailure(error.message));
  }
}
function* fetchViewCart(): Generator<
  | CallEffect<AxiosResponse<any>>
  | PutEffect<any>
  | AllEffect<AxiosResponse<any>>,
  void,
  AxiosResponse<any>
> {
  try {
    const SessionId = getCurrentSettings();
    const response: AxiosResponse<any> = yield call(
      axios.get,
      `https://linkedin-cv-crawler.beta-limited.workers.dev/interview/view-cart`,
      {
        headers: {
          "Session-ID": SessionId,
        },
      },
    );

    yield put(fetchViewCartSuccess(response?.data));
  } catch (error: any) {
    yield put(fetchViewCartFailure(error.message));
  }
}
function* addProductToCart(
  action: any,
): Generator<
  | CallEffect<AxiosResponse<any>>
  | PutEffect<any>
  | AllEffect<AxiosResponse<any>>,
  void,
  AxiosResponse<any>
> {
  try {
    const { productId } = action;
    const SessionId = getCurrentSettings();
    const response: AxiosResponse<any> = yield call(
      axios.post,
      `https://linkedin-cv-crawler.beta-limited.workers.dev/interview/add-to-cart?id=${productId}`,
      null,
      {
        headers: {
          "Session-ID": SessionId,
        },
      },
    );

    yield put(addProductToCartSuccess(response?.data));
    yield put(fetchViewCartRequest());
  } catch (error: any) {
    yield put(addProductToCartFailure(error.message));
  }
}

function* removeProductFromCart(
  action: any,
): Generator<
  | CallEffect<AxiosResponse<any>>
  | PutEffect<any>
  | AllEffect<AxiosResponse<any>>,
  void,
  AxiosResponse<any>
> {
  try {
    const { productId } = action;
    const SessionId = getCurrentSettings();
    const response: AxiosResponse<any> = yield call(
      axios.post,
      `https://linkedin-cv-crawler.beta-limited.workers.dev/interview/subtract-from-cart?id=${productId}`,
      null,
      {
        headers: {
          "Session-ID": SessionId,
        },
      },
    );

    yield put(removeProductFromCartSuccess(response?.data));
    yield put(fetchViewCartRequest());
  } catch (error: any) {
    yield put(removeProductFromCartFailure(error.message));
  }
}

function* watchFetchData() {
  yield takeEvery(FETCH_DATA_REQUEST, fetchData);
}
function* watchFetchDataWithParams() {
  yield takeEvery(FETCH_DATA_REQUEST_WITH_PARAMS, fetchDataWithParams);
}
function* watchFetchViewCart() {
  yield takeEvery(FETCH_VIEW_CART, fetchViewCart);
}
function* watchAddProductToCart() {
  yield takeEvery(ADD_PRODUCT_TO_CART_REQUEST, addProductToCart);
}
function* watchRemoveProductFromCart() {
  yield takeEvery(REMOVE_PRODUCT_FROM_CART_REQUEST, removeProductFromCart);
}

function* rootSaga() {
  yield all([
    watchFetchDataWithParams(),
    watchFetchData(),
    watchFetchViewCart(),
    watchAddProductToCart(),
    watchRemoveProductFromCart(),
    watchCreateSession(),
  ]);
}

export {
  rootSaga,
  fetchDataRequest,
  fetchDataRequestWithParams,
  fetchViewCartRequest,
  fetchDataSuccess,
  fetchDataFailure,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST_WITH_PARAMS,
  FETCH_VIEW_CART,
  FETCH_VIEW_CART_SUCCESS,
  FETCH_VIEW_CART_FAILURE,
  ADD_PRODUCT_TO_CART_REQUEST,
  ADD_PRODUCT_TO_CART_SUCCESS,
  ADD_PRODUCT_TO_CART_FAILURE,
  REMOVE_PRODUCT_FROM_CART_REQUEST,
  REMOVE_PRODUCT_FROM_CART_SUCCESS,
  REMOVE_PRODUCT_FROM_CART_FAILURE,
  addProductToCartRequest,
  removeProductFromCartRequest,
};
