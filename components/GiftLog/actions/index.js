import * as HTTP_GIFT_LOG from "../../../common/http_gift_log";
import * as HTTP from "../../../common/http";
import * as R from "ramda";
import { data } from "../components/Geneology/data.js";

export const GIFT_LOG_SEARCH = "GLOG_SEARCH";
export const GIFT_LOG_ADD_ROWS = "GIFT_LOG_ADD_ROWS";
export const GIFT_LOG_SAVE_FORM = "GIFT_LOG_SAVE_FORM";
export const GIFT_LOG_UPDATE_FORM = "GIFT_LOG_UPDATE_FORM";
export const SET_CONFIG_GIFT_LOG2 = "SET_CONFIG_GIFT_LOG2";
export const SET_VAR_GIFT_LOG2 = "SET_VAR_GIFT_LOG2";
export const GIFT_LOG_ADD_GIFT_EVENTS = "GIFT_LOG_ADD_GIFT_EVENTS";
export const GIFT_LOG_UPDATE_GIFT_EVENT = "GIFT_LOG_UPDATE_GIFT_EVENT";

export const deleteRequest = id => async (dispatch, getState) => {
  console.log("ACTON deleteRequest id " + id);
  if (!id) {
    return;
  }
  const token = getState().notifications.token;
  const removeGiftRequest = await HTTP_GIFT_LOG.removeGiftRequest(token, id);
  const currentGiftEvent = getState().giftLog.currentGiftEvent;
  dispatch(setVar("currentGiftRequest", null));
  dispatch(loadGiftEvent(currentGiftEvent));
};

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

export const updateForm = (obj, ky) => ({
  type: GIFT_LOG_UPDATE_FORM,
  payload: obj,
  name: ky
});
export const updateGiftEvent = obj => ({
  type: GIFT_LOG_UPDATE_GIFT_EVENT,
  payload: obj
});

const addEventDayMonthYear = val => {
  console.table(val);
  try {
    let eventMonth = val.eventDate.split("/")[0];
    eventMonth = eventMonth.length == 2 ? eventMonth : `0${eventMonth}`;
    let eventDay = val.eventDate.split("/")[1];
    eventDay = eventDay.length == 2 ? eventDay : `0${eventDay}`;
    let eventYear = val.eventDate.split("/")[2];
    let temp = {
      ...val,
      eventMonth: eventMonth,
      eventDay: eventDay,
      eventYear: eventYear
    };
    console.table(temp);
    return {
      ...val,
      eventMonth: eventMonth,
      eventDay: eventDay,
      eventYear: eventYear
    };
  } catch (err) {
    console.log("ERROR MSG " + err.message);
  }
};
const loadGiftEvent = (id, obj = null) => async (dispatch, getState) => {
  const token = getState().notifications.token;
  const ge = await HTTP_GIFT_LOG.getGiftEvent(token, id);
  console.table(ge.GiftEvent);
  dispatch(updateGiftEvent(ge.GiftEvent, "giftEvents"));
};
export const rowSubmit = (id, obj = null) => async (dispatch, getState) => {
  dispatch(loadGiftEvent(id));
  dispatch(setVar("currentGiftEvent", id));
};

/* httpPayload needs eventDay,mo,year(returns uuid),  localPayload needs UUID,    */
export const saveFormGE = (payload, ky) => async (dispatch, getState) => {
  let newPayload, ge;
  const token = getState().notifications.token;
  const currentGiftEvent = getState().giftLog.currentGiftEvent;
  newPayload = R.omit(["eventDate"], addEventDayMonthYear(payload));
  if (!currentGiftEvent) {
    ge = await HTTP_GIFT_LOG.createGiftEvent(token, newPayload);
    dispatch(setVar("currentGiftEvent", R.prop("uuid", ge.CreateGiftEvent)));
    newPayload = { ...newPayload, uuid: R.prop("uuid", ge.CreateGiftEvent) };
    dispatch(saveForm(newPayload, ky));
  } else {
    ge = await HTTP_GIFT_LOG.updateGiftEvent(
      token,
      currentGiftEvent,
      newPayload
    );
    newPayload = { ...newPayload, uuid: currentGiftEvent };
    dispatch(updateForm(newPayload, ky));
  }
};
export const saveFormRequest = payload => async (dispatch, getState) => {
  let newPayload, gr;
  console.log("ACTION saveFormRequest f");
  const token = getState().notifications.token;
  const currentGiftEvent = getState().giftLog.currentGiftEvent;
  const currentGiftRequest = getState().giftLog.currentGiftRequest;
  if (!currentGiftRequest) {
    gr = await HTTP_GIFT_LOG.createGiftRequest(token, payload);
    let id = R.prop("uuid", gr.CreateGiftRequest);
    dispatch(setVar("currentGiftRequest", R.prop("uuid", id)));
    let newAttach = await HTTP_GIFT_LOG.createGiftEventGiftRequest(
      token,
      currentGiftEvent,
      id
    );
  } else {
    gr = await HTTP_GIFT_LOG.updateGiftRequest(
      token,
      currentGiftRequest,
      payload
    );
    //newPayload = { ...payload, uuid: currentGiftRequest };
    //  dispatch(updateForm(newPayload, ky));
  }

  dispatch(loadGiftEvent(currentGiftEvent));
};

export const assocRecipientRequest = recipientID => async (
  dispatch,
  getState
) => {
  console.log("ACTION assocRecipientRequest " + recipientID);
  const token = getState().notifications.token;
  const currentGiftRequest = getState().giftLog.currentGiftRequest;
  let c = HTTP_GIFT_LOG.createGiftRequestPerson(
    token,
    currentGiftRequest,
    recipientID
  );
};

export const loadConfigs = () => async (dispatch, getState) => {
  console.log("loadConfigs");
  const token = getState().notifications.token;
  let temp = await HTTP.getModuleConfig(token, "Gift Log");
  let enums = temp.ModuleConfiguration.enumerations;

  let et = R.find(x => x.name == "Event Type", enums);
  let etValues = et.metaValues;
  dispatch(setConfig("eventTypes", etValues));

  let pas = R.find(x => x.name === "Personal Assistant", enums);
  let pasValues = pas.metaValues;
  let counter = 2;
  let changeObj = obj => {
    return { ...obj, title: obj.name, value: counter++ };
  };
  /* change order...unknown first */

  pasValues = R.map(x => changeObj(x), pasValues);
  pasValues = [...pasValues, { name: "Unknown", value: 1, title: "Unknown" }];
  dispatch(setConfig("personalAssistants", pasValues));

  let animalTypes = R.find(x => x.name === "Animal Type", enums);
  let animalTypesValues = animalTypes.metaValues;
  counter = 0;
  animalTypesValues = R.map(x => changeObj(x), animalTypesValues);
  dispatch(setConfig("animalTypes", animalTypesValues));
};

export const setConfig = (name, payload) => ({
  type: SET_CONFIG_GIFT_LOG2,
  payload: payload,
  name: name
});
export const setVar = (name, payload) => ({
  type: SET_VAR_GIFT_LOG2,
  payload: payload,
  name: name
});

export const addGiftEvents = payload => ({
  type: GIFT_LOG_ADD_GIFT_EVENTS,
  payload: payload
});
export const getDataForComp = (filter = "12") => async (dispatch, getState) => {
  console.log("ACTION GETDATA FOR COMP");
  let mainFilter;
  const token = getState().notifications.token;
  mainFilter = filter ? filter : getState().glogInput.mainFilter;
  dispatch(setVar("loading", true));
  console.time("http-get-events");
  const ge = await HTTP_GIFT_LOG.getGiftEvents(token, mainFilter);
  console.timeEnd("http-get-events");
  dispatch(setVar("loading", false));
  //  dispatch(saveForm(ge.GiftEvents, "giftEvents"));
  dispatch(addGiftEvents(ge.GiftEvents));
};

/*//////////////////////////////////////////*/
