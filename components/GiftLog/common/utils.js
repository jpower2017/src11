export const addObjPartner = (person, selectedPerson, generation) => {
  console.log("addObjPartner");
  return {
    ...person,
    name: `${person.firstName} ${person.lastName}`,
    generation: generation,
    partners: [`${selectedPerson}`],
    children: []
  };
};
export const addObjChild = (person, selectedPerson, generation) => {
  console.log("addObjChild");
  return {
    ...person,
    name: `${person.firstName} ${person.lastName}`,
    generation: generation,
    partners: [],
    children: []
  };
};
export const addObjParent = (person, selectedPerson, generation) => {
  console.log("addObjParent  ");
  return {
    ...person,
    name: `${person.firstName} ${person.lastName}`,
    generation: generation,
    partners: [],
    children: [`${selectedPerson}`]
  };
};

/* if group/org name overides person first and last */
export const addObjMain = (person, selectedPerson) => {
  console.log("addObjMain");
  return {
    name: `${person.firstName} ${person.lastName}`,
    ...person,
    generation: 3,
    partners: [],
    children: []
  };
};
