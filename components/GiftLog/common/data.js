export const fieldsRequest = [
  { name: "requestNotes", title: "Request Notes", uiType: "textArea" },
  {
    name: "registryStatus",
    title: "Registry status",
    uiType: "dropDown"
    //  options: registryStatuses
  },
  {
    name: "active",
    title: "Active",
    uiType: "dropDown"
    //  options: activeStatuses
  }
];

export const fieldsGiftEvent = [
  {
    name: "eventDate",
    title: "Event Date(optional)(MMDDYYYY)",
    type: "date",
    uiType: "textArea"
  },
  { name: "giftType", title: "Gift Type", uiType: "textArea" },
  {
    name: "registryStatus",
    title: "Registry status",
    uiType: "dropDown"
    //  options: registryStatuses
  },
  { name: "notes", title: "Gift event notes", uiType: "textArea" }
];

export const columnsPerson = [
  { name: "firstName", title: "First name", type: "string", order: 2 },
  { name: "middleName", title: "Middle name", type: "string", order: 3 },
  { name: "lastName", title: "Last name", type: "string", order: 4 },
  { name: "birthSurname", title: "Surname", type: "string", order: 5 },
  { name: "legalLastName", title: "Legal last", type: "string", order: 6 },
  { name: "suffix", title: "Suffix", type: "string", order: 7 },
  { name: "addMain", title: "Main", type: "string", order: 8 },
  { name: "addParent", title: "Parent", type: "string", order: 9 },
  { name: "addPartner", title: "Partner", type: "string", order: 10 },
  { name: "addChild", title: "Child", type: "string", order: 11 },
  { name: "addSib", title: "Sibling", type: "string", order: 12 }
];

export const statuses = [
  { status: "discovery", title: "Discovery", color: "#9FA8DA", value: 1 },
  { status: "accounting", title: "Accounting", color: "#FFF59D", value: 2 },
  {
    status: "awaitApproval",
    title: "Awaiting approval",
    color: "#FFCC80",
    value: 3
  },
  { status: "approved", title: "Approved", color: "", value: 4 },
  { status: "vendor", title: "Vendor", color: "#A5D6A7", value: 5 },
  { status: "wrap", title: "Wrap", color: "#EF9A9A", value: 6 },
  { status: "received", title: "Received", color: "#9E9E9E", value: 7 }
];
