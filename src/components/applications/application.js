import React from "react";
import { Redirect, Link } from "react-router-dom";
import Form from "react-jsonschema-form";
// import jsPDF from "jspdf";
import _ from "lodash";
import { authStore } from "../../lib/store";
import { view } from "react-easy-state";
import Clock from "../../components/common/clock";
import { apiCall } from "../../lib/api-calls";
import { add as addMessage } from "../../lib/message";
import History from "./history";
import Comments from "./comments";
import Attachments from "./attachments";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.lockHandler = this.lockHandler.bind(this);
    this.errors = this.errors.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.tabHandler = this.tabHandler.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.finalizeForm = this.finalizeForm.bind(this);
    this.unfinalizeForm = this.unfinalizeForm.bind(this);
    this.saveAndExit = this.saveAndExit.bind(this);
    this.exportPDF = this.exportPDF.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleFormButtons = this.toggleFormButtons.bind(this);
    this.renderTextareas = this.renderTextareas.bind(this);
    this.state = {
      form: {},
      bundle: "",
      account: {},
      attachments: [],
      history: [],
      schema: {},
      uiSchema: {},
      errors: {},
      locked: false,
      noValidate: true,
      forms: {},
      close: false,
      unfinalize: false,
      containerSticky: false,
      currentTab: "attachments",
      isSidebarOpen: false,
      isFormButtonsOpen: false,
      formKey: Math.random(),
      tabs: [
        { title: "history", icon: "clipboard-list" },
        { title: "comments", icon: "comments" },
        { title: "attachments", icon: "paperclip" }
      ]
    };
    this.form = React.createRef();
  }

  async componentDidMount() {
    await this.fetchData().then(() => this.renderTextareas());
  }

  renderTextareas() {
    const descriptions = document.querySelectorAll(".field-description");
    if (!descriptions) {
      return false;
    } else {
      _.forEach(descriptions, description => {
        const text = description.innerHTML;
        const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
        const text1 = text
          ? text
              .replace(exp, "<a target='_blank' href='$1'>$1</a>")
              .replace("&lt;p&gt;", "<p>")
              .replace("&lt;/p&gt;", "</p>")
          : "";
        description.innerHTML = text1;
      });
    }
    const labels = document.querySelectorAll("label span");
    if (!labels) {
      return false;
    } else {
      _.forEach(labels, label => {
        const text = label.innerHTML;
        const text1 = text
          ? text
              .replace("&lt;a", "<a")
              .replace("&gt;", ">")
              .replace("&lt;/a&gt;", "</a>")
          : "";
        label.innerHTML = text1;
      });
    }

    if (this.state.disabled) {
      const elements = document.getElementsByTagName("TEXTAREA");
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const inputs = document.querySelectorAll(
        "input:not([type='checkbox']), select",
        !""
      );

      if (!elements) {
        return false;
      } else {
        _.forEach(elements, element => {
          element.style.height = `${element.scrollHeight}px`;
          element.removeAttribute("disabled");
          element.setAttribute("readonly", true);
          element.setAttribute("tabindex", "-1");
          element.classList.add("b");
          element.classList.add("dn");
          element.insertAdjacentHTML(
            "afterend",
            "<p class='tmpDisplay b pa1 ba b--black-10'>" +
              element.innerHTML.replace(/\r?\n/g, "<br/>") +
              "</p>"
          );
          element.parentNode.classList.add("tmpDisplay-container");
        });
      }
      if (!checkboxes) {
        return false;
      } else {
        _.forEach(checkboxes, checkbox => {
          checkbox.insertAdjacentHTML(
            "beforebegin",
            `<span class='fa fa-${
              checkbox.checked ? "check-square green" : "square red"
            }'></span>`
          );
          checkbox.parentNode.classList.add("pl0", "flex", "items-start");
          checkbox.parentNode.style.paddingLeft = "0";
          checkbox.nextSibling.classList.add("ml2");
          checkbox.classList.add("dn");
        });
      }

      if (!inputs) {
        return false;
      } else {
        _.forEach(inputs, input => {
          input.insertAdjacentHTML(
            "afterend",
            `<span class='tmpDisplay'>${
              input.tagName === "SELECT"
                ? input.selectedOptions[0].label
                : input.value
            }</span>`
          );
          input.style.display = "none";
        });
      }
    }
  }

  async fetchData() {
    try {
      const appData = await apiCall(
        "GET",
        "/applications/" + this.props.match.params.id,
        "",
        true
      );
      const attachmentData = await apiCall(
        "GET",
        "/applications/" + this.props.match.params.id + "/attachments",
        "",
        true
      );
      const formData = await apiCall("GET", "/forms/" + appData.form, "", true);
      if (authStore.user.roles.indexOf("mri-staff") !== -1) {
        _.merge(formData.template.schema, {
          title: `${formData.template.schema.title} ${
            formData.id.indexOf("-1.json") !== -1 ? "PL1" : "PL2"
          }`
        });
      }
      this.setState(state => ({
        form: appData,
        account: appData.account,
        type: "",
        history: appData.history,
        attachments: attachmentData === 404 ? [] : attachmentData,
        schema: formData.template.schema,
        uiSchema: formData.template.uiSchema,
        disabled:
          authStore.user.roles.indexOf("mri-staff") !== -1 ||
          (authStore.user.roles.indexOf("mri-staff") === -1 &&
            ["finalized", "locked"].includes(appData.state))
      }));
    } catch (err) {
      console.log(err);
      addMessage(
        "danger",
        "There was a problem connecting to the server. Please try again after some time or contact us info@mri-application.de"
      );
    }
  }

  async lockHandler(ev) {
    this.setState(state => ({
      type: "lock"
    }));
    await this.form.current.onSubmit(ev);
  }

  tabHandler(e) {
    e.persist();
    this.setState(state => ({ currentTab: e.target.id }));
  }

  async finalizeForm(ev) {
    this.setState(state => ({
      locked: true,
      close: true
    }));
    await this.form.current.onSubmit(ev);
  }

  async unfinalizeForm(ev) {
    this.setState(state => ({
      unfinalize: true,
      close: true
    }));
    await this.form.current.onSubmit(ev);
  }

  async saveAndExit(ev) {
    await this.form.current.onSubmit(ev);
    this.setState(state => ({ close: true }));
  }

  async saveForm(ev) {
    await this.form.current.onSubmit(ev);
  }

  async formSubmitHandler({ formData }) {
    let body = {};
    let message = "";
    if (this.state.type === "lock") {
      body = { type: this.state.type };
      message = "The form has been locked and no further editing is allowed";
    } else if (this.state.unfinalize) {
      body = { type: "unfinalize" };
      message = "The form has been unfinalized and is editable";
    } else {
      body = { type: this.state.locked ? "submit" : "save", formData };
      message = this.state.locked
        ? "Your form has been submitted for review and validation"
        : "Your form has been temporarily saved";
    }
    await apiCall(
      "PUT",
      "/applications/" + this.props.match.params.id,
      JSON.stringify(body),
      true
    )
      .then(data => {
        if (data === 500) {
          addMessage(
            "danger",
            "There was a problem connecting to the server. Please try again after some time or contact us info@mri-application.de"
          );
        } else if (data) {
          this.setState(state => ({
            form: data,
            account: data.account,
            history: data.history
          }));
          addMessage("success", message);
        }
      })
      .then(() => {
        if (this.state.close) {
          return this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
        addMessage("danger", "Error retrieving data");
      });
  }

  async exportPDF(ev) {
    // ev.persist();
    // const textareas = document.getElementsByTagName("TEXTAREA");
    // // window.onbeforeprint = ev => {
    // //   _.forEach(textareas, t => {
    // //     t.insertAdjacentHTML(
    // //       "afterend",
    // //       "<p class='tmpDisplay'>" +
    // //         t.innerHTML.replace(/\r?\n/g, "<br/>") +
    // //         "</p>"
    // //     );
    // //     t.style.display = "none";
    // //   });
    // // };
    // _.forEach(textareas, t => (t.style.display = "initial"));
    // const fileName = this.props.match.params.id + ".pdf";
    // const doc = new jsPDF("p", "pt", "a4");
    // const elementHandler = {
    //   "#ignorePDF": function(element, renderer) {
    //     return true;
    //   }
    // };
    // const printElement = document.getElementById("application-form");
    // _.forEach(printElement.elements, (element, idx) => {
    //   switch (element.type) {
    //     case "text":
    //     case "number":
    //     case "email":
    //     case "tel":
    //     case "date":
    //     case "url":
    //       element.insertAdjacentHTML(
    //         "afterend",
    //         '<div class="tmpDisplay" style="border: 1px solid #3331; padding: 10px;">' +
    //           element.value +
    //           "</div>"
    //       );
    //       break;
    //     case "select-one":
    //       element.insertAdjacentHTML(
    //         "afterend",
    //         '<div class="tmpDisplay" style="border: 1px solid #3331; padding: 10px;">' +
    //           element.selectedOptions[0].text +
    //           "</div>"
    //       );
    //       break;
    //     case "checkbox":
    //       element.insertAdjacentHTML(
    //         "afterend",
    //         '<div class="tmpDisplay" style=" display:inline-block; font-size:1.2em; font-weight: bold; margin-right: 20px; color: ' +
    //           (element.checked ? "green" : "red") +
    //           ';">' +
    //           (element.checked ? "YES" : "NO") +
    //           "</div>"
    //       );
    //       break;
    //     case "radio":
    //       if (element.checked) {
    //         element.style.fontWeight = "bold";
    //       } else {
    //         element.style.opacity = 0;
    //       }
    //       break;
    //     // case "textarea":
    //     //   element.insertAdjacentHTML(
    //     //     "afterend",
    //     //     '<div class="tmpDisplay" style="border: 1px solid #3331; padding: 10px;">' +
    //     //       element.innerHTML.replace(/\r?\n/g, "<br/>") +
    //     //       "</div>"
    //     //   );
    //     //   break;
    //     default:
    //   }
    // });
    //
    // doc.fromHTML(printElement, 40, 40, {
    //   width: 550,
    //   elementHandlers: elementHandler
    // });
    //
    // this.setState({ formKey: Math.random() });
    // doc.save(fileName);
    window.print();
  }

  async uploadFiles(body) {
    await apiCall(
      "POST",
      "/applications/" + this.props.match.params.id + "/attachments",
      body,
      true,
      "form"
    )
      .then(data => {
        if (data === 204) {
          return apiCall(
            "GET",
            "/applications/" + this.props.match.params.id + "/attachments",
            "",
            true
          ).then(attachments => {
            this.setState(state => ({
              attachments
            }));
            addMessage("success", "File uploaded");
          });
        }
      })
      .catch(err => addMessage("danger", "Error uploading the file"));
  }

  errors({ errors }) {
    console.log(errors);
  }

  timeoutHandler() {
    addMessage("danger", "You need be log in to access the form");
  }

  refreshSessionHandler() {}

  toggleSidebar(e) {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen,
      isFormButtonsOpen: false
    });
  }

  toggleFormButtons(e) {
    this.setState({
      isSidebarOpen: false,
      isFormButtonsOpen: !this.state.isFormButtonsOpen
    });
  }

  render() {
    const {
      form,
      account,
      schema,
      uiSchema,
      containerSticky,
      tabs,
      history,
      currentTab,
      noValidate,
      disabled,
      isSidebarOpen,
      isFormButtonsOpen,
      formKey
    } = this.state;
    if (authStore.token === "") {
      // this.timeoutHandler();
      return <Redirect to="/" />;
    }
    const sidebarComponent = () => {
      switch (currentTab) {
        case "comments":
          return <Comments entityType="applications" entityID={form.id} />;
        case "attachments":
          return <Attachments entityType="applications" />;
        default:
          return <History history={history} />;
      }
    };

    return (
      <div
        className={`applications flex flex-wrap ${
          containerSticky ? "is-sticky" : ""
        }`}
      >
        <div
          id="formContainer"
          className="formContainer w-70-l"
          ref={e => (this.formDiv = e)}
        >
          <div className="bundle-meta flex flex-column flex-row-l">
            <div>
              Applicant: <b>{account.email}</b>
            </div>
            <div>
              Form ID: <b>{form.id}</b>
            </div>

            <div>
              {form.bundle &&
              authStore.user.roles.indexOf("mri-staff") !== -1 ? (
                <span>
                  Bundle ID:{" "}
                  <b>
                    <Link to={`/bundles/${form.bundle}`}>{form.bundle}</Link>
                  </b>
                </span>
              ) : (
                <b>Not bundled yet.</b>
              )}
            </div>
          </div>
          <Form
            id="application-form"
            key={formKey}
            className={`${disabled ? "disabled" : ""} rjsf`}
            disabled={disabled}
            ref={this.form}
            schema={schema}
            uiSchema={uiSchema}
            onError={this.errors}
            formData={form.formData}
            noValidate={noValidate}
            noHtml5Validate={noValidate}
            onSubmit={this.formSubmitHandler}
          >
            <div className="form-actions form-group flex justify-between">
              <Clock />
              <button
                type="button"
                className="dn-l form-actions-toggle"
                onClick={e => this.toggleFormButtons(e)}
              >
                <i className="fa fa-cog white z-999" /> {`  `}
                {isFormButtonsOpen ? "Cancel" : "Actions"}
              </button>
              <div
                className="toggle-buttons"
                style={
                  isFormButtonsOpen
                    ? {
                        transform: "translateY(-44px)"
                      }
                    : {
                        transform: "translateY(240px)"
                      }
                }
              >
                <button
                  className="pdf-export"
                  onClick={e => this.exportPDF(e)}
                  type="button"
                >
                  Print to PDF <i className="fa fa-file-pdf ml2" />
                </button>
                {form.state === "finalized" &&
                authStore.user.roles.indexOf("mri-staff") !== -1 ? (
                  <div>
                    <button
                      className="unfinalize"
                      type="button"
                      onClick={this.unfinalizeForm}
                    >
                      Unfinalize
                      <i className="fa fa-undo ml2" />
                    </button>{" "}
                    <button
                      className="lock"
                      type="button"
                      onClick={this.lockHandler}
                    >
                      Lock
                      <i className="fa fa-lock ml2" />
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {form.state !== "locked" &&
                authStore.user.roles.indexOf("mri-staff") === -1 ? (
                  <div>
                    {form.state !== "finalized" ? (
                      <button
                        className="finalize"
                        type="button"
                        onClick={this.finalizeForm}
                      >
                        Finalize
                        <i className="fa fa-check ml2" />
                      </button>
                    ) : (
                      ""
                    )}
                    <button
                      type="button"
                      data-type="save"
                      onClick={this.saveAndExit}
                    >
                      Save and close
                      <i className="fa fa-exit-alt ml2" />
                    </button>
                    <button type="submit" data-type="save">
                      Save and continue
                      <i className="fa fa-save ml2" />
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Form>
        </div>
        <div
          className="sidebar"
          style={{
            transform: `translateX(${isSidebarOpen ? "10vw" : "100vw"})`
          }}
        >
          <div
            className={`sidebar-toggle dn-l fa fa-angle-double-${
              isSidebarOpen ? "right" : "left"
            }`}
            onClick={e => this.toggleSidebar(e)}
          />
          <div className={`sidebar-content`}>
            {" "}
            <div className="sidebar-tabs tabs flex justify-between">
              {tabs.map((tab, idx) => (
                <div
                  id={tab.title}
                  onClick={e => this.tabHandler(e)}
                  key={idx}
                  className={`tab tab-${tab.title} ${
                    currentTab === tab.title ? "active" : ""
                  }`}
                >
                  <i className={`fa fa-${tab.icon}`} />
                  {tab.title}
                </div>
              ))}
            </div>
            <div className="sidebar-lists">{sidebarComponent()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default view(Application);
