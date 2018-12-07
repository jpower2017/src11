export const data = [
  {
    id: 1,
    name: "grandpa abe",
    parents: [0],
    partners: [2],
    siblings: [],
    children: [10, 11]
  },
  {
    id: 2,
    name: "grandma bertha",
    parents: [0],
    partners: [1],
    siblings: [],
    children: [10, 11]
  },
  {
    id: 10,
    name: "main person",
    parents: [1, 2],
    partners: [11],
    siblings: [12],
    children: [100, 101]
  },

  {
    id: 11,
    name: "main spouse",
    parents: [0],
    partners: [10],
    siblings: [],
    children: [100, 101]
  },
  {
    id: 12,
    name: "main sibling",
    parents: [1, 2],
    partners: [],
    siblings: [10],
    children: []
  },
  {
    id: 100,
    name: "kid1",
    parents: [10, 11],
    partners: [],
    siblings: [101],
    children: [200]
  },
  {
    id: 101,
    name: "kid2",
    parents: [10, 11],
    partners: [],
    siblings: [100],
    children: []
  },
  {
    id: 200,
    name: "kid of kid 1",
    parents: [100],
    partners: [],
    siblings: [],
    children: []
  }
];
