export const addObjPartner = (
  firstName,
  lastName,
  gender,
  uuid,
  selectedPerson,
  generation
) => {
  console.log("addObjPartner");
  return {
    uuid: `${uuid}`,
    generation: generation,
    name: `${firstName} ${lastName}`,
    gender: gender,
    partners: [`${selectedPerson}`],
    children: []
  };
};
export const addObjChild = (
  firstName,
  lastName,
  gender,
  uuid,
  selectedPerson,
  generation
) => {
  console.log("addObjChild");
  return {
    uuid: `${uuid}`,
    generation: generation,
    name: `${firstName} ${lastName}`,
    gender: gender,
    partners: [],
    children: []
  };
};
export const addObjParent = (
  firstName,
  lastName,
  gender,
  uuid,
  selectedPerson,
  generation
) => {
  console.log("addObjParent  ");
  return {
    uuid: `${uuid}`,
    generation: generation,
    name: `${firstName} ${lastName}`,
    gender: gender,
    partners: [],
    children: [`${selectedPerson}`]
  };
};
export const addObjMain = (
  firstName,
  lastName,
  gender,
  uuid,
  selectedPerson
) => {
  console.log("addObjMain");
  return {
    uuid: `${uuid}`,
    generation: 3,
    name: `${firstName} ${lastName}`,
    gender: gender,
    partners: [],
    children: []
  };
};
