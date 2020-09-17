export const projectProposals_2 = (t) => {
  return {
    schema: {
      definitions: {
        address: {
          type: "object",
          title: "Address",
          properties: {
            street: {
              type: "string",
              title: "Street",
            },
            house_no: {
              type: "string",
              title: "House no.",
            },
            postal_code: {
              type: "string",
              title: "Postal code",
            },
            place: {
              type: "string",
              title: "Place",
            },
          },
        },
        contact: {
          type: "object",
          title: "Contact",
          properties: {
            phone_office: {
              type: "string",
              title: "Phone office",
            },
            mobile: {
              type: "string",
              title: "Mobile",
            },
            skype: {
              type: "string",
              title: "Skype",
            },
            email: {
              type: "string",
              format: "email",
              title: "Email",
            },
          },
        },
        online_presence: {
          type: "object",
          title: "Online Presence",
          properties: {
            website: {
              type: "string",
              title: "Website",
            },
            facebook: {
              type: "string",
              title: "Facebook",
            },
            others: {
              type: "string",
              title: "Others",
            },
          },
        },
        bank_details: {
          type: "object",
          title: "Bank details",
          properties: {
            name: {
              type: "string",
              title: "Name of the Bank",
            },
            iban: {
              type: "string",
              title: "IBAN",
            },
            bic: {
              type: "string",
              title: "BIC",
            },
          },
        },
        title_name_function: {
          type: "object",
          title: "Title, name and function",
          properties: {
            person_title: {
              type: "string",
              title: "Title",
              enum: [1, 2, 3],
              enumNames: ["No choice", "Mr.", "Mrs."],
            },
            academic_title: {
              type: "string",
              title: "Academic title",
            },
            first_name: {
              type: "string",
              title: "First name",
            },
            last_name: {
              type: "string",
              title: "Last name",
            },
            function: {
              type: "string",
              title: "Function",
            },
            contact: {
              $ref: "#/definitions/contact",
            },
          },
        },
      },
      title: "Project proposal",
      type: "object",
      submitButton: "Submit proposal",
      saveButton: "Save",
      properties: {
        project_overview: {
          type: "object",
          title: "1. Project Overview",
          properties: {
            project_title: {
              type: "string",
              title: "Project title",
            },
            project_places: {
              type: "string",
              title: "Project place(s)",
              description: "Enter city names separated by commas",
            },
            project_period: {
              type: "object",
              title: "Project planned period",
              properties: {
                project_period_from: {
                  title: "From",
                  type: "string",
                  format: "date",
                },
                project_period_until: {
                  title: "Until",
                  type: "string",
                  format: "date",
                },
              },
            },
            requested_funding: {
              type: "number",
              title: "Requested funding EUR",
              format: "updown",
            },
            third_party_funds: {
              type: "number",
              title: "Third party funds EUR",
              format: "updown",
            },
            own_funds_equity: {
              type: "number",
              title: "Own funds / Equity EUR",
              format: "updown",
              description: "notably funding from other public institutions",
            },
            total_expenditure: {
              type: "object",
              title: "Total Expenditure",
              description: "If possible split by calendar year",
              properties: {
                year_1: {
                  title: "Calendar year 1",
                  type: "number",
                  format: "updown",
                },
                year_2: {
                  title: "Calendar year 2",
                  type: "number",
                  format: "updown",
                },
              },
            },
            overall_financing_guaranteed: {
              type: "boolean",
              title: "Overall financing guaranteed?",
            },
          },
        },
        applicant_organisation: {
          type: "object",
          title: "2. Information of the Applicant Organisation",
          properties: {
            general_information: {
              type: "object",
              title: "2.1. General Information",
              properties: {
                organisation_name: {
                  type: "string",
                  title: "Name of the organisation",
                },
                legal_form: {
                  type: "string",
                  title: "Legal form / official registration",
                },
                field_of_activities: {
                  type: "string",
                  title: "Field of activities",
                },
                address: {
                  $ref: "#/definitions/address",
                },
                contact: {
                  $ref: "#/definitions/contact",
                },
                online: {
                  $ref: "#/definitions/online_presence",
                },
                bank_details: {
                  $ref: "#/definitions/bank_details",
                },
                separate_bookkeeping: {
                  type: "boolean",
                  title: "Separate project account (bookkeeping) possible",
                },
              },
            },
            authorized_person: {
              type: "object",
              title:
                "2.2. Person authorized to represent the applying organisation in legal transactions",
              properties: {
                title_name_function: {
                  $ref: "#/definitions/title_name_function",
                },
              },
            },
            project_coordinator: {
              type: "object",
              title: "2.3. Project coordinator in the applying organisation",
              properties: {
                title_name_function: {
                  $ref: "#/definitions/title_name_function",
                },
              },
            },
            financial_contact: {
              type: "object",
              title: "2.4. Contact person for financial concerns",
              properties: {
                title_name_function: {
                  $ref: "#/definitions/title_name_function",
                },
              },
            },
            scholarship_contact: {
              type: "object",
              title: "2.5. Direct contact for the scholarship holder",
              properties: {
                title_name_function: {
                  $ref: "#/definitions/title_name_function",
                },
              },
            },
          },
        },
        scholarship_holder: {
          type: "object",
          title: "3. Information on the scholarship holder",
          properties: {
            title_name_function: {
              $ref: "#/definitions/title_name_function",
            },
            known_from: {
              type: "string",
              title: "Where do you know the scholarship holder from?",
              maxLength: 500,
            },
          },
        },
        background_information: {
          type: "object",
          title:
            "4. Background information on applying and partner organisations",
          properties: {
            brief_description: {
              type: "string",
              title: "4.1. Brief description",
              format: "textarea",
              maxLength: 2500,
              description:
                "Please outline your organisation und your partner organisation(s) (fields of activity, previous activities and their financing/project funding, structure and personnel). ",
            },
            use_of_funds: {
              type: "string",
              title: "4.2. Use of funds and statement",
              format: "textarea",
              maxLength: 500,
              description:
                "How do you guarantee proper use and accounting of the requested funds (e.g. four eyes principle, etc.)?",
            },
          },
        },
        project_planning: {
          type: "object",
          title: "5. Project Planning",
          description:
            "Please present the planned project and illustrate how exactly the scholarship holder will be integrated in your institution. Please also briefly address the role of potential partner organisations.",
          properties: {
            project_goal: {
              type: "string",
              title: "5.1. Project goal",
              format: "textarea",
              maxLength: 500,
              description:
                "Describe the specific goal that the project aims to achieve.",
            },
            measures_and_activities: {
              type: "string",
              title: "5.2. Measures and activities",
              format: "textarea",
              maxLength: 2500,
              description:
                "Which specific project measures should be carried out in order to achieve the goal (including applicable steps, setting of goals, milestones)?",
            },
            indicators: {
              type: "string",
              title: "5.3. Indicators",
              format: "textarea",
              maxLength: 1500,
              description:
                "According to which criteria should the success of the project be documented/measured?",
            },
            impact: {
              type: "string",
              title: "5.4. Impact",
              format: "textarea",
              maxLength: 1000,
              description:
                "Describe which lasting impact you wish to achieve with the project.",
            },
            risks_side_effects: {
              type: "string",
              title: "5.5. Risks / side effects",
              format: "textarea",
              maxLength: 1000,
              description:
                "Which risks and adverse side effects could harm project goal and impact? How can these risks be minimised? List any potential positive side effects as appropriate. ",
            },
          },
        },
        protection_support_concept: {
          type: "object",
          title:
            "6. Concept for protection and support for scholarship holders",
          description:
            "Please describe your institution’s concept for supervision, safety return/integration, etc. Describe, as appropriate, your partner organisation’s role and its added value if you have not already done so under the header project planning.",
          properties: {
            supervision_support: {
              type: "string",
              title: "6.1. Supervision and support",
              format: "textarea",
              maxLength: 2000,
              description:
                "How do you guarantee the ongoing supervision for the duration of the project? Refer to specific support requirements as appropriate.",
            },
            couselling_oppotunities: {
              type: "string",
              title: "6.2. Couselling oppotunities for career guidance",
              format: "textarea",
              maxLength: 2000,
              description:
                "What are the counselling services your institution provides the scholarship holder regarding career guidance (within or outside of the cultural sector) following the period after completion of the scholarship? (If already indicated under project planning, a reference is sufficient)",
            },
            period_after: {
              type: "string",
              title: "6.3. Period after support has ended",
              format: "textarea",
              maxLength: 1500,
              description:
                "What possibilities do you see for providing the scholarship holder with guidance for the time after the support has ended? ",
            },
            safety_measures: {
              type: "string",
              title: "6.4.1 Safety measures",
              format: "textarea",
              maxLength: 2000,
              description:
                "Which fundamental safety measures (such as safe communication, data security, confidentiality etc.) do you plan to implement?",
            },
            safety_protocols: {
              type: "string",
              title: "6.4.2 Safety protocols",
              format: "textarea",
              maxLength: 2000,
              description:
                "Have you already undertaken first steps for the development of security protocols? If so, which? ",
            },
            integrations: {
              type: "string",
              title: "6.5. Integration",
              format: "textarea",
              maxLength: 2000,
              description:
                "Please describe ideas, goals and measures that should contribute to a successful integration of the scholarship holder at his/her residence.",
            },
            return: {
              type: "string",
              title: "6.6. Return to home country",
              format: "textarea",
              maxLength: 2000,
              description:
                "Please describe ideas, goals and measures that should support a safe return to the host country with a long-term perspective for the future.",
            },
            public_relations: {
              type: "string",
              title: "6.7. Public relations",
              format: "textarea",
              maxLength: 2000,
              description:
                "It is possible that there are conflicting interests regarding the need for protection of the scholarship holders on the one hand and on the other hand, the need for public relations. How do you handle such a situation? How do you take account of the scholarship holder’s interests?",
            },
          },
        },
        other: {
          type: "object",
          title: "7. Other",
          properties: {
            other_1: {
              type: "boolean",
              title:
                "The applying institution hereby commits to fulfilling residence law conditions for the residence in due time and responsibly as well as ensuring to responsibly take care of labour law matters prior to the residence",
            },
            other_2: {
              type: "boolean",
              title:
                "The applying institution hereby commits to always act in accordance with and in consideration of the interests of the scholarship holder as well as ensuring the confidentiality of their employees. All measures of press and publicity work have to be closely coordinated with the scholarship holder and the Martin Roth-Initiative prior to being carried out.",
            },
            other_3: {
              type: "boolean",
              title:
                "The project has not yet started or has not yet been carried out.",
            },
            other_4: {
              type: "boolean",
              title: "The adequate use of funds is guaranteed.",
            },
            other_5: {
              type: "boolean",
              title:
                "The host institution commits to always act in line with the interests of the endangered artists. In case of unexpected events, foreseeable risks or arising concerns, the host institution commits to immediately contact the Martin Roth-Initiative.",
            },
            other_6: {
              type: "boolean",
              title:
                "You herewith confirm that you and the persons listed by you have duly noted the privacy information and agree with the intended use as described.",
            },
            other_7: {
              type: "string",
              title: "Is there anything else you would like to tell us",
              format: "textarea",
            },
          },
        },
      },
    },
    uiSchema: {
      project_overview: {
        project_period: {
          classNames: "col-fieldset-2",
        },
        total_expenditure: {
          classNames: "col-fieldset-2",
        },
        overall_financing_guaranteed: {
          "ui:widget": "radio",
        },
      },
      authorized_person: {
        title_name_function: {
          person_title: {
            "ui:widget": "select",
            "ui:placeholder": "Select one",
          },
        },
      },
      scholarship_holder: {
        known_from: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
      },
      background_information: {
        brief_description: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 2500 characters",
          "ui:options": {
            rows: 6,
          },
        },
        use_of_funds: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 500 characters",
          "ui:options": {
            rows: 4,
          },
        },
      },
      project_planning: {
        project_goal: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 500 characters",
          "ui:options": {
            rows: 4,
          },
        },
        measures_and_activities: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 2500 characters",
          "ui:options": {
            rows: 6,
          },
        },
        indicators: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 1500 characters",
          "ui:options": {
            rows: 5,
          },
        },
        impact: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 1000 characters",
          "ui:options": {
            rows: 5,
          },
        },
        risks_side_effects: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 1000 characters",
          "ui:options": {
            rows: 5,
          },
        },
      },
      protection_support_concept: {
        supervision_support: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 2000 characters",
          "ui:options": {
            rows: 5,
          },
        },
        couselling_oppotunities: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 2000 characters",
          "ui:options": {
            rows: 5,
          },
        },
        period_after: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 1500 characters",
          "ui:options": {
            rows: 5,
          },
        },
        safety_measures: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 2000 characters",
          "ui:options": {
            rows: 5,
          },
        },
        safety_protocols: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 1500 characters",
          "ui:options": {
            rows: 5,
          },
        },
        integrations: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 2000 characters",
          "ui:options": {
            rows: 5,
          },
        },
        return: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 2000 characters",
          "ui:options": {
            rows: 5,
          },
        },
        public_relations: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 2000 characters",
          "ui:options": {
            rows: 5,
          },
        },
      },
      other: {
        other_7: {
          "ui:widget": "textarea",
          "ui:help": "Maximum 1000 characters",
          "ui:options": {
            rows: 5,
          },
        },
      },
    },
  };
};
