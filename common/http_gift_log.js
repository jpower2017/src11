import { createApolloFetch } from "apollo-fetch";
import { Log } from "../utils/utils";

const uri = "/api/graphql";

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
