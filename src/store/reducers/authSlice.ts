import {
  CREATE_SESSION_REQUEST,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_FAILURE,
} from "../api/authsagas";

type State = {
  data: any | null;
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  data: null,
  loading: false,
  error: null,
};

const reducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case CREATE_SESSION_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_SESSION_SUCCESS:
      localStorage.setItem("betaUserData", JSON.stringify(action.payload));
      return { ...state, loading: false, data: JSON.stringify(action.payload) };

    case CREATE_SESSION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
