import * as HTTP_GIFT_LOG from "../../../common/http_gift_log";
import * as HTTP from "../../../common/http";
import * as R from "ramda";
import { data } from "../components/Geneology/data/data.js";
import {
  addObjChild,
  addObjParent,
  addObjPartner,
  addObjMain
} from "../common/utils";

export const GIFT_LOG_SEARCH = "GLOG_SEARCH";
export const GIFT_LOG_ADD_ROWS = "GIFT_LOG_ADD_ROWS";
export const GIFT_LOG_MERGE_ROW = "GIFT_LOG_MERGE_ROW";
export const GIFT_LOG_SAVE_FORM = "GIFT_LOG_SAVE_FORM";
export const GIFT_LOG_UPDATE_FORM = "GIFT_LOG_UPDATE_FORM";
export const SET_CONFIG_GIFT_LOG2 = "SET_CONFIG_GIFT_LOG2";
export const SET_VAR_GIFT_LOG2 = "SET_VAR_GIFT_LOG2";
export const GIFT_LOG_ADD_GIFT_EVENTS = "GIFT_LOG_ADD_GIFT_EVENTS";
export const GIFT_LOG_UPDATE_GIFT_EVENT = "GIFT_LOG_UPDATE_GIFT_EVENT";

export const parentChildRelationship = (parent, child, addRemove) => async (
  dispatch,
  getState
) => {
  console.log("parentChildRelationship " + addRemove);
  let relationship, row;
  const token = getState().notifications.token;
  const p1 = R.find(x => x.uuid === parent, getState().giftLog.geneology);
  const p2 = R.find(x => x.uuid === child, getState().giftLog.geneology);
  const parentUUID = p1.generation < p2.generation ? p1.uuid : p2.uuid;
  const childUUID = parentUUID === parent ? child : parent;
  if (addRemove === "remove") {
    relationship = await HTTP_GIFT_LOG.removePersonParent(
      token,
      childUUID,
      parentUUID
    );
    row = R.find(x => x.uuid === parentUUID, getState().giftLog.geneology);
    console.table(row);
    row.children = R.without([childUUID], row.children);
    console.table(row);
  } else {
    relationship = await HTTP_GIFT_LOG.createPersonParent(
      token,
      childUUID,
      parentUUID
    );
    row = R.find(x => x.uuid === parentUUID, getState().giftLog.geneology);
    console.table(row);
    row.children.push(childUUID);
    console.table(row);
  }
  dispatch(updateForm(row, "geneology"));
};

const addGeneology = (person, typ, selectedUUID = null) => async (
  dispatch,
  getState
) => {
  console.log("ACTION addGeneology typ uuid  " + [typ, selectedUUID]);
  console.table(person);
  let selectedGeneologyRow;
  const selectedPerson = selectedUUID
    ? selectedUUID
    : getState().giftLog.selectedPerson;
  try {
    selectedGeneologyRow = R.find(
      x => x.uuid === selectedPerson,
      getState().giftLog.geneology
    );
  } catch (e) {
    console.log("CATCH " + e.message);
  }
  const callF = {
    parent: addObjParent,
    child: addObjChild,
    partner: addObjPartner
  };

  const { firstName, lastName, gender, uuid } = person;
  const generation = () => {
    let g;
    try {
      g = R.prop("generation", selectedGeneologyRow);
    } catch (e) {
      console.log("CATCH: " + e.message);
      g = 3;
    }
    g = typ == "child" ? g + 1 : typ == "parent" ? g - 1 : g;
    return g;
  };

  if (typ === "main") {
    console.log(typ);
    dispatch(
      saveForm(addObjMain(person, selectedPerson, generation()), "geneology")
    );
    console.log("SET SELECTED PERSON " + uuid);
    dispatch(setVar("selectedPerson", uuid));
    let arrMainPersons = [];
    try {
      arrMainPersons = R.uniq([...getState().giftLog.mainPersons, uuid]);
    } catch (e) {
      console.log("CATCH " + e.message);
      arrMainPersons = [uuid];
    }
    dispatch(setVar("mainPersons", arrMainPersons));
    return;
  }
  /* handle adding child to parent.children array */
  if (typ === "child") {
    console.log(typ);
    selectedGeneologyRow.children.push(uuid);
    dispatch(updateForm(selectedGeneologyRow, "geneology"));
  }
  dispatch(
    mergeRow("geneology", callF[typ](person, selectedPerson, generation()))
  );
  console.log("end");
};

export const partnerRelationship = (addRemove, otherUUID, mainUUID) => async (
  dispatch,
  getState
) => {
  console.log("ACTION partnerRelationship");
  const token = getState().notifications.token;
  const mainRow = R.find(
    x => x.uuid === mainUUID,
    getState().giftLog.geneology
  );
  const otherRow = R.find(
    x => x.uuid === otherUUID,
    getState().giftLog.geneology
  );
  switch (addRemove) {
    case "add":
      console.log("ACTION ADD PARTNER");
      const createPartner = await HTTP_GIFT_LOG.createPersonPartner(
        token,
        mainUUID,
        otherUUID
      );
      mainRow.partners.push(otherUUID);
      console.table(mainRow);
      dispatch(updateForm(mainRow, "geneology"));
      break;
    case "remove":
      console.log("ACTION REMOVE PARTNER");
      const removePartner = await HTTP_GIFT_LOG.removePersonPartner(
        token,
        mainUUID,
        otherUUID
      );

      mainRow.partners = R.without([otherUUID], mainRow.partners);
      console.table(mainRow);
      dispatch(updateForm(mainRow, "geneology"));
      otherRow.partners = R.without([mainUUID], otherRow.partners);
      console.table(otherRow);
      dispatch(updateForm(otherRow, "geneology"));
      break;
  }
};

export const addRelatives = uuid => async (dispatch, getState) => {
  console.log("ACTION addRelatives uuid " + uuid);
  const token = getState().notifications.token;
  let person = await HTTP_GIFT_LOG.getPerson(token, uuid);
  console.table(person.Person);
  person = person.Person;
  console.table(person.parents);
  R.map(x => dispatch(addGeneology(x, "parent", uuid)), person.parents);
  console.table(person.children);
  R.map(x => dispatch(addGeneology(x, "child", uuid)), person.children);
  console.table(person.partners);
  R.map(
    x => dispatch(addGeneology(x.person, "partner", uuid)),
    person.partners
  );
};

export const selectedRowAndType = (id, typ, partyType = "person") => async (
  dispatch,
  getState
) => {
  console.log("ACTION selectedRowAndType uuid typ  " + [id, typ]);
  const token = getState().notifications.token;
  const searchResults = getState().giftLog.searchResults;
  const selectedPerson = getState().giftLog.selectedPerson;
  const selectedRow = R.find(x => x.uuid == id, searchResults);
  const currentGiftEvent = getState().giftLog.currentGiftEvent;
  let createMain;

  dispatch(addGeneology(selectedRow, typ));
  switch (typ) {
    case "main":
      switch (partyType) {
        case "person":
          createMain = await HTTP_GIFT_LOG.createGiftEventPerson(
            token,
            currentGiftEvent,
            id
          );
          break;
        case "group":
          createMain = await HTTP_GIFT_LOG.createGiftEventGroup(
            token,
            currentGiftEvent,
            id
          );
          break;
        case "org":
          createMain = await HTTP_GIFT_LOG.createGiftEventOrganization(
            token,
            currentGiftEvent,
            id
          );
          break;
      }

      /* HTTP CREATEGE Group and ORg */
      console.table(createMain);
      break;
    case "child":
      const createChild = await HTTP_GIFT_LOG.createPersonParent(
        token,
        id,
        selectedPerson
      );
      console.table(createChild);
      break;
    case "parent":
      const createParent = await HTTP_GIFT_LOG.createPersonParent(
        token,
        selectedPerson,
        id
      );
      console.table(createParent);
      break;
    case "partner":
      const createPartner = await HTTP_GIFT_LOG.createPersonPartner(
        token,
        selectedPerson,
        id
      );
      console.table(createPartner);
      break;
  }
  if (partyType === "person") {
    const person = await HTTP_GIFT_LOG.getPerson(token, selectedPerson);
    console.table(person.Person);
  }
};

export const mergeRow = (name, payload) => ({
  type: GIFT_LOG_MERGE_ROW,
  payload: payload,
  name: name
});

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
  if (str == "") {
    return;
  }
  if (str.length < 3) {
    return;
  }
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

export const searchGroupOrg = (str = "") => async (dispatch, getState) => {
  console.log("ACTION searchGroup " + str);

  if (str == "") {
    return;
  }
  if (str.length < 3) {
    return;
  }
  const token = getState().notifications.token;
  let newSearchGroup = await HTTP_GIFT_LOG.searchGroup(token, str);
  let newSearchOrg = await HTTP_GIFT_LOG.searchOrganization(token, str);
  console.table(newSearchGroup);
  console.table(newSearchOrg);

  const combinedData = (groups, orgs) => {
    console.log("combinedData");
    console.log(R.isEmpty(groups));
    console.log(R.isEmpty(orgs));
    let data = [];
    const addPartyType = (obj, partyType) => {
      return { ...obj, partyType: partyType };
    };
    data.push(R.map(x => addPartyType(x, "group"), groups));
    data.push(R.map(x => addPartyType(x, "org"), orgs));
    console.table(R.flatten(data));
    return R.flatten(data);
  };

  console.table(
    combinedData(newSearchGroup.SearchGroup, newSearchOrg.SearchOrganization)
  );
  dispatch(
    searchText(
      combinedData(newSearchGroup.SearchGroup, newSearchOrg.SearchOrganization)
    )
  );
};

export const search = (str = "", searchType = "person") => async (
  dispatch,
  getState
) => {
  const node = getState().glogInput.node;
  console.log("ACTION searc  str length : " + str.length);
  if (str == "") {
    return;
  }
  if (searchType === "person") {
    dispatch(searchPerson(str));
  } else if (searchType == "groupOrg") {
    dispatch(searchGroupOrg(str));
  }
};
/*
export const sendData2 = () => ({
  type: GIFT_LOG_ADD_ROWS,
  payload: data,
  name: "geneology"
});
export const sendData = () => async (dispatch, getState) => {
  dispatch(setVar("selectedPerson", `45fe78d5-1229-4ff1-aad5-c6f6dc814fe2`));
  dispatch(sendData2());
};
*/

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

const loadGiftEvent = (id, obj = null) => async (dispatch, getState) => {
  const token = getState().notifications.token;
  console.log("giftevent uuid " + id);
  const ge = await HTTP_GIFT_LOG.getGiftEvent(token, id);
  dispatch(updateGiftEvent(ge.GiftEvent, "giftEvents"));
  console.table(ge.GiftEvent.eventPersons);
  /* CLEAR OUT DUPLICATES */
  try {
    console.table(getState().giftLog.geneology);
    dispatch(setVar("geneology", R.uniq(getState().giftLog.geneology)));
    console.table(getState().giftLog.geneology);
  } catch (e) {
    console.log("CATCH " + e.message);
  }
  const addPartyType = (obj, partyType) => {
    return { ...obj, partyType: partyType };
  };
  R.map(x => dispatch(addGeneology(x, "main")), ge.GiftEvent.eventPersons);
  R.map(
    x => dispatch(addGeneology(x, "main")),
    R.map(x => addPartyType(x, "group"), ge.GiftEvent.eventGroups)
  );
  R.map(
    x => dispatch(addGeneology(x, "main")),
    R.map(x => addPartyType(x, "org"), ge.GiftEvent.eventOrganizations)
  );
};
/* submit GIFTEVENT ROW */
export const rowSubmit = (id, obj = null) => async (dispatch, getState) => {
  dispatch(loadGiftEvent(id));
  dispatch(setVar("currentGiftEvent", id));
};

/* httpPayload needs eventDay,mo,year(returns uuid),  localPayload needs UUID,    */
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
  console.table(payload);
  const token = getState().notifications.token;
  const currentGiftEvent = getState().giftLog.currentGiftEvent;
  const currentGiftRequest = getState().giftLog.currentGiftRequest;
  if (!currentGiftRequest) {
    console.log("!currentGiftRequest");
    gr = await HTTP_GIFT_LOG.createGiftRequest(token, payload);
    let id = R.prop("uuid", gr.CreateGiftRequest);
    dispatch(setVar("currentGiftRequest", R.prop("uuid", id)));
    let newAttach = await HTTP_GIFT_LOG.createGiftEventGiftRequest(
      token,
      currentGiftEvent,
      id
    );
  } else {
    console.log("is currentGiftRequest");
    gr = await HTTP_GIFT_LOG.updateGiftRequest(
      token,
      currentGiftRequest,
      R.pick(["requestNotes", "active", "registryStatus"], payload)
    );
  }
  console.log("currentGiftevent1 " + currentGiftEvent);
  dispatch(loadGiftEvent(currentGiftEvent));
};

export const assocRecipientRequest = (recipientID, obj) => async (
  dispatch,
  getState
) => {
  console.log("ACTION assocRecipientRequest " + recipientID);
  console.table(obj);
  //  let test = getState().giftLog.getCurrentRequestPersons();
  let c, contains;
  const token = getState().notifications.token;
  const currentGiftRequest = getState().giftLog.currentGiftRequest;
  const currentGiftEvent = getState().giftLog.currentGiftEvent;
  const objGE = R.find(
    x => x.uuid === currentGiftEvent,
    getState().giftLog.giftEvents
  );
  console.table(objGE);
  const objGR = R.find(
    x => x.uuid === currentGiftRequest,
    objGE.eventGiftRequests
  );

  /* if partyType is null that equals 'person */
  //  if (R.isNil(obj.partyType)) {
  let selectedType = !obj.hasOwnProperty("partyType")
    ? "person"
    : obj.partyType;

  let types = [
    {
      name: "person",
      create: HTTP_GIFT_LOG.createGiftRequestPerson,
      remove: HTTP_GIFT_LOG.removeGiftRequestPerson,
      recipientGE: "requestPersons"
    },
    {
      name: "org",
      create: HTTP_GIFT_LOG.createGiftRequestOrganization,
      remove: HTTP_GIFT_LOG.removeGiftRequestOrganization,
      recipientGE: "requestOrganizations"
    },
    {
      name: "group",
      create: HTTP_GIFT_LOG.createGiftRequestGroup,
      remove: HTTP_GIFT_LOG.removeGiftRequestGroup,
      recipientGE: "requestGroups"
    }
  ];
  const findObj = name => {
    return R.find(x => x.name === name, types);
  };

  let requestParty = R.map(
    x => x.uuid,
    R.prop(R.prop("recipientGE", findObj(selectedType)), objGR)
  );
  console.table(requestParty);
  console.log(recipientID);
  contains = R.contains(recipientID, requestParty);
  const callF = (f, arg1, arg2, arg3) => {
    f(arg1, arg2, arg3);
  };
  if (!contains) {
    console.log("notcontains");
    callF(
      R.prop("create", findObj(selectedType)),
      token,
      currentGiftRequest,
      recipientID
    );
  } else {
    console.log(" contains");
    callF(
      R.prop("remove", findObj(selectedType)),
      token,
      currentGiftRequest,
      recipientID
    );
  }
  dispatch(loadGiftEvent(currentGiftEvent));
};

export const loadConfigs = () => async (dispatch, getState) => {
  console.log("loadConfigs");
  const token = getState().notifications.token;
  let temp = await HTTP.getModuleConfig(token, "Gift Log");
  let enums = temp.ModuleConfiguration.enumerations;
  try {
    let re = R.find(x => x.name == "Recurring Events", enums);
    let ie = R.find(x => x.name == "Incidental Events", enums);
    const addEnumType = (rows, typ) => {
      const makeRow = row => ({ ...row, type: typ });
      return R.map(row => makeRow(row), rows);
    };
    let etValues = [
      ...addEnumType(re.metaValues, "recurring"),
      ...addEnumType(ie.metaValues, "incidental")
    ];
    dispatch(setConfig("eventTypes", etValues));
  } catch (e) {
    console.log("NO EVENT ENUM...try RECURRING/INCIDENDTAL ENUM");
  }

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
export const getGiftEventsByMonth = (filter = "12") => async (
  dispatch,
  getState
) => {
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

export const saveFormGift = payload => async (dispatch, getState) => {
  let newPayload, gr, newItem, id;
  console.log("ACTION saveFormGift f");
  console.table(payload);

  const token = getState().notifications.token;
  const currentGiftEvent = getState().giftLog.currentGiftEvent;
  const giftEvents = getState().giftLog.giftEvents;
  console.table(giftEvents);
  const currentGiftRequest = getState().giftLog.currentGiftRequest;

  const tempJSON = {
    value: 1,
    description: `placeholder`,
    giftNotes: ""
  };
  /* CHECK CURRENT GIFT REQUEST FOR CURRENT GIFT---HAS GIFT WITH DESCRIPTION AS PLACE HOLDER*/
  const ge = R.find(x => x.uuid === currentGiftEvent, giftEvents);
  console.log(currentGiftEvent);
  console.table(ge);

  /*
  const assign = R.path(
    ["eventGiftRequests", 0, "requestGifts", 0, "gift", "assignedTo"],
    ge
  );
 */
  const giftExists = ge => {
    const { eventGiftRequests } = ge;
    console.log(
      R.prop(
        "uuid",
        R.find(x => x.uuid === currentGiftRequest, eventGiftRequests)
      )
    );
    const gr = R.find(x => x.uuid === currentGiftRequest, eventGiftRequests);
    const giftID = R.path(["requestGifts", 0, "gift", "uuid"], gr);
    return giftID;
  };

  const combineObj = { ...tempJSON, ...payload };
  console.table(combineObj);
  console.log(giftExists(ge));
  id = giftExists(ge);
  if (!giftExists(ge)) {
    newItem = await HTTP_GIFT_LOG.createGift(token, combineObj);
    id = R.prop("uuid", newItem.CreateGift);
    console.log("newGift uuid " + R.prop("uuid", newItem.CreateGift));
    await HTTP_GIFT_LOG.createGiftRequestGift(token, currentGiftRequest, id, {
      giftYear: "2019"
    });
    /* HACK createGift does not attach 'assignedTo'   */
    newItem = await HTTP_GIFT_LOG.updateGift(token, id, combineObj);
  } else {
    newItem = await HTTP_GIFT_LOG.updateGift(token, id, combineObj);
  }

  dispatch(loadGiftEvent(currentGiftEvent));
};

/*//////////////////////////////////////////*/
