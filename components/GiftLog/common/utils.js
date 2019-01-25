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

export const addObjMain = (person, selectedPerson) => {
  console.log("addObjMain");
  return {
    ...person,
    name: `${person.firstName} ${person.lastName}`,
    generation: 3,
    partners: [],
    children: []
  };
};
