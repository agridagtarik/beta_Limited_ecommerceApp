import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_VIEW_CART,
  FETCH_VIEW_CART_SUCCESS,
  FETCH_VIEW_CART_FAILURE,
  ADD_PRODUCT_TO_CART_REQUEST,
  ADD_PRODUCT_TO_CART_SUCCESS,
  ADD_PRODUCT_TO_CART_FAILURE,
  REMOVE_PRODUCT_FROM_CART_REQUEST,
  REMOVE_PRODUCT_FROM_CART_SUCCESS,
  REMOVE_PRODUCT_FROM_CART_FAILURE,
} from "../api/sagas";

type State = {
  data: any | null;
  loading: boolean;
  error: string | null;
  cart: any | null;
  addProductToCart: any | null;
  removeProductFromCart: any | null;
};

const initialState: State = {
  data: null,
  loading: false,
  error: null,
  cart: null,
  addProductToCart: null,
  removeProductFromCart: null,
};

const reducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_VIEW_CART:
      return { ...state, loading: true, error: null };
    case FETCH_VIEW_CART_SUCCESS:
      return { ...state, loading: false, cart: action.payload };
    case FETCH_VIEW_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_PRODUCT_TO_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_PRODUCT_TO_CART_SUCCESS:
      return { ...state, loading: false, addProductToCart: action.payload };
    case ADD_PRODUCT_TO_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case REMOVE_PRODUCT_FROM_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case REMOVE_PRODUCT_FROM_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        removeProductFromCart: action.payload,
      };
    case REMOVE_PRODUCT_FROM_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default reducer;
