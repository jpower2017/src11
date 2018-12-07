import * as HTTP_GIFT_LOG from "../../../common/http_gift_log";
import * as R from "ramda";
import { data } from "../components/Geneology/data.js";

export const GIFT_LOG_SEARCH = "GLOG_SEARCH";
export const GIFT_LOG_ADD_ROWS = "GIFT_LOG_ADD_ROWS";
export const GIFT_LOG_SAVE_FORM = "GIFT_LOG_SAVE_FORM";

export const searchPerson = (str = "") => async (dispatch, getState) => {
  console.log("ACTION searchPerson " + str);

  console.log("str length " + str.length);
  const token = getState().notifications.token;
  let newSearch = await HTTP_GIFT_LOG.searchPerson(token, str);
  console.table(newSearch);
  //let peps = R.map(x => changeLabel(x), newSearch.SearchPerson);
  dispatch(searchText(newSearch.SearchPerson));
};

export const searchText = arr => ({
  type: GIFT_LOG_SEARCH,
  payload: arr
});

export const sendData = () => ({
  type: GIFT_LOG_ADD_ROWS,
  payload: data,
  name: "geneology"
});

export const saveForm = (obj, ky) => ({
  type: GIFT_LOG_SAVE_FORM,
  payload: obj,
  name: ky
});
