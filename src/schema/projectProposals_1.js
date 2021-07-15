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
              description: t("form:PP_1_applicant_deduct_description"),
              enum: [1, 0],
              enumNames: [t("form:common_yes"), t("form:common_no")],
            },
            deduct_information: {
              type: "string",
              title: t("form:PP_1_overview_further_explaination_title"),
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
              title: "Woher kennen Sie den*die Stipendiat*in?",
              maxLength: 500,
            },
            relevance: {
              type: "string",
              title:
                "Begründen Sie bitte, warum Sie mit der Stipendiatin*dem Stipendiaten zusammenarbeiten möchten? Bitte gehen Sie dabei auf das künstlerische/kulturelle Schaffen (und die Relevanz dieses Schaffens) der Person ein und warum die Zusammenarbeit einen Mehrwert für Ihre Institution und/oder die kulturelle Szene, in der Sie tätig sind, bedeutet.",
              maxLength: 2000,
            },
          },
        },
        background_information: {
          type: "object",
          title:
            "4. HINTERGRUNDINFORMATIONEN ZUR ANTRAGSTELLENDEN ORGANISATION UND ZU PARTNERORGANISATIONEN",
          properties: {
            brief_description: {
              type: "string",
              title: "4.1. Kurzbeschreibung",
              format: "textarea",
              maxLength: 2500,
              description:
                "Bitte stellen Sie Ihre Organisation und Ihre Partnerorganisation(en) dar (Tätigkeitsfelder, bisherige Aktivitäten und deren Finanzierung/Projektförderung, Struktur und Personal)",
            },
            use_of_funds: {
              type: "string",
              title: "4.2. Mittelverwendung und Abrechnung",
              format: "textarea",
              maxLength: 500,
              description:
                "Wie gewährleisten Sie die ordnungsgemäße Verwendung und Abrechnung der beantragten Förderung (BHO, Buchhaltung, 4-Augen Prinzip etc.)?",
            },
          },
        },
        project_planning: {
          type: "object",
          title: "5. PROJEKTPLANUNG",
          description:
            "Bitte stellen Sie das geplante Vorhaben vor und verdeutlichen Sie, wie genau die Stipendiatin*der Stipendiat Ihre Institution eingebunden werden soll. Gehen Sie bitte auch kurz auf die Rolle möglicher Partnerorganisationen ein.",
          properties: {
            project_goal: {
              type: "string",
              title: "5.1. Projektziel",
              format: "textarea",
              maxLength: 500,
              description:
                "Beschreiben Sie das konkrete Ziel, das mit dem Projekt erreicht werden soll.",
            },
            measures_and_activities: {
              type: "string",
              title: "5.2. Maßnahmen und Aktivitäten",
              format: "textarea",
              maxLength: 2500,
              description:
                "Welche konkreten Projektmaßnahmen sollen durchgeführt werden, um das Ziel zu erreichen (inkl. jeweiliger Schritte, Weichenstellungen, Meilensteine)?",
            },
            indicators: {
              type: "string",
              title: "5.3. Indikatoren",
              format: "textarea",
              maxLength: 1500,
              description:
                "Anhand welcher Kriterien soll der Erfolg dieses Projektes belegt/gemessen werden?",
            },
            impact: {
              type: "string",
              title: "5.4. Wirkung",
              format: "textarea",
              maxLength: 1000,
              description:
                "Bitte beschreiben Sie, welche nachhaltige Wirkung Sie mit dem Projekt erzielen möchten.",
            },
            risks_side_effects: {
              type: "string",
              title: "5.5. Risiken/Nebeneffekte",
              format: "textarea",
              maxLength: 1000,
              description:
                "Welche Risiken und unerwünschten Nebeneffekte können Projektziel und Wirkungen beeinträchtigen? Wie können diese Risiken minimiert werden? Benennen Sie ggf. auch mögliche positive Nebeneffekte.",
            },
          },
        },
        protection_support_concept: {
          type: "object",
          title: "6. SCHUTZ- UND BEGLEITKONZEPT FÜR STIPENDIAT*INNEN",
          description:
            "Bitte stellen Sie das Konzept Ihrer Institution für Betreuung, Sicherheit, Rückkehr/Integration, etc. dar. Beschreiben Sie ggf. die Rolle und den Mehrwert Ihrer Partnerorganisationen, sofern Sie dies nicht bereits unter Projektplanung aufgeführt haben.",
          properties: {
            supervision_support: {
              type: "string",
              title: "6.1. Betreuung und Unterstützung",
              format: "textarea",
              maxLength: 2000,
              description:
                "Wie gewährleisten Sie die fortlaufende Betreuung während der Projektlaufzeit? Nehmen Sie ggf. Bezug zu spezifischen Unterstützungsbedarfen.",
            },
            integration: {
              type: "string",
              title: "6.2. Integration in die Gastinstitution",
              format: "textarea",
              maxLength: 2000,
              description:
                "Bitte beschreiben Sie, inwiefern der*die Stipendiat*in über das Potenzial verfügt, sich in den Betrieb der Gastinstitution zu integrieren.",
            },
            couselling_oppotunities: {
              type: "string",
              title:
                "6.3. Beratungsangebote im Bereich der beruflichen Orientierung",
              format: "textarea",
              maxLength: 2000,
              description:
                "Welche Beratungsangebote stellt Ihre Einrichtung der*dem Stipendiatin*en im Hinblick auf die weitere berufliche Orientierung (innerhalb oder außerhalb des Kulturbetriebs) für die Zeit nach Ablauf des Stipendiums zur Verfügung? (Wenn bereits unter Projektplanung, genügt ein Verweis)",
            },
            period_after: {
              type: "string",
              title: "6.4. Zeit nach Ablauf der Förderung",
              format: "textarea",
              maxLength: 1500,
              description:
                "Welche Möglichkeiten sehen Sie, der*dem Stipendiatin*en Orientierung für die Zeit nach Ablauf der Förderung zu geben?",
            },
            safety_measures: {
              type: "string",
              title: "6.5.1 Sicherheit",
              format: "textarea",
              maxLength: 2000,
              description:
                "Welche grundlegenden Sicherheitsmaßnahmen (etwa sichere Kommunikation, Datensicherheit, Vertraulichkeit etc.) planen Sie umzusetzen?",
            },
            safety_protocols: {
              type: "string",
              title: "6.5.2 Sicherheitsprotkollen",
              format: "textarea",
              maxLength: 1500,
              description:
                "Haben Sie bereits erste Schritte zur Erarbeitung von Sicherheitsprotokollen unternommen? Wenn ja, welche?",
            },
            integrations: {
              type: "string",
              title: "6.6. Integration in Deutschland",
              format: "textarea",
              maxLength: 2000,
              description:
                "Bitte beschreiben Sie Ideen, Ziele und Maßnahmen, die zu einer gelungenen Integration der*des Stipendiatin*en in Deutschland beitragen sollen.",
            },
            return: {
              type: "string",
              title: "6.7. Rückkehr ins Heimatland",
              format: "textarea",
              maxLength: 2000,
              description:
                "Bitte beschreiben Sie ggf. Ideen, Ziele und Maßnahmen, die eine sichere Rückkehr ins Heimatland mit nachhaltiger Zukunftsperspektive unterstützen sollen.",
            },
            public_relations: {
              type: "string",
              title: "6.8. Öffentlichkeitsarbeit",
              format: "textarea",
              maxLength: 2000,
              description:
                "Es ist möglich, dass es zu widerstrebenden Interessen mit Blick auf einerseits Schutzbedürfnis von Stipendiat*innen und andererseits Bedürfnis nach Öffentlichkeitsarbeit kommt. Wie gehen Sie mit einer solchen Situation um? Wie berücksichtigen Sie die Interessen von Stipendiat*innen?",
            },
          },
        },
        other: {
          type: "object",
          title: "7. SONSTIGES",
          properties: {
            other_1: {
              type: "boolean",
              title:
                "Die antragstellende Institution verpflichtet sich hiermit, sich im Vorfeld des Aufenthalts rechtzeitig und verantwortlich um die Erfüllung der aufenthaltsrechtlichen Voraussetzungen für den Aufenthalt zu kümmern sowie Sorge und Verantwortung für arbeitsrechtliche Belange zu tragen.",
            },
            other_2: {
              type: "boolean",
              title:
                "Die antragstellende Institution verpflichtet sich hiermit, immer in Absprache und unter Berücksichtigung der Interessen der Stipendiat*innen zu handeln sowie die Vertraulichkeit ihrer Mitarbeitenden zu gewährleisten. Alle Maßnahmen der Presse- und Öffentlichkeitsarbeit müssen im Vorfeld eng mit den Stipendiat*innen und der Martin Roth-Initiative abgesprochen werden.",
            },
            other_3: {
              type: "boolean",
              title:
                "Das Projekt wurde noch nicht begonnen oder bereits durchgeführt",
            },
            other_4: {
              type: "boolean",
              title:
                "Eine zweckentsprechende Verwendung der Mittel wird garantiert.",
            },
            other_5: {
              type: "boolean",
              title:
                "Die Gastinstitution verpflichtet sich, stets gemäß den Interessen der gefährdeten Kulturschaffenden zu handeln. Im Falle unerwarteter Ereignisse, absehbaren Risiken oder auftretender Zweifel verpflichtet sich die Gastinstitution, unverzüglich die Martin Roth-Initiative zu kontaktieren.",
            },
            other_6: {
              type: "boolean",
              title:
                "Hiermit bestätigen Sie, dass Sie und die von Ihnen angegebenen Personen die Datenschutzhinweise zur Kenntnis genommen haben und mit den beschriebenen Nutzungszwecken einverstanden sind.",
            },
            other_7: {
              type: "string",
              title:
                "Möchten Sie uns noch etwas mitteilen? Nutzen Sie hierfür bitte dieses Feld:",
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
