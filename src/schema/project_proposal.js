export const projectProposal = {
  schema: {
    title: 'Project proposal',
    type: 'object',
    submitButton: 'Submit proposal',
    properties: {
      left: {
        type: 'object',
        title: 'Details',
        properties: {
          project_overview: {
            type: 'object',
            title: 'Project Overview',
            properties: {
              project_title: {
                type: 'string',
                title: 'Project title'
              },
              project_places: {
                type: 'string',
                title: 'Project place(s)',
                description: 'Enter city names separated by commas'
              },
              project_period: {
                type: 'object',
                title: 'Project planned period',
                properties: {
                  project_period_from: {
                    title: 'From',
                    type: 'string',
                    format: 'date'
                  },
                  project_period_until: {
                    title: 'Until',
                    type: 'string',
                    format: 'date'
                  }
                }
              },
              requested_funding: {
                type: 'number',
                title: 'Requested funding EUR',
                format: 'updown'
              },
              third_party_funds: {
                type: 'number',
                title: 'Third party funds EUR',
                format: 'updown'
              },
              own_funds_equity: {
                type: 'number',
                title: 'Own funds / Equity EUR',
                format: 'updown',
                description: 'notably funding from other public institutions'
              },
              total_expenditure: {
                type: 'object',
                title: 'Total Expenditure',
                description: 'If possible split by calendar year',
                properties: {
                  year_1: {
                    title: 'Calendar year 1',
                    type: 'number',
                    format: 'updown'
                  },
                  year_2: {
                    title: 'Calendar year 2',
                    type: 'number',
                    format: 'updown'
                  }
                }
              },
              overall_financing_guaranteed: {
                type: 'boolean',
                title: 'Overall financing guaranteed?'
              }
            }
          },
          applicant_organisation: {
            type: 'object',
            title: 'Information of the Applicant Organisation',
            properties: {
              general_information: {
                type: 'object',
                title: 'General Information',
                properties: {
                  organisation_name: {
                    type: 'string',
                    title: 'Name of the organisation'
                  },
                  legal_form: {
                    type: 'string',
                    title: 'Legal form / official registration'
                  },
                  field_of_activities: {
                    type: 'string',
                    title: 'Field of activities'
                  },
                  address: { $ref: '#/definitions/address' },
                  contact: { $ref: '#/definitions/contact' },
                  online: { $ref: '#/definitions/online_presence' },
                  bank_details: { $ref: '#/definitions/bank_details' },
                  separate_bookkeeping: {
                    type: 'boolean',
                    title: 'Separate project account (bookkeeping) possible'
                  }
                }
              }
            }
          }
        }
      },
      right: {
        type: 'object',
        title: 'Files and Comments',
        properties: {}
      }
    },
    definitions: {
      address: {
        type: 'object',
        title: 'Address',
        properties: {
          street: { type: 'string', title: 'Street' },
          house_no: { type: 'string', title: 'House no.' },
          postal_code: { type: 'string', title: 'Postal code' },
          place: { type: 'string', title: 'Place' }
        }
      },
      contact: {
        type: 'object',
        title: 'Contact',
        properties: {
          phone_office: { type: 'string', title: 'Phone office' },
          mobile: { type: 'string', title: 'Mobile' },
          skype: { type: 'string', title: 'Skype' },
          email: { type: 'string', format: 'email', title: 'Email' }
        }
      },
      online_presence: {
        type: 'object',
        title: 'Online Presence',
        properties: {
          website: { type: 'string', title: 'Website' },
          facebook: { type: 'string', title: 'Facebook' },
          others: { type: 'string', title: 'Others' }
        }
      },
      bank_details: {
        type: 'object',
        title: 'Bank details',
        properties: {
          name: { type: 'string', title: 'Name of the Bank' },
          iban: { type: 'string', title: 'IBAN' },
          bic: { type: 'string', title: 'BIC' }
        }
      }
    }
  },
  uiSchema: {
    project_overview: {
      project_period: {
        classNames: 'col-fieldset-2'
      },
      total_expenditure: {
        classNames: 'col-fieldset-2'
      },
      overall_financing_guaranteed: {
        'ui:widget': 'radio'
      }
    }
  }
};
