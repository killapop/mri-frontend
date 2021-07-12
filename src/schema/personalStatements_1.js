export const personalStatements_1 = (t) => {
  return {
    schema: {
      title: t("form:personal_statement_1_title"),
      type: "object",
      submitButton: "Submit statement",
      saveButton: "Save",
      properties: {
        personal_background: {
          title: "1. PERSONAL BACKGROUNDs",
          type: "object",
          properties: {
            personal_data: {
              type: "object",
              title: "1.1. Personal data",
              properties: {
                title: {
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
                date_of_birth: {
                  type: "string",
                  format: "date",
                  title: "Date of birth",
                },
                place_of_birth: {
                  type: "string",
                  title: "Place of birth",
                },
                nationaity: {
                  type: "string",
                  title: "Nationality/ ies",
                },
              },
            },
            contact: {
              type: "object",
              title: "1.2. Contact",
              properties: {
                address: {
                  type: "string",
                  title: "Address",
                },
                postal_code: {
                  type: "string",
                  title: "Postal code",
                },
                city: {
                  type: "string",
                  title: "City",
                },
                country: {
                  type: "string",
                  title: "Country",
                },
                residence_status: {
                  type: "string",
                  title: "Residence status",
                  description:
                    "(citizen, temporary residence permit until …, tourist visa, etc.)",
                },
                email: {
                  type: "string",
                  format: "email",
                  title: "Email",
                },
                telephone: {
                  type: "string",
                  title: "Telephone",
                },
                signal: { type: "string", title: "Signal" },
                wire: { type: "string", title: "Wire" },
                protonmail: { type: "string", title: "Protonmail" },
                alternative_address: {
                  type: "string",
                  title: "Alternative address",
                  description:
                    "Where are you currently located and since when have you been there (if not at the address stated above - country, city, institution if applicable)?",
                },
              },
            },
            emergency_contact: {
              type: "object",
              title: "1.3. Emergency contact",
              properties: {
                title: {
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
                country_of_residence: {
                  type: "string",
                  title: "Country of residence",
                },
                email: {
                  type: "string",
                  title: "Email",
                  format: "email",
                },
                telephone_0: {
                  type: "string",
                  title: "Telephone number",
                },
                telephone_1: {
                  type: "string",
                  title: "Alternative Telephone numbers",
                },
                languages: {
                  type: "string",
                  title: "Language(s) of communication",
                },
                relationship: {
                  type: "string",
                  title: "Relationship",
                  description: "What is your relationship with this person",
                },
              },
            },
            qualification: {
              type: "object",
              title: "1.4. Academic or professional education",
              properties: {
                institution_0: {
                  type: "object",
                  title: "Institution 1",
                  properties: {
                    institution: {
                      type: "string",
                      title: "Institution/Employer/School",
                    },
                    duration: {
                      type: "object",
                      title: "Duration",
                      properties: {
                        from: {
                          type: "string",
                          format: "date",
                          title: "From",
                        },
                        to: {
                          type: "string",
                          format: "date",
                          title: "To",
                        },
                      },
                    },
                    degree: {
                      type: "string",
                      title: "Degree",
                    },
                  },
                },
                institution_1: {
                  type: "object",
                  title: "Institution 2",
                  properties: {
                    institution: {
                      type: "string",
                      title: "Institution/Employer/School",
                    },
                    duration: {
                      type: "object",
                      title: "Duration",
                      properties: {
                        from: {
                          type: "string",
                          format: "date",
                          title: "From",
                        },
                        to: {
                          type: "string",
                          format: "date",
                          title: "To",
                        },
                      },
                    },
                    degree: {
                      type: "string",
                      title: "Degree",
                    },
                  },
                },
              },
            },
            career: {
              type: "object",
              title: "1.5. Professional career",
              description:
                "What is your current profession / What were the last professions you worked in?",
              properties: {
                postion_0: {
                  type: "object",
                  title: "Position 1",
                  properties: {
                    position: {
                      type: "string",
                      title: "Profession/ Position",
                    },
                    institution: {
                      type: "string",
                      title: "Employer/ self-employed",
                    },
                    duration: {
                      type: "object",
                      title:
                        "During which period did you work in this profession?",
                      properties: {
                        from: {
                          type: "string",
                          format: "date",
                          title: "From",
                        },
                        to: {
                          type: "string",
                          format: "date",
                          title: "Until",
                        },
                      },
                    },
                  },
                },
                postion_1: {
                  type: "object",
                  title: "Position 2",
                  properties: {
                    position: {
                      type: "string",
                      title: "Profession/ Position",
                    },
                    institution: {
                      type: "string",
                      title: "Employer/ self-employed",
                    },
                    duration: {
                      type: "object",
                      title:
                        "During which period did you work in this profession?",
                      properties: {
                        from: {
                          type: "string",
                          format: "date",
                          title: "From",
                        },
                        to: {
                          type: "string",
                          format: "date",
                          title: "Until",
                        },
                      },
                    },
                  },
                },
              },
            },
            languages: {
              type: "object",
              title: "1.5. Language skills",
              description:
                "list languages for each ability separated by commas",
              properties: {
                read: { type: "string", title: "Read" },
                write: { type: "string", title: "Write" },
                understand: { type: "string", title: "Understand" },
                speak: { type: "string", title: "Speak" },
              },
            },
          },
        },
        host_institution: {
          type: "object",
          title: "2. Host Institution",
          properties: {
            contact_details: {
              type: "object",
              title: "2.1. Contact details",
              properties: {
                name: { type: "string", title: "Name of Institution" },
                address: {
                  type: "string",
                  title: "Street and house number",
                },
                postal_code: { type: "string", title: "Postal code" },
                city: { type: "string", title: "City" },
                country: { type: "string", title: "Country" },
                email: { type: "string", title: "Email" },
                telephone: { type: "string", title: "Telephone" },
                contact_person: {
                  type: "object",
                  title: "Contact person",
                  properties: {
                    surname: {
                      type: "string",
                      title: "Surname",
                    },
                    first_name: {
                      type: "string",
                      title: "First name",
                    },
                    email: {
                      type: "string",
                      format: "email",
                      title: "E-mail",
                    },
                    telephone: {
                      type: "string",
                      title: "Telephone",
                    },
                  },
                },
              },
            },
            connection_to_host: {
              type: "string",
              title: "2.4. Connection to host institution",
              description:
                "Where did you learn about the host institution? Why would you like to collaborate with the host institution? (Max 500 characters)",
              maxLength: 500,
            },
          },
        },
        artistic_work: {
          type: "object",
          title: "3. ARTISTIC/CULTURAL WORK",
          properties: {
            genre: {
              type: "string",
              title: "3.1. Artistic/cultural genre",
              description:
                "Please state the artistic/cultural genre you work in",
              maxLength: 1500,
            },
            description: {
              type: "string",
              title: "3.2. Description of artistic/cultural work",
              description:
                "Please describe your artistic/cultural work.  Please state since when you have been undertaking your artistic/cultural work.",
              maxLength: 2000,
            },
            milestones: {
              type: "string",
              title: "3.3. Professional milestones",
              description:
                "Please describe the most important professional milestones in your career from your point of view.",
              maxLength: 1000,
            },
          },
        },
        existing_risk: {
          type: "object",
          title: "4. Existing risk",
          properties: {
            description: {
              type: "string",
              title: "4.1. Description of the security situation",
              description:
                "The Martin Roth initiative supports artists who are at risk, who face threats, are under surveillance and/or are being persecuted by state and/or non-state actors because of their work or due to other circumstances. <p>Please describe your individual security situation and be as specific as possible, listing incidents and dates. </p>Please also give more general information about the political situation in your country if you feel this is important for context.",
              maxLength: 2500,
            },
            references: {
              type: "string",
              title: "4.2. References to the security situation",
              description:
                "Please attach references to your personal statement supporting your security concerns (e.g. articles, links, police reports, comments on the context of the threat)",
              maxLength: 1000,
            },
            public_relations: {
              type: "string",
              title: "4.3. Public relations",
              description:
                "To what extent would it be possible for you to appear in public, publish work or to make any other public appearance within the scope of the scholarship? <p>Is it possible for you to appear publicly as a fellow of the Martin Roth Initiative? </p> Give details of the security-related implications for you and your relatives.",
              maxLength: 1000,
            },
          },
        },
        scholarship_period: {
          type: "object",
          title: "5. PERIOD DURING/ FOLLOWING THE SCHOLARSHIP",
          properties: {
            artistic_goal: {
              type: "string",
              title: "5.1. Professional/artistic goal",
              description:
                "What are your expectations for this scholarship at a professional/artistic level? To what extent can your professional and/or artistic work benefit from the scholarship and the collaboration with the host institution?",
              maxLength: 1000,
            },
            integration: {
              type: "string",
              title: "5.2. Integration",
              description:
                "In your opinion, which measures would contribute to a successful integration in Germany?",
              maxLength: 1000,
            },
            after: {
              type: "string",
              title: "5.3. After the scholarship / return",
              description:
                "What could help you to resume / continue your work in your home country?",
              maxLength: 2000,
            },
          },
        },
        other: {
          type: "object",
          title: "6. Other",
          properties: {
            relatives: {
              type: "string",
              title: "6.1. Relatives",
              description:
                "Are you planning to leave the country with relatives? If so, please enter the names of the relatives, their dates of birth as well as your relation to each person here. Please explain why the respective family member accompanying you appears to be necessary.",
              maxLength: 500,
            },
            special_support: {
              type: "string",
              title: "6.2. Special support",
              description:
                "Do you require special support due to health and wellbeing issues, disabilities or for other reasons?",
              maxLength: 500,
            },
            references: {
              type: "object",
              title: "6.3. Referees",
              description:
                "Please list two referees who know you, your work and the dangerous situation you are in well. <br/>Please ensure that all of your referees agree to providing their personal data and that they also receive the enclosed data protection information.<br/>The referees you enter cannot be members of the host organisation and must speak either English, French, Spanish or German",
              properties: {
                reference_1: {
                  type: "object",
                  title: "Reference 1",
                  properties: {
                    name: {
                      type: "string",
                      title: "Name",
                    },
                    position: {
                      type: "string",
                      title: "position",
                    },
                    institution: {
                      type: "string",
                      title: "Institution",
                    },
                    email: {
                      type: "string",
                      title: "Email",
                      format: "email",
                    },
                    telephone: {
                      type: "string",
                      title: "Telephone",
                    },
                    languages: {
                      type: "string",
                      title: "Language(s) of communication",
                    },
                  },
                },
                reference_2: {
                  type: "object",
                  title: "Reference 2",
                  properties: {
                    name: {
                      type: "string",
                      title: "Name",
                    },
                    position: {
                      type: "string",
                      title: "position",
                    },
                    institution: {
                      type: "string",
                      title: "Institution",
                    },
                    email: {
                      type: "string",
                      title: "Email",
                      format: "email",
                    },
                    telephone: {
                      type: "string",
                      title: "Telephone",
                    },
                    languages: {
                      type: "string",
                      title: "Language(s) of communication",
                    },
                  },
                },
              },
            },
            additional_information: {
              type: "string",
              title: "Additional information",
              description:
                "You have the possibility to add, respectively attach references to this application in the form of project links, project documentation, press releases and media reports on your work, etc. List your attachments and references here:",
              maxLength: 500,
            },
            funding_contact: {
              type: "string",
              title: "6.4. Contact with other funding programmes",
              description:
                "Have you already contacted other relocation or shelter programmes? If so, which organisations have you contacted?",
              maxLength: 1000,
            },
            german_collaboration: {
              type: "string",
              title: "6.5. Collaboration with organisations from Germany",
              description:
                "Have you previously worked with organisations from or in Germany respectively and/or received scholarships? If so, please elaborate.",
              maxLength: 1000,
            },
            further_information: {
              type: "string",
              title: "6.6. Further information",
              description:
                "Is there anything else you would like to inform us about? Please use this field to do so",
              maxLength: 1000,
            },
            other_1: {
              type: "boolean",
              title:
                "You hereby confirm that you do not have permanent access to a safe third country (e.g. by virtue of dual citizenship or for other reasons).",
            },
            other_2: {
              type: "boolean",
              title:
                "You hereby confirm that you hold a valid passport both before and during the period of the scholarship and that you are able to leave the country in which you are currently residing.",
            },
            other_3: {
              type: "boolean",
              title:
                "You hereby assure that you will coordinate matters with your host institution prior to carrying out any activities that are relevant to the general public and, in general, all matters with regard to public relations",
            },
            other_4: {
              type: "boolean",
              title:
                "You herewith confirm to agree to the processing of your data for working on your application and regarding other purposes listed in the information sheet on data protection.",
            },
            other_5: {
              type: "boolean",
              title:
                "You herewith confirm that you and your listed referees and contacts have duly received and noted the details on privacy highlighted in the document <a href='https://martin-roth-initiative.de/en/application#pid-112' target='_blank'>“Information on data protection and processing of your personal data according to GDPR”</a> and that you and your referees and contacts agree to the outlined intended use.",
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
            "ui:help": "Specify contries separated by commas",
          },
        },
        contact: {
          address: {
            "ui:widget": "textarea",
            "ui:options": {
              rows: 4,
            },
            alternative_address: {
              "ui:widget": "textarea",
              "ui:options": {
                rows: 4,
              },
            },
          },
        },
      },
      host_institution: {
        connection_to_host: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
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
      scholarship_period: {
        artistic_goal: {
          "ui:widget": "textarea",
          "ui:options": {
            rows: 4,
          },
        },
        integration: {
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
