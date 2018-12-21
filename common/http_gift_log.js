import { createApolloFetch } from "apollo-fetch";
import { Log } from "../utils/utils";

const uri = "/api/graphql";
export const getGiftEvents = (jwt, filter) => {
  let monthFilter = filter ? filter : "06";
  const query = `
  query giftEvents($eventMonth:String){
     GiftEvents(eventMonth:$eventMonth) {
      uuid
      active
      recurring
      addedDate
      eventDay
      eventMonth
      eventYear
      eventType
      notes
      registryStatus
      createdTimestamp
      eventPersons{
        uuid,
        firstName,
        lastName
      }
      eventGroups{
        uuid,
        name
      }
      eventOrganizations{
        uuid,
        name
      }
      eventAnimals{
        uuid,
        name
      }
      eventGiftRequests{
        uuid
      }
    }
  }
`;
  const variables = {
    eventMonth: monthFilter
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const searchPerson = (jwt, str) => {
  const query = `
  query searchPerson($searchText:String){
     SearchPerson(searchText:$searchText) {
      uuid,
      firstName,
      middleName,
      lastName,
      personalMobile,
      personalEmail,
      alternateEmail,
      gender,
      birthDate,
      birthSurname,
      legalFirstName,
      legalLastName,
      suffix,
      prefix,
      notes,
      deathDate
    }
  }
`;
  const variables = {
    searchText: str
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftEvent = (jwt, payload) => {
  console.log("HTTP createGiftEvent");
  let newPayload;
  const requiredPayload = {
    recurring: true,
    registryStatus: "Yes",
    active: true
  };
  newPayload = { ...requiredPayload, ...payload };
  const query = `
       mutation createGiftEvent($input:GiftEventInput) {
        CreateGiftEvent(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    input: newPayload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftRequest = (jwt, payload) => {
  console.log("HTTP createGiftRequest");
  /*
  const tempJSON = {
    registryStatus: `placeholder${Math.random()}`,
    requestNotes: `placeholder${Math.random()}`,
    active: true
  };
  */

  const query = `
       mutation createGiftRequest($input:GiftRequestInput) {
        CreateGiftRequest(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    input: payload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const updateGiftRequest = (jwt, uuid, payload) => {
  console.log("HTTP updateGiftRequest payload" + JSON.stringify(payload));
  console.log("HTTP updateGiftRequest uuid: " + uuid);
  const query = `
       mutation updateGiftRequest($giftRequestUUID:String,$input:GiftRequestInput) {
        UpdateGiftRequest(giftRequestUUID:$giftRequestUUID,input:$input) {
                   uuid
      }  }`;
  const variables = {
    giftRequestUUID: uuid,
    input: payload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftRequestPerson = (jwt, requestID, personID) => {
  console.log("HTTP createGiftRequestPerson " + [requestID, personID]);
  const query = `
       mutation createGiftRequestPerson($giftRequestUUID:String,$personUUID:String) {
        CreateGiftRequestPerson( giftRequestUUID:$giftRequestUUID,personUUID:$personUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftRequestUUID: requestID,
    personUUID: personID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftEventGiftRequest = (jwt, geiID, grID) => {
  console.log("HTTP createGiftEventGiftRequest gei, org " + [geiID, grID]);
  const query = `
       mutation createGiftEventGiftRequest($giftEventUUID:String,$giftRequestUUID:String) {
        CreateGiftEventGiftRequest(giftEventUUID:$giftEventUUID,giftRequestUUID:$giftRequestUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftEventUUID: geiID,
    giftRequestUUID: grID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const updateGiftEvent = (jwt, uuid, payload) => {
  console.log("HTTP updateGiftEvent payload" + JSON.stringify(payload));
  console.log("HTTP updateGiftEvent uuid: " + uuid);
  const query = `
       mutation updateGiftEvent($giftEventUUID:String,$input:GiftEventInput) {
        UpdateGiftEvent(giftEventUUID:$giftEventUUID,input:$input) {
                   uuid
      }  }`;
  const variables = {
    giftEventUUID: uuid,
    input: payload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const getGiftEvent = (jwt, id) => {
  const query = `
  query giftEvent($giftEventUUID:String){
     GiftEvent(giftEventUUID:$giftEventUUID) {
       uuid
       active
       recurring
       addedDate
       eventDay
       eventMonth
       eventYear
       eventType
       notes
       registryStatus
       createdTimestamp
      eventPersons{
        uuid,
        firstName,
        lastName,
        middleName,
        legalFirstName,
        legalLastName,
        personalMobile,
        personalEmail,
        alternateEmail,
        gender,
        birthDate,
        birthSurname,
        prefix,
        suffix,
        notes,
        deathDate
      }
      eventGroups{
        uuid,
        name,
        memberPersons{
          person {
            uuid
            firstName,
            lastName
          }
        }
      }
      eventOrganizations{
        uuid,
        name,
        employees{
          title,
          person{
            uuid,
            firstName,
            lastName
          }
        },
        memberGroups{
          group{
            uuid,
            name,
            category,
            memberGroups{
                group{
                  uuid,
                  name,
                  category
                }
            },
            memberPersons{
              notes,
              person{
                uuid,
                firstName,
                lastName
              }
            },
          }
        }
      }
      eventAnimals{
        uuid,
        name,
        type,
        notes
      }
      eventGiftRequests{
        uuid
        registryStatus
        requestNotes
        active
        requestGifts{
          giftYear,
          status,
          gift{
            uuid,
            value,
            description,
            giftNotes,
            sentiment,
            assignedTo,
            recipientPersons{
              uuid,
              firstName,
              lastName
            },
            recipientGroups{
              uuid,
              name
            },
            recipientOrganizations{
              uuid,
              name
            },
            recipientAnimals{
              uuid,
              name
            },
            delivery{
              uuid
              attentionTo
              deliveryContactNumber
              deliveryTrackingNumber
              confirmedDeliveryDate
              location{
                uuid
                name
                formattedAddress
              }
            }
            giftVendor{
              uuid
              orderStatus
              orderNumber
              orderDate
              vendorRepresentativeName
              vendorRepresentativePhone
              vendorRepresentativeEmail
              organization{
                uuid
                name
                contactNumber
              }
            }
          }
        }
        requestPersons{
          uuid,
          firstName,
          lastName
        }
        requestAnimals{
          uuid,
          name
        }
        requestOrganizations{
          uuid,
          category,
          name
        }
        requestGroups{
          uuid,
          name
        }
      }
    }
  }
`;
  const variables = {
    giftEventUUID: id
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const removeGiftRequest = (jwt, giftRequestUUID) => {
  console.log("HTTP removeGiftRequest");
  const query = `
       mutation removeGiftRequest($giftRequestUUID:String) {
        RemoveGiftRequest(giftRequestUUID:$giftRequestUUID)  }`;
  const variables = {
    giftRequestUUID: giftRequestUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};
