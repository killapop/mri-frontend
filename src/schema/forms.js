export { projectProposal } from './project_proposal';

export const create = {
  schema: {
    title: 'Create Form',
    type: 'object',
    required: ['email'],
    submitButton: 'Create form',
    cancelButton: 'Cancel',
    properties: {
      email: {
        type: 'string',
        title: 'Create a form for'
      }
    }
  },
  uiSchema: {
    email: {
      'ui:widget': 'email',
      'ui:autofocus': true,
      'ui:description':
        'Enter the email address of the of the intended applicaant (organisation or Beneficiary)',
      'ui:help': 'This will be an autocomplete select box'
    }
  }
};
