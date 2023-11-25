import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsSlice";
import authReducer from "./reducers/authSlice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./api/sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
