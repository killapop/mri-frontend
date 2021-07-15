export const projectProposals_1 = (t) => {
  return {
    schema: {
      definitions: {
        address: {
          type: "object",
          title: t("form:common_address"),
          properties: {
            street: {
              type: "string",
              title: t("form:common_street"),
            },
            house_no: {
              type: "string",
              title: t("form:common_house"),
            },
            postal_code: {
              type: "string",
              title: t("form:common_pin"),
            },
            place: {
              type: "string",
              title: t("form:common_place"),
            },
          },
        },
        contact: {
          type: "object",
          title: t("form:common_contact"),
          properties: {
            phone_office: {
              type: "string",
              title: t("form:common_office_telephone"),
            },
            mobile: {
              type: "string",
              title: t("form:common_mobile"),
            },
            others: {
              type: "string",
              title: t("form:common_contact_other"),
            },
            email: {
              type: "string",
              format: "email",
              title: t("form:common_email"),
            },
          },
        },
        online_presence: {
          type: "object",
          title: t("form:common_online_presence"),
          properties: {
            website: {
              type: "string",
              title: t("form:common_website"),
            },
            social_media: {
              type: "string",
              title: t("form:common_social_media"),
            },
            others: {
              type: "string",
              title: t("form:common_contact_other"),
            },
          },
        },
        bank_details: {
          type: "object",
          title: "Bankverbindung",
          properties: {
            name: {
              type: "string",
              title: "Name der Bank",
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
          title: "",
          properties: {
            title: {
              type: "string",
              title: t("form:common_title_title"),
              enum: [1, 2, 3],
              enumNames: [
                t("form:common_title_choice_1"),
                t("form:common_title_choice_2"),
                t("form:common_title_choice_3"),
              ],
            },
            academic_title: {
              type: "string",
              title: t("form:common_academic_title"),
            },
            first_name: {
              type: "string",
              title: t("form:common_first_name"),
            },
            last_name: {
              type: "string",
              title: t("form:common_last_name"),
            },
            position: {
              type: "string",
              title: t("form:common_function"),
            },
            telephone: {
              type: "string",
              title: t("form:common_telephone"),
            },
            email: {
              type: "string",
              format: "email",
              title: t("form:common_email"),
            },
          },
        },
      },
      title: t("form:PP_1_title"),
      description: t("form:PP_1_description"),
      type: "object",
      submitButton: t("form:common_submit"),
      saveButton: t("form:common_save"),
      cancelButton: t("form:common_cancel"),
      properties: {
        project_overview: {
          type: "object",
          title: t("form:PP_1_overview"),
          properties: {
            project_title: {
              type: "string",
              title: t("form:PP_1_overview_title"),
              description: t("form:PP_1_overview_title_description"),
            },
            project_places: {
              type: "string",
              title: t("form:PP_1_overview_place"),
              description: t("form:PP_1_overview_place_description"),
            },
            project_period: {
              type: "object",
              title: t("form:PP_1_overview_period"),
              description: t("form:PP_1_overview_period_description"),
              properties: {
                project_period_from: {
                  title: t("form:common_from"),
                  type: "string",
                  format: "date",
                },
                project_period_until: {
                  title: t("form:common_to"),
                  type: "string",
                  format: "date",
                },
              },
            },
            requested_funding: {
              type: "object",
              title: t("form:PP_1_overview_funding"),
              description: t("form:PP_1_overview_funding_description"),
              properties: {
                year_1: {
                  title: `${t("form:PP_1_overview_funding_calendar_year")} 1`,
                  type: "number",
                  format: "updown",
                },
                year_2: {
                  title: `${t("form:PP_1_overview_funding_calendar_year")} 2`,
                  type: "number",
                  format: "updown",
                },
              },
            },
            third_party_funds: {
              type: "object",
              title: t("form:PP_1_overview_funding_external"),
              description: t("form:PP_1_overview_funding_external_description"),
              properties: {
                year_1: {
                  title: `${t("form:PP_1_overview_funding_calendar_year")} 1`,
                  type: "number",
                  format: "updown",
                },
                year_2: {
                  title: `${t("form:PP_1_overview_funding_calendar_year")} 2`,
                  type: "number",
                  format: "updown",
                },
              },
            },
            own_funds_equity: {
              type: "object",
              title: t("form:PP_1_overview_funding_own"),
              description: t("form:PP_1_overview_funding_own_description"),
              properties: {
                year_1: {
                  title: `${t("form:PP_1_overview_funding_calendar_year")} 1`,
                  type: "number",
                  format: "updown",
                },
                year_2: {
                  title: `${t("form:PP_1_overview_funding_calendar_year")} 2`,
                  type: "number",
                  format: "updown",
                },
              },
            },
            total_expenditure: {
              type: "object",
              title: t("form:PP_1_overview_funding_total"),
              description: t("form:PP_1_overview_funding_total_description"),
              properties: {
                year_1: {
                  title: `${t("form:PP_1_overview_funding_calendar_year")} 1`,
                  type: "number",
                  format: "updown",
                },
                year_2: {
                  title: `${t("form:PP_1_overview_funding_calendar_year")} 2`,
                  type: "number",
                  format: "updown",
                },
              },
            },
            overall_financing_guaranteed: {
              type: "boolean",
              title: t("form:PP_1_overview_overall_title"),
              description: t("form:PP_1_overview_overall_description"),
            },
            further_explaination: {
              type: "string",
              title: t("form:PP_1_overview_further_explaination_title"),
            },
          },
        },
        applicant_organisation: {
          type: "object",
          title: t("form:PP_1_applicant_title"),
          properties: {
            organisation_name: {
              type: "string",
              title: t("form:PP_1_applicant_name_title"),
              description: t("form:PP_1_applicant_name_description"),
            },
            legal_form: {
              type: "string",
              title: t("form:PP_1_applicant_legal_form_title"),
              description: t("form:PP_1_applicant_legal_form_description"),
            },
            registration_number: {
              type: "string",
              title: "Registration number",
            },
            field_of_activities: {
              type: "string",
              title: t("form:PP_1_applicant_activities_title"),
              description: t("form:PP_1_applicant_activities_description"),
            },
            description: {
              type: "string",
              title: t("form:PP_1_applicant_description_title"),
              description: t("form:PP_1_applicant_description_description"),
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
            authorized_person: {
              type: "object",
              title: t("form:PP_1_applicant_authorised_person_title"),
              description: t(
                "form:PP_1_applicant_authorised_person_description"
              ),
              properties: {
                title_name_function: {
                  $ref: "#/definitions/title_name_function",
                },
                other: {
                  type: "string",
                  title: t("form:common_contact_other"),
                },
              },
            },
            project_coordinator: {
              type: "object",
              title: t("form:PP_1_applicant_coordinator_title"),
              description: t("form:PP_1_applicant_coordinator_description"),
              properties: {
                title_name_function: {
                  $ref: "#/definitions/title_name_function",
                },
                signal: {
                  type: "string",
                  title: t("form:common_signal"),
                },
                protonmail: {
                  type: "string",
                  title: t("form:common_protonmail"),
                },
              },
            },
            scholarship_contact: {
              type: "object",
              title: t("form:PP_1_applicant_scholar_title"),
              description: t("form:PP_1_applicant_scholar_description"),
              properties: {
                title_name_function: {
                  $ref: "#/definitions/title_name_function",
                },
                signal: {
                  type: "string",
                  title: t("form:common_signal"),
                },
                protonmail: {
                  type: "string",
                  title: t("form:common_protonmail"),
                },
              },
            },
            financial_contact: {
              type: "object",
              title: t("form:PP_1_applicant_financial_title"),
              description: t("form:PP_1_applicant_financial_description"),
              properties: {
                title_name_function: {
                  $ref: "#/definitions/title_name_function",
                },
                signal: {
                  type: "string",
                  title: t("form:common_signal"),
                },
                protonmail: {
                  type: "string",
                  title: t("form:common_protonmail"),
                },
              },
            },
            funds_use: {
              type: "string",
              title: t("form:PP_1_applicant_funds_use_title"),
              description: t("form:PP_1_applicant_funds_use_description"),
            },
            funding: {
              type: "object",
              title: "",
              properties: {
                funding_funding: {
                  type: "string",
                  title: t("form:PP_1_applicant_funding_title"),
                  enum: [1, 0],
                  enumNames: [t("form:common_yes"), t("form:common_no")],
                },
              },
              dependencies: {
                funding_funding: {
                  oneOf: [
                    {
                      properties: {
                        funding_funding: {
                          enum: [0],
                        },
                      },
                    },
                    {
                      properties: {
                        funding_funding: {
                          enum: [1],
                        },
                        compliance: {
                          type: "string",
                          title: t(
                            "form:PP_1_applicant_funding_compliance_title"
                          ),
                          enum: [1, 0],
                          enumNames: [
                            t("form:common_yes"),
                            t("form:common_no"),
                          ],
                        },
                        compliance_information: {
                          type: "string",
                          title: t(
                            "form:PP_1_overview_further_explaination_title"
                          ),
                        },
                      },
                    },
                  ],
                },
              },
            },
            four_eyes: {
              type: "string",
              title: t("form:PP_1_applicant_4eyes_title"),
              enum: [1, 0],
              enumNames: [t("form:common_yes"), t("form:common_no")],
            },
            four_eyes_information: {
              type: "string",
              title: t("form:PP_1_overview_further_explaination_title"),
            },
            respresentatives: {
              type: "string",
              title: t("form:PP_1_applicant_legal_reps_title"),
            },
            bookkeeping: {
              type: "string",
              title: t("form:PP_1_applicant_bookkeeping_title"),
              description: t("form:PP_1_applicant_bookkeeping_description"),
              enum: [1, 0],
              enumNames: [t("form:common_yes"), t("form:common_no")],
            },
            bookkeeping_information: {
              type: "string",
              title: t("form:PP_1_overview_further_explaination_title"),
            },
            vat: {
              type: "string",
              title: t("form:PP_1_applicant_VAT_title"),
              description: t("form:PP_1_applicant_VAT_description"),
              enum: [1, 0],
              enumNames: [t("form:common_yes"), t("form:common_no")],
            },
            deduct: {
              type: "string",
              title: t("form:PP_1_applicant_deduct_title"),
              enum: [1, 0],
              enumNames: [t("form:common_yes"), t("form:common_no")],
            },
            deduct_information: {
              type: "string",
              title: t("form:PP_1_overview_further_explaination_title"),
            },
          },
        },
        project_description: {
          type: "object",
          title: t("form:PP_1_project_title"),
          properties: {
            scholarship_holder: {
              type: "object",
              title: t("form:PP_1_project_scholar_title"),
              properties: {
                title_name_function: {
                  $ref: "#/definitions/title_name_function",
                },
                signal: {
                  type: "string",
                  title: t("form:common_signal"),
                },
                protonmail: {
                  type: "string",
                  title: t("form:common_protonmail"),
                },
              },
            },
            family: {
              type: "object",
              title: t("form:PP_1_project_family_title"),
              description: t("form:PP_1_project_family_description"),
              properties: {
                spouse: {
                  type: "object",
                  title: t("form:PP_1_project_spouse_title"),
                  properties: {
                    first_name: {
                      type: "string",
                      title: t("form:common_first_name"),
                    },
                    last_name: {
                      type: "string",
                      title: t("form:common_last_name"),
                    },
                    telephone: {
                      type: "string",
                      title: t("form:common_telephone"),
                    },
                    email: { type: "string", title: t("form:common_email") },
                  },
                },
                children: {
                  title: t("form:PP_1_project_children_title"),
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        title: t("form:PP_1_project_children_name"),
                      },
                      age: {
                        type: "number",
                        format: "updown",
                        title: t("form:PP_1_project_children_age"),
                      },
                    },
                  },
                },
              },
            },
            full_description: {
              type: "object",
              title: t("form:PP_1_project_description_title"),
              properties: {
                current_situation: {
                  type: "string",
                  title: t("form:PP_1_project_current_situation_title"),
                  description: t(
                    "form:PP_1_project_current_situation_description"
                  ),
                },
                project_goals: {
                  type: "object",
                  title: t("form:PP_1_project_goals_title"),
                  properties: {
                    relocation: {
                      type: "string",
                      title: t("form:PP_1_project_relocation_title"),
                      description: t(
                        "form:PP_1_project_relocation_description"
                      ),
                    },
                    continuation: {
                      type: "object",
                      title: t("form:PP_1_project_continuation_title"),
                      description: t(
                        "form:PP_1_project_continuation_description"
                      ),
                      properties: {
                        goals: {
                          type: "string",
                          title: t(
                            "form:PP_1_project_continuation_goals_title"
                          ),
                        },
                        activities: {
                          type: "string",
                          title: t(
                            "form:PP_1_project_continuation_activities_title"
                          ),
                        },
                        success: {
                          type: "string",
                          title: t(
                            "form:PP_1_project_continuation_success_title"
                          ),
                        },
                      },
                    },
                    after: {
                      type: "object",
                      title: t("form:PP_1_project_after_title"),
                      description: t("form:PP_1_project_after_description"),
                      properties: {
                        goals: {
                          type: "string",
                          title: t("form:PP_1_project_after_goals_title"),
                        },
                        activities: {
                          type: "string",
                          title: t("form:PP_1_project_after_activities_title"),
                        },
                        success: {
                          type: "string",
                          title: t("form:PP_1_project_after_success_title"),
                        },
                      },
                    },
                    impact: {
                      type: "string",
                      title: t("form:PP_1_project_impact_title"),
                      description: t("form:PP_1_project_impact_description"),
                    },
                    fit: {
                      type: "string",
                      title: t("form:PP_1_project_fit_title"),
                      description: t("form:PP_1_project_fit_description"),
                    },
                    support: {
                      type: "string",
                      title: t("form:PP_1_project_support_title"),
                      description: t("form:PP_1_project_support_description"),
                    },
                    security: {
                      type: "string",
                      title: t("form:PP_1_project_security_title"),
                      description: t("form:PP_1_project_security_description"),
                    },
                    risks: {
                      type: "string",
                      title: t("form:PP_1_project_risks_title"),
                      description: t("form:PP_1_project_risks_description"),
                    },
                  },
                },
              },
            },
          },
        },
        expenditure: {
          type: "object",
          title: t("form:PP_1_expenditure_title"),
          description: t("form:PP_1_expenditure_description"),
          properties: {},
        },
        declaration: {
          type: "object",
          title: t("form:PP_1_declaration_title"),
          properties: {
            declaration_1: {
              type: "boolean",
              title: t("form:PP_1_declaration_1"),
            },
            declaration_2: {
              type: "boolean",
              title: t("form:PP_1_declaration_2"),
            },
            declaration_3: {
              type: "boolean",
              title: t("form:PP_1_declaration_3"),
            },
            declaration_4: {
              type: "boolean",
              title: t("form:PP_1_declaration_4"),
            },
            declaration_5: {
              type: "boolean",
              title: t("form:PP_1_declaration_5"),
            },
            declaration_6: {
              type: "boolean",
              title: t("form:PP_1_declaration_6"),
            },
            declaration_7: {
              type: "boolean",
              title: t("form:PP_1_declaration_7"),
            },
            declaration_documents: {
              type: "object",
              title: t("form:PP_1_declaration_documents_title"),
              properties: {
                declaration_documents_1: {
                  type: "boolean",
                  title: t("form:PP_1_declaration_documents_1"),
                },
                declaration_documents_2: {
                  type: "boolean",
                  title: t("form:PP_1_declaration_documents_2"),
                },
                declaration_documents_3: {
                  type: "boolean",
                  title: t("form:PP_1_declaration_documents_3"),
                },
                declaration_documents_4: {
                  type: "boolean",
                  title: t("form:PP_1_declaration_documents_4"),
                },
                declaration_documents_5: {
                  type: "boolean",
                  title: t("form:PP_1_declaration_documents_5"),
                },
              },
            },
            additional_information: {
              type: "string",
              format: "textarea",
              maxLength: 3000,
              rows: 4,
              title: t("form:PP_1_declaration_additional_information"),
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
        requested_funding: {
          classNames: "col-fieldset-2",
        },
        third_party_funds: {
          classNames: "col-fieldset-2",
        },
        own_funds_equity: {
          classNames: "col-fieldset-2",
        },
        total_expenditure: {
          classNames: "col-fieldset-2",
        },
        overall_financing_guaranteed: {
          "ui:widget": "radio",
        },
        further_explaination: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
      },
      applicant_organisation: {
        description: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        funds_use: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        funding: {
          funding_funding: {
            "ui:widget": "radio",
          },
          compliance: {
            "ui:widget": "radio",
          },
          compliance_information: {
            "ui:widget": "textarea",
            "ui:options": {
              rows: 4,
            },
          },
        },
        four_eyes: {
          "ui:widget": "radio",
        },
        four_eyes_information: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        respresentatives: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        bookkeeping: {
          "ui:widget": "radio",
        },
        bookkeeping_information: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        vat: {
          "ui:widget": "radio",
        },
        deduct: {
          "ui:widget": "radio",
        },
        deduct_information: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
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
      project_description: {
        family: {
          children: {
            "ui:options": {
              orderable: false,
            },
            items: {
              classNames: "col-fieldset-2",
            },
          },
        },
        full_description: {
          current_situation: {
            "ui:widget": "textarea",
            "ui:options": {
              rows: 4,
            },
          },
          project_goals: {
            relocation: {
              "ui:widget": "textarea",
              "ui:options": {
                rows: 4,
              },
            },
            continuation: {
              goals: {
                "ui:widget": "textarea",
                "ui:options": {
                  rows: 4,
                },
              },
              activities: {
                "ui:widget": "textarea",
                "ui:options": {
                  rows: 4,
                },
              },
              success: {
                "ui:widget": "textarea",
                "ui:options": {
                  rows: 4,
                },
              },
            },
            after: {
              goals: {
                "ui:widget": "textarea",
                "ui:options": {
                  rows: 4,
                },
              },
              activities: {
                "ui:widget": "textarea",
                "ui:options": {
                  rows: 4,
                },
              },
              success: {
                "ui:widget": "textarea",
                "ui:options": {
                  rows: 4,
                },
              },
            },
            impact: {
              "ui:widget": "textarea",
              "ui:options": {
                rows: 4,
              },
            },
            fit: {
              "ui:widget": "textarea",
              "ui:options": {
                rows: 4,
              },
            },
            support: {
              "ui:widget": "textarea",
              "ui:options": {
                rows: 4,
              },
            },
            security: {
              "ui:widget": "textarea",
              "ui:options": {
                rows: 4,
              },
            },
            risks: {
              "ui:widget": "textarea",
              "ui:options": {
                rows: 4,
              },
            },
          },
        },
      },
      scholarship_holder: {
        known_from: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
          "ui:help": "Max. 500 Zeichen",
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
