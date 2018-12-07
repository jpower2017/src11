import {
  GIFT_LOG_SEARCH,
  GIFT_LOG_ADD_ROWS,
  GIFT_LOG_SAVE_FORM
} from "../actions";

export const giftLog = (state = [], action) => {
  switch (action.type) {
    case GIFT_LOG_SEARCH:
      console.log("REDUCER GIFT_LOG_SEARCH ");
      console.table(action.payload);
      return {
        ...state,
        searchResults: action.payload
      };

    case GIFT_LOG_ADD_ROWS:
      console.log("REDUCER GIFT_LOG_ADD_ROWS");
      console.table(action.payload);
      return {
        ...state,
        [action.name]: [...action.payload]
      };
    case GIFT_LOG_SAVE_FORM:
      console.log("REDUCER GIFT_LOG_SAVE_FORM");
      return {
        ...state,
        [action.name]: state[action.name]
          ? [...state[action.name], action.payload]
          : [action.payload]
      };
    default:
      return {
        ...state
      };
  }
};
