export { projectProposal as projectproposals } from './project_proposal';

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
        title: 'Email'
      }
    }
  },
  uiSchema: {
    email: {
      'ui:widget': 'email',
      'ui:autofocus': true,
      'ui:description':
        'Enter the email email of the person (organisation or Beneficiary)',
      'ui:help': 'This will be an autocomplete select box'
    }
  }
};
