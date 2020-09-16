import { personalStatements_1 } from "./personalStatements_1.js";
import { personalStatements_2 } from "./personalStatements_2.js";
import { projectProposals_1 } from "./projectProposals_1.js";
import { projectProposals_2 } from "./projectProposals_2.js";
export { projectProposal } from "./project_proposal";

export const create = {
  schema: {
    title: "Create Form",
    type: "object",
    required: ["email"],
    submitButton: "Create form",
    cancelButton: "Cancel",
    properties: {
      email: {
        type: "string",
        title: "Create a form for",
      },
    },
  },
  uiSchema: {
    email: {
      "ui:widget": "email",
      "ui:autofocus": true,
      "ui:description":
        "Enter the email address of the of the intended applicant (organisation or Beneficiary)",
      "ui:help": "This will be an autocomplete select box",
    },
  },
};

export const allForms = {
  personalStatements_1,
  personalStatements_2,
  projectProposals_1,
  projectProposals_2,
};
