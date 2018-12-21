import * as R from "ramda";
import {
  GIFT_LOG_SEARCH,
  GIFT_LOG_ADD_ROWS,
  GIFT_LOG_SAVE_FORM,
  GIFT_LOG_UPDATE_FORM,
  SET_CONFIG_GIFT_LOG2,
  SET_VAR_GIFT_LOG2,
  GIFT_LOG_ADD_GIFT_EVENTS,
  GIFT_LOG_UPDATE_GIFT_EVENT
} from "../actions";

const tweakData = obj => {
  //console.log("tweakData");
  const addKeyID = obj => {
    return { id: obj.uuid, ...obj, type: "requests" };
  };
  const combineRecipients = obj => {
    const changeKey = (obj, type) => {
      return { id: obj.uuid, type: type };
    };
    //  console.log("ACTION combineRecipients");
    let people = R.map(x => changeKey(x, "people"), obj.eventPersons);
    let groups = R.map(x => changeKey(x, "groups"), obj.eventGroups);
    let orgs = R.map(x => changeKey(x, "orgs"), obj.eventOrganizations);
    let animals = R.map(x => changeKey(x, "animals"), obj.eventAnimals);
    return Array.prototype.concat(people, groups, orgs, animals);
  };
  return {
    ...obj,
    //  eventType: [obj.eventType],
    id: obj.uuid,
    eventDate: `${obj.eventMonth}/${obj.eventDay}`,
    recipients: combineRecipients(obj),
    //giftHistory: [],
    //requests: R.map(x => addKeyID(x), obj.eventGiftRequests),
    eventMonth: `${obj.eventMonth}`,
    recurring: [obj.recurring],
    registryStatus: obj.registryStatus
  };
};

export const giftLog = (state = [], action) => {
  let uuid, otherRows;
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
    case GIFT_LOG_ADD_GIFT_EVENTS:
      return {
        ...state,
        giftEvents: R.uniq([...R.map(x => tweakData(x), action.payload)])
      };
    case GIFT_LOG_UPDATE_GIFT_EVENT:
      console.log("REDUCER GIFT_LOG_UPDATE_GIFT_EVENT");
      uuid = R.prop("uuid", action.payload);
      otherRows = R.filter(x => x.uuid !== uuid, state["giftEvents"]);
      return {
        ...state,
        giftEvents: [...otherRows, tweakData(action.payload)]
      };

    case GIFT_LOG_SAVE_FORM:
      console.log("REDUCER GIFT_LOG_SAVE_FORM");
      return {
        ...state,
        [action.name]: state[action.name]
          ? [...state[action.name], action.payload]
          : [action.payload]
      };
    case GIFT_LOG_UPDATE_FORM:
      console.log("REDUCER GIFT_LOG_UPDATE_FORM");
      uuid = R.prop("uuid", action.payload);
      console.log("RDUCER uuid " + uuid);
      otherRows = R.filter(x => x.uuid !== uuid, state[action.name]);
      return {
        ...state,
        [action.name]: [...otherRows, action.payload]
      };
    case SET_CONFIG_GIFT_LOG2:
      return {
        ...state,
        [action.name]: action.payload
      };
    case SET_VAR_GIFT_LOG2:
      return {
        ...state,
        [action.name]: action.payload
      };
    default:
      return {
        ...state,
        currentGiftEvent: state.currentGiftEvent ? state.currentGiftEvent : null
      };
  }
};

export const getRequests = state => {
  console.log("REDUCER getRequests");
  console.table(state);
  console.table(state.giftLog);
  const appData = state.giftLog;
  console.log(appData.currentGiftEvent);
  console.table(appData.giftEvents);
  console.table(
    R.find(x => x.uuid == appData.currentGiftEvent, appData.giftEvents)
  );
  let ge = R.find(x => x.uuid == appData.currentGiftEvent, appData.giftEvents);
  console.table(ge.eventGiftRequests);
  return ge.eventGiftRequests;
};
export const getCurrentGiftEvent = state => {
  console.log("REDUCER getCurrentGiftEvent");
  console.table(state);
  console.table(state.giftLog);
  const appData = state.giftLog;
  if (!appData.currentGiftEvent) {
    return {};
  }
  let ge = R.find(x => x.uuid == appData.currentGiftEvent, appData.giftEvents);
  return ge;
};
export const getCurrentRequest = state => {
  console.log("REDUCER getCurrentRequest");
  const appData = state.giftLog;
  console.log(appData.currentGiftEvent);
  console.log(appData.currentGiftRequest);
  if (!appData.currentGiftRequest) {
    return [];
  }
  console.table(
    R.find(x => x.uuid == appData.currentGiftEvent, appData.giftEvents)
  );
  let ge = R.find(x => x.uuid == appData.currentGiftEvent, appData.giftEvents);
  console.log(
    JSON.stringify(
      R.find(x => x.uuid == appData.currentGiftRequest, ge.eventGiftRequests)
    )
  );
  return R.find(
    x => x.uuid == appData.currentGiftRequest,
    ge.eventGiftRequests
  );
};
