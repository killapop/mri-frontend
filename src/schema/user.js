export const login = {
  schema: {
    title: 'Login',
    type: 'object',
    required: ['email', 'password'],
    submitButton: 'Login',
    cancelButton: 'Cancel',
    properties: {
      email: {
        type: 'string',
        title: 'Email',
        placeholder: 'Email address'
      },
      password: { type: 'string', title: 'Password' }
    }
  },
  uiSchema: {
    email: {
      'ui:widget': 'email',
      'ui:autofocus': true,
      'ui:help': 'Please enter a valid email address'
    },
    password: {
      'ui:widget': 'password'
    }
  }
};

export const forgot = {
  schema: {
    title: 'Forgot your password',
    type: 'object',
    required: ['email'],
    submitButton: 'Reset my password',
    cancelButton: 'Cancel',
    properties: {
      email: {
        type: 'string',
        title: 'Email',
        placeholder: 'Email address'
      }
    }
  },
  uiSchema: {
    email: {
      'ui:widget': 'email',
      'ui:autofocus': true,
      'ui:help': 'Please enter your email address'
    }
  }
};

export const change = {
  schema: {
    title: 'Change your password',
    type: 'object',
    required: ['current_password'],
    submitButton: 'Change password',
    cancelButton: 'Cancel',
    properties: {
      current_password: {
        type: 'string',
        title: 'Current password',
        placeholder: 'Current password'
      }
    }
  },
  uiSchema: {
    email: {
      'ui:widget': 'email',
      'ui:autofocus': true,
      'ui:help': 'Please enter your email address'
    }
  }
};

export const create = {
  schema: {
    title: 'Create user',
    type: 'object',
    required: ['email'],
    submitButton: 'Create user',
    cancelButton: 'Cancel',
    properties: {
      email: {
        type: 'string',
        title: 'Email'
      },
      isStaff: {
        type: 'boolean',
        title: 'Facilitator'
      },
      isBeneficiary: {
        type: 'boolean',
        title: 'Beneficiary'
      },
      isHost: {
        type: 'boolean',
        title: 'Organization'
      }
    }
  },
  uiSchema: {
    email: {
      'ui:widget': 'email',
      'ui:autofocus': true
    }
  }
};

export const activate = {
  schema: {
    title: 'Activate account',
    type: 'object',
    required: ['password', 'name', 'new_password'],
    submitButton: 'Activate my account',
    cancelButton: 'Cancel',
    properties: {
      password: {
        type: 'string',
        title: 'Activation password'
      },
      name: {
        type: 'string',
        title: 'Name'
      },
      new_password: {
        type: 'string',
        title: 'Preferred password'
      }
    }
  },
  uiSchema: {
    password: {
      'ui:widget': 'password',
      'ui:autofocus': true
    },
    new_password: {
      'ui:widget': 'password',
      'ui:autofocus': true
    }
  }
};
