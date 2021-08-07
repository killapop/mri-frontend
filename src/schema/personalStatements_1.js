export const personalStatements_1 = (t) => {
  return {
    schema: {
      title: t("form:PS_1_title"),
      description: t("form:PS_1_description"),
      type: "object",
      submitButton: t("form:common_submit"),
      saveButton: t("form:common_save_close"),
      properties: {
        personal_background: {
          title: t("form:PS_1_personal_background_title"),
          type: "object",
          properties: {
            personal_data: {
              type: "object",
              title: t("form:PS_1_personal_background_personal_data_title"),
              properties: {
                title: {
                  type: "string",
                  title: t("form:common_title_title"),
                  enum: [1, 2, 3, 4],
                  enumNames: [
                    t("form:common_title_choice_1"),
                    t("form:common_title_choice_2"),
                    t("form:common_title_choice_3"),
                    t("form:common_title_choice_4"),
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
                date_of_birth: {
                  type: "string",
                  format: "date",
                  title: t("form:common_date_of_birth"),
                },
                place_of_birth: {
                  type: "string",
                  title: t("form:PS_1_personal_background_place_of_birth"),
                },
                nationaity: {
                  type: "string",
                  title: t("form:PS_1_personal_background_citizenship"),
                },
                residency: {
                  type: "string",
                  title: t("form:PS_1_personal_background_residency"),
                },
                passport: {
                  type: "object",
                  title: "",
                  properties: {
                    passport_passport: {
                      title: t("form:PS_1_personal_background_passport"),
                      type: "string",
                      enum: [true, false],
                      enumNames: [t("form:common_yes"), t("form:common_no")],
                    },
                    passport_validity: {
                      type: "string",
                      format: "date",
                      title: t(
                        "form:PS_1_personal_background_passport_validity"
                      ),
                    },
                  },
                },
                current_location: {
                  type: "string",
                  title: t("form:PS_1_personal_background_current_location"),
                },
                current_location_away: {
                  type: "string",
                  title: t(
                    "form:PS_1_personal_background_current_location_away"
                  ),
                },
                residence_status: {
                  type: "string",
                  title: t("form:PS_1_personal_background_residence_status"),
                  description: t(
                    "form:PS_1_personal_background_residence_status_description"
                  ),
                },
              },
            },
            contact: {
              type: "object",
              title: t("form:PS_1_personal_background_contact_title"),
              description: t(
                "form:PS_1_personal_background_contact_description"
              ),
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  title: t("form:common_email"),
                },
                protonmail: {
                  type: "string",
                  title: t("form:common_protonmail"),
                },
                telephone: {
                  type: "string",
                  title: t("form:common_telephone"),
                },
                signal: { type: "string", title: t("form:common_signal") },
                wire: { type: "string", title: t("form:common_wire") },
                other: {
                  type: "string",
                  title: t("form:common_contact_other"),
                },
              },
            },
            emergency_contact: {
              type: "object",
              title: t("form:PS_1_personal_background_emergency_contact_title"),
              description: t(
                "form:PS_1_personal_background_emergency_contact_description"
              ),
              properties: {
                title: {
                  type: "string",
                  title: t("form:common_title_title"),
                  enum: [1, 2, 3, 4],
                  enumNames: [
                    t("form:common_title_choice_1"),
                    t("form:common_title_choice_2"),
                    t("form:common_title_choice_3"),
                    t("form:common_title_choice_4"),
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
                country_of_residence: {
                  type: "string",
                  title: t("form:common_country"),
                },
                email: {
                  type: "string",
                  format: "email",
                  title: t("form:common_email"),
                },
                telephone: {
                  type: "string",
                  title: t("form:common_telephone"),
                },
                others: {
                  type: "string",
                  title: t(
                    "form:PS_1_personal_background_emergency_contact_others"
                  ),
                },
                languages: {
                  type: "string",
                  title: t("form:common_languages_title"),
                  description: t(
                    "form:PS_1_personal_background_emergency_languages_description"
                  ),
                },
                relationship: {
                  type: "string",
                  title: t(
                    "form:PS_1_personal_background_emergency_relationship_title"
                  ),
                  description: t(
                    "form:PS_1_personal_background_emergency_relationship_description"
                  ),
                },
              },
            },
            qualification: {
              type: "object",
              title: t("form:PS_1_personal_background_education_title"),
              description: t(
                "form:PS_1_personal_background_education_description"
              ),
              properties: {
                institution_0: {
                  type: "object",
                  title: `${t(
                    "form:PS_1_personal_background_education_institution"
                  )} 1`,
                  properties: {
                    institution: {
                      type: "string",
                      title: t(
                        "form:PS_1_personal_background_education_institution_title"
                      ),
                    },
                    duration: {
                      type: "object",
                      title: t(
                        "form:PS_1_personal_background_education_institution_duration"
                      ),
                      properties: {
                        from: {
                          type: "string",
                          format: "date",
                          title: t("form:common_from"),
                        },
                        to: {
                          type: "string",
                          format: "date",
                          title: t("form:common_to"),
                        },
                      },
                    },
                    degree: {
                      type: "string",
                      title: t(
                        "form:PS_1_personal_background_education_institution_degree"
                      ),
                    },
                  },
                },
                institution_1: {
                  type: "object",
                  title: `${t(
                    "form:PS_1_personal_background_education_institution"
                  )} 2`,
                  properties: {
                    institution: {
                      type: "string",
                      title: t(
                        "form:PS_1_personal_background_education_institution_title"
                      ),
                    },
                    duration: {
                      type: "object",
                      title: t(
                        "form:PS_1_personal_background_education_institution_duration"
                      ),
                      properties: {
                        from: {
                          type: "string",
                          format: "date",
                          title: t("form:common_from"),
                        },
                        to: {
                          type: "string",
                          format: "date",
                          title: t("form:common_to"),
                        },
                      },
                    },
                    degree: {
                      type: "string",
                      title: t(
                        "form:PS_1_personal_background_education_institution_degree"
                      ),
                    },
                  },
                },
              },
            },
            career: {
              type: "object",
              title: t("form:PS_1_personal_background_career_title"),
              description: t(
                "form:PS_1_personal_background_career_description"
              ),
              properties: {
                postion_0: {
                  type: "object",
                  title: `${t(
                    "form:PS_1_personal_background_career_position"
                  )} 1`,
                  properties: {
                    position: {
                      type: "string",
                      title: t(
                        "form:PS_1_personal_background_career_position_profession"
                      ),
                    },
                    institution: {
                      type: "string",
                      title: t(
                        "form:PS_1_personal_background_career_position_employer"
                      ),
                    },
                    duration: {
                      type: "object",
                      title: t(
                        "form:PS_1_personal_background_career_position_duration"
                      ),
                      properties: {
                        from: {
                          type: "string",
                          format: "date",
                          title: t("form:common_from"),
                        },
                        to: {
                          type: "string",
                          format: "date",
                          title: t("form:common_to"),
                        },
                      },
                    },
                  },
                },
                postion_1: {
                  type: "object",
                  title: `${t(
                    "form:PS_1_personal_background_career_position"
                  )} 2`,
                  properties: {
                    position: {
                      type: "string",
                      title: t(
                        "form:PS_1_personal_background_career_position_profession"
                      ),
                    },
                    institution: {
                      type: "string",
                      title: t(
                        "form:PS_1_personal_background_career_position_employer"
                      ),
                    },
                    duration: {
                      type: "object",
                      title: t(
                        "form:PS_1_personal_background_career_position_duration"
                      ),
                      properties: {
                        from: {
                          type: "string",
                          format: "date",
                          title: t("form:common_from"),
                        },
                        to: {
                          type: "string",
                          format: "date",
                          title: t("form:common_to"),
                        },
                      },
                    },
                  },
                },
              },
            },
            languages: {
              type: "object",
              title: t("form:PS_1_personal_background_languages"),
              description: t(
                "form:PS_1_personal_background_languages_description"
              ),
              properties: {
                read: {
                  type: "string",
                  title: t("form:PS_1_personal_background_languages_read"),
                },
                write: {
                  type: "string",
                  title: t("form:PS_1_personal_background_languages_write"),
                },
                understand: {
                  type: "string",
                  title: t(
                    "form:PS_1_personal_background_languages_understand"
                  ),
                },
                speak: {
                  type: "string",
                  title: t("form:PS_1_personal_background_languages_speak"),
                },
              },
            },
          },
        },
        artistic_work: {
          type: "object",
          title: t("form:PS_1_artistic_title"),
          properties: {
            genre: {
              type: "string",
              title: t("form:PS_1_artistic_genre"),
              description: t("form:PS_1_artistic_genre_description"),
              maxLength: 1500,
            },
            description: {
              type: "string",
              title: t("form:PS_1_artistic_description"),
              description: t("form:PS_1_artistic_description_description"),
              maxLength: 2000,
            },
            milestones: {
              type: "string",
              title: t("form:PS_1_artistic_milestones"),
              description: t("form:PS_1_artistic_milestones_description"),
              maxLength: 1000,
            },
            further_information: {
              type: "string",
              title: t("form:PS_1_artistic_further_information"),
              description: t(
                "form:PS_1_artistic_further_information_description"
              ),
              maxLength: 1000,
            },
          },
        },
        existing_risk: {
          type: "object",
          title: t("form:PS_1_risk"),
          properties: {
            description: {
              type: "string",
              title: t("form:PS_1_risk_description_title"),
              description: t("form:PS_1_risk_description_description"),
              maxLength: 2500,
            },
            references: {
              type: "string",
              title: t("form:PS_1_risk_references_title"),
              description: t("form:PS_1_risk_references_description"),
              maxLength: 1000,
            },
            public_relations: {
              type: "string",
              title: t("form:PS_1_risk_pr_title"),
              description: t("form:PS_1_risk_pr_description"),
              maxLength: 1000,
            },
            referees: {
              type: "object",
              title: t("form:PS_1_risk_referees_title"),
              description: t("form:PS_1_risk_referees_description"),
              properties: {
                reference_1: {
                  type: "object",
                  title: `${t("form:common_reference")} 1`,
                  properties: {
                    name: {
                      type: "string",
                      title: t("form:common_full_name"),
                    },
                    position: {
                      type: "string",
                      title: t("form:common_position"),
                    },
                    institution: {
                      type: "string",
                      title: t("form:common_institution"),
                    },
                    email: {
                      type: "string",
                      format: "email",
                      title: t("form:common_email"),
                    },
                    protonmail: {
                      type: "string",
                      title: t("form:common_protonmail"),
                    },
                    telephone: {
                      type: "string",
                      title: t("form:common_telephone"),
                    },
                    signal: {
                      type: "string",
                      title: t("form:common_signal"),
                    },
                    wire: {
                      type: "string",
                      title: t("form:common_wire"),
                    },
                    languages: {
                      type: "string",
                      title: t("form:common_languages_title"),
                    },
                  },
                },
                reference_2: {
                  type: "object",
                  title: `${t("form:common_reference")} 2`,
                  properties: {
                    name: {
                      type: "string",
                      title: t("form:common_full_name"),
                    },
                    position: {
                      type: "string",
                      title: t("form:common_position"),
                    },
                    institution: {
                      type: "string",
                      title: t("form:common_institution"),
                    },
                    email: {
                      type: "string",
                      format: "email",
                      title: t("form:common_email"),
                    },
                    protonmail: {
                      type: "string",
                      title: t("form:common_protonmail"),
                    },
                    telephone: {
                      type: "string",
                      title: t("form:common_telephone"),
                    },
                    signal: {
                      type: "string",
                      title: t("form:common_signal"),
                    },
                    wire: {
                      type: "string",
                      title: t("form:common_wire"),
                    },
                    languages: {
                      type: "string",
                      title: t("form:common_languages_title"),
                    },
                  },
                },
              },
            },
          },
        },
        host_institution: {
          type: "object",
          title: t("form:PS_1_host_title"),
          properties: {
            name: { type: "string", title: t("form:PS_1_host_name") },
            contat_person: {
              type: "string",
              title: t("form:PS_1_host_contact_person"),
            },
            artistic_work: {
              type: "string",
              title: t("form:PS_1_host_work_title"),
              description: t("form:PS_1_host_work_description"),
              maxLength: 2000,
            },
            fit: {
              type: "string",
              title: t("form:PS_1_host_fit_title"),
              description: t("form:PS_1_host_fit_description"),
              maxLength: 2000,
            },
          },
        },
        after_scholarship: {
          type: "object",
          title: t("form:PS_1_after_title"),
          description: t("form:PS_1_after_description"),
          properties: {
            return: {
              type: "string",
              title: t("form:PS_1_after_return_title"),
              maxLength: 1000,
            },
            exit_strategy: {
              type: "string",
              title: t("form:PS_1_after_exit_strategy_title"),
              description: t("form:PS_1_after_exit_strategy_description"),
              maxLength: 1000,
            },
            after: {
              type: "string",
              title: t("form:PS_1_after_after_title"),
              maxLength: 2000,
            },
          },
        },
        other: {
          type: "object",
          title: t("form:PS_1_other_title"),
          properties: {
            relatives: {
              type: "string",
              title: t("form:PS_1_other_relatives_title"),
              description: t("form:PS_1_other_relatives_description"),
              maxLength: 500,
            },
            special_support: {
              type: "string",
              title: t("form:PS_1_other_support_title"),
              description: t("form:PS_1_other_support_description"),
              maxLength: 500,
            },
            funding_contact: {
              type: "string",
              title: t("form:PS_1_other_funding_contact_title"),
              description: t("form:PS_1_other_funding_contact_description"),
              maxLength: 1000,
            },
            further_information: {
              type: "string",
              title: t("form:PS_1_other_further_title"),
              description: t("form:PS_1_other_further_description"),
              maxLength: 1000,
            },
            other_1: {
              type: "boolean",
              title: t("form:PS_1_others_1"),
            },
            // other_2: {
            //   type: "boolean",
            //   title: t("form:PS_1_others_2"),
            // },
            other_3: {
              type: "boolean",
              title: t("form:PS_1_others_3"),
            },
            other_4: {
              type: "boolean",
              title: t("form:PS_1_others_4"),
            },
            other_5: {
              type: "boolean",
              title: t("form:PS_1_others_5"),
            },
            other_6: {
              type: "boolean",
              title: t("form:PS_1_others_6"),
            },
            other_7: {
              type: "boolean",
              title: t("form:PS_1_others_7"),
            },
            other_8: {
              type: "boolean",
              title: t("form:PS_1_others_8"),
            },
          },
        },
      },
    },
    uiSchema: {
      personal_background: {
        personal_data: {
          date_of_birth: {},
          nationaity: {
            "ui:help": t("form:PS_1_personal_background_citizenship_help"),
          },
          residency: {
            "ui:widget": "textarea",
            "ui:options": { rows: 4 },
          },
          passport: {
            passport_passport: {
              // "ui:widget": "radio",
            },
          },
          current_location_away: {
            "ui:widget": "textarea",
            "ui:options": { rows: 4 },
          },
        },
        contact: {
          other: {
            "ui:widget": "textarea",
            "ui:options": {
              rows: 4,
            },
          },
        },
      },
      artistic_work: {
        genre: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        description: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        milestones: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        further_information: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
      },
      existing_risk: {
        description: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        references: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        public_relations: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
      },
      host_institution: {
        artistic_work: {
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
      },
      after_scholarship: {
        return: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        exit_strategy: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        after: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
      },
      other: {
        relatives: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        special_support: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        funding_contact: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        additional_information: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        german_collaboration: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        further_information: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
      },
    },
  };
};
