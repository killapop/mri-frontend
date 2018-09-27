export const projectProposal = {
  schema: {
    title: 'Project proposal',
    type: 'object',
    submitButton: 'Submit proposal',
    properties: {
      project_overview: {
        type: 'object',
        title: 'Project Overview',
        properties: {
          project_title: {
            type: 'string',
            title: 'Project title',
          },
          project_places: {
            type: 'string',
            title: 'Project place(s)',
            description: 'Enter city names separated by commas',
          },
          project_period: {
            type: 'object',
            title: 'Project planned period',
            properties: {
              project_period_from: {
                title: 'From',
                type: 'string',
                format: 'date',
              },
              project_period_until: {
                title: 'Until',
                type: 'string',
                format: 'date',
              },
            },
          },
          requested_funding: {
            type: 'number',
            title: 'Requested funding EUR',
            format: 'updown',
          },
          third_party_funds: {
            type: 'number',
            title: 'Third party funds EUR',
            format: 'updown',
          },
          own_funds_equity: {
            type: 'number',
            title: 'Own funds / Equity EUR',
            format: 'updown',
            description: 'notably funding from other public institutions',
          },
          total_expenditure: {
            type: 'object',
            title: 'Total Expenditure',
            description: 'If possible split by calendar year',
            properties: {
              year_1: {
                title: 'Calendar year 1',
                type: 'number',
                format: 'updown',
              },
              year_2: {
                title: 'Calendar year 2',
                type: 'number',
                format: 'updown',
              },
            },
          },
          overall_financing_guaranteed: {
            type: 'boolean',
            title: 'Overall financing guaranteed?',
          },
        },
      },
    },
  },
  uiSchema: {
    project_overview: {
      project_period: {
        classNames: 'col-fieldset-2',
      },
      total_expenditure: {
        classNames: 'col-fieldset-2',
      },
      overall_financing_guaranteed: {
        'ui:widget': 'radio',
      },
    },
  },
}
