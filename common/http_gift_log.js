import { createApolloFetch } from "apollo-fetch";
import { Log } from "../utils/utils";

const uri = "/api/graphql";

export const createPersonParent = (jwt, personID, parentID) => {
  console.log("HTTP createPersonParent " + [personID, parentID]);
  const query = `
       mutation createPersonParent( $personUUID:String, $parentUUID:String) {
        CreatePersonParent(personUUID:$personUUID,parentUUID:$parentUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    personUUID: personID,
    parentUUID: parentID
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

export const createPersonPartner = (jwt, personID, partnerID, payload = {}) => {
  console.log("HTTP createPersonPartner " + [personID, partnerID]);
  const query = `
       mutation createPersonPartner( $personUUID:String, $partnerUUID:String,$input:PartnerInput) {
        CreatePersonPartner( personUUID:$personUUID,partnerUUID:$partnerUUID,input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    personUUID: personID,
    partnerUUID: partnerID,
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

export const updatPersonPartner = (jwt, personUUID, partnerUUID, payload) => {
  console.log("HTTP updatPersonPartner payload" + JSON.stringify(payload));
  const query = `
       mutation updatPersonPartner($personUUID:String, $partnerUUID:String, $input:PartnerInput) {
        UpdatPersonPartner(personUUID:$personUUID, partnerUUID:$partnerUUID ,input:$input) {
                   uuid
      }  }`;
  const variables = {
    personUUID: personUUID,
    partnerUUID: partnerUUID,
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

export const removePersonPartner = (jwt, personUUID, partnerUUID) => {
  console.log("HTTP removePersonPartner " + [personUUID, partnerUUID]);
  const query = `
       mutation removePersonPartner( $personUUID:String,$partnerUUID:String) {
        RemovePersonPartner(  personUUID:$personUUID,partnerUUID:$partnerUUID)
    }
    `;
  const variables = {
    personUUID: personUUID,
    partnerUUID: partnerUUID
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

export const removePersonParent = (jwt, personUUID, parentUUID) => {
  console.log("HTTP removePersonParent " + [personUUID, parentUUID]);
  const query = `
       mutation removePersonParent( $personUUID:String,$parentUUID:String) {
        RemovePersonParent(  personUUID:$personUUID,parentUUID:$parentUUID)
    }
    `;
  const variables = {
    personUUID: personUUID,
    parentUUID: parentUUID
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

/////////////////////////////////////////////////////////////////////////////////

export const getPerson = (jwt, personUUID) => {
  const query = `
    query Person($personUUID:String){
      Person(personUUID:$personUUID){
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
        deathDate,
        parents{
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
        },
        children{
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
        },
        partners{
          person{
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
      }
    }

  `;
  const variables = {
    personUUID: personUUID
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

export const getPersonGeneology = (jwt, str) => {
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
      deathDate,
      parents{
        uuid,
        firstName,
        lastName
      },
      children{
        uuid,
        firstName,
        lastName
      },
      partners{
        relationshipType,
        person{
          uuid,
          firstName,
          lastName
        }
      }
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

export const removeGiftRequestPerson = (jwt, requestID, personID) => {
  console.log("HTTP removeGiftRequestPerson " + [requestID, personID]);
  const query = `
       mutation removeGiftRequestPerson($giftRequestUUID:String,$personUUID:String) {
        RemoveGiftRequestPerson( giftRequestUUID:$giftRequestUUID,personUUID:$personUUID)
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
