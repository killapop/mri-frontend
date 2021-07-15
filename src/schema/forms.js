import { personalStatements_1 } from "./personalStatements_1.js";
import { personalStatements_2 } from "./personalStatements_2.js";
import { projectProposals_1 } from "./projectProposals_1.js";
import { projectProposals_2 } from "./projectProposals_2.js";
export { projectProposal } from "./project_proposal";

export const create = (t) => {
  return {
    schema: {
      title: t("create_form_title"),
      type: "object",
      required: ["email"],
      submitButton: t("create_form_submit_button"),
      cancelButton: t("create_form_cancel_button"),
      properties: {
        email: {
          type: "string",
          title: t("create_form_email_label"),
        },
      },
    },
    uiSchema: {
      email: {
        "ui:widget": "email",
        "ui:autofocus": true,
        "ui:description": t("create_form_email_description"),
        "ui:help": t("create_form_email_help"),
      },
    },
  };
};

export const allForms = {
  personalStatements_1,
  personalStatements_2,
  projectProposals_1,
  projectProposals_2,
};
