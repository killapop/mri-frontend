// import i18n from "../i18n";

export const login = (t) => {
  return {
    schema: {
      title: t("login_title"),
      type: "object",
      required: ["email", "password"],
      submitButton: t("login_button"),
      cancelButton: t("common_cancel"),
      properties: {
        email: {
          type: "string",
          title: t("common_email"),
          placeholder: t("login_email_placeholder"),
        },
        password: {
          type: "string",
          title: t("login_password"),
          minLength: 12,
        },
      },
    },
    uiSchema: {
      email: {
        "ui:widget": "email",
        "ui:autofocus": true,
        "ui:help": t("login_email_help"),
      },
      password: {
        "ui:widget": "password",
      },
    },
  };
};

export const forgot = (t) => {
  return {
    schema: {
      title: t("forgot_title"),
      type: "object",
      required: ["email"],
      submitButton: t("forgot_button"),
      cancelButton: t("common_cancel"),
      properties: {
        email: {
          type: "string",
          title: t("common_email"),
          placeholder: t("login_email_placeholder"),
        },
      },
    },
    uiSchema: {
      email: {
        "ui:widget": "email",
        "ui:autofocus": true,
        "ui:help": t("forgot_email_help"),
      },
    },
  };
};

export const change = (t) => {
  return {
    schema: {
      title: t("change_title"),
      type: "object",
      submitButton: t("change_button"),
      cancelButton: t("common_cancel"),
      properties: {
        pass1: {
          type: "string",
          title: t("change_new_password"),
          minLength: 12,
        },
        pass2: {
          type: "string",
          title: t("activate_confirm_password"),
          minLength: 12,
        },
      },
    },
    uiSchema: {
      pass1: { "ui:widget": "password", "ui:autofocus": true },
      pass2: { "ui:widget": "password" },
    },
  };
};

export const create = (t) => {
  return {
    schema: {
      title: t("create_user_title"),
      type: "object",
      required: ["email"],
      submitButton: t("create_user_title"),
      cancelButton: t("common_cancel"),
      properties: {
        email: {
          type: "string",
          title: t("common_email"),
        },
        isStaff: {
          type: "boolean",
          title: t("create_role_facilitator"),
        },
        isBeneficiary: {
          type: "boolean",
          title: t("create_role_beneficiary"),
        },
        isHost: {
          type: "boolean",
          title: t("create_role_organization"),
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
};

export const activate = (t) => {
  return {
    schema: {
      title: t("activate_title"),
      type: "object",
      required: ["password", "name", "pass1", "pass2"],
      submitButton: t("activate_button"),
      cancelButton: t("common_cancel"),
      properties: {
        password: {
          type: "string",
          title: t("activate_activation_password"),
        },
        name: {
          type: "string",
          title: t("activate_name"),
        },
        pass1: {
          type: "string",
          title: t("activate_preferred_password"),
          minLength: 12,
        },
        pass2: {
          type: "string",
          title: t("activate_confirm_password"),
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
};
