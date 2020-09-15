// import i18n from "../i18n";

export const login = (i18n) => {
  return {
    schema: {
      title: i18n.t("login_title"),
      type: "object",
      required: ["email", "password"],
      submitButton: i18n.t("login_button"),
      cancelButton: i18n.t("cancel_button"),
      properties: {
        email: {
          type: "string",
          title: i18n.t("login_email"),
          placeholder: i18n.t("login_email_placeholder"),
        },
        password: {
          type: "string",
          title: i18n.t("login_password"),
          minLength: 12,
        },
      },
    },
    uiSchema: {
      email: {
        "ui:widget": "email",
        "ui:autofocus": true,
        "ui:help": i18n.t("login_email_help"),
      },
      password: {
        "ui:widget": "password",
      },
    },
  };
};

export const forgot = {
  schema: {
    title: "Forgot your password",
    type: "object",
    required: ["email"],
    submitButton: "Reset my password",
    cancelButton: "Cancel",
    properties: {
      email: {
        type: "string",
        title: "Email",
        placeholder: "Email address",
      },
    },
  },
  uiSchema: {
    email: {
      "ui:widget": "email",
      "ui:autofocus": true,
      "ui:help": "Please enter your email address",
    },
  },
};

export const change = {
  schema: {
    title: "Change your password",
    type: "object",
    submitButton: "Change password",
    cancelButton: "Cancel",
    properties: {
      pass1: {
        type: "string",
        title: "Enter new password",
        minLength: 12,
      },
      pass2: {
        type: "string",
        title: "Confirm password",
        minLength: 12,
      },
    },
  },
  uiSchema: {
    pass1: { "ui:widget": "password", "ui:autofocus": true },
    pass2: { "ui:widget": "password" },
  },
};

export const create = {
  schema: {
    title: "Create user",
    type: "object",
    required: ["email"],
    submitButton: "Create user",
    cancelButton: "Cancel",
    properties: {
      email: {
        type: "string",
        title: "Email",
      },
      isStaff: {
        type: "boolean",
        title: "Facilitator",
      },
      isBeneficiary: {
        type: "boolean",
        title: "Beneficiary",
      },
      isHost: {
        type: "boolean",
        title: "Organization",
      },
    },
  },
  uiSchema: {
    email: {
      "ui:widget": "email",
      "ui:autofocus": true,
    },
  },
};

export const activate = {
  schema: {
    title: "Activate account",
    type: "object",
    required: ["password", "name", "pass1", "pass2"],
    submitButton: "Activate my account",
    cancelButton: "Cancel",
    properties: {
      password: {
        type: "string",
        title: "Activation password",
      },
      name: {
        type: "string",
        title: "Name",
      },
      pass1: {
        type: "string",
        title: "Preferred password",
        minLength: 12,
      },
      pass2: {
        type: "string",
        title: "Confirm password",
        minLength: 12,
      },
    },
  },
  uiSchema: {
    password: {
      "ui:widget": "password",
      "ui:autofocus": true,
    },
    pass1: {
      "ui:widget": "password",
    },
    pass2: {
      "ui:widget": "password",
    },
  },
};
