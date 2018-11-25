import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Form from 'react-jsonschema-form';
import jsPDF from 'jspdf';
import _ from 'lodash';
import { Sticky } from 'react-sticky';
import { authStore } from '../../lib/store';
import { view } from 'react-easy-state';
import Clock from '../../components/common/clock';
import { apiCall } from '../../lib/api-calls';
import { add as addMessage } from '../../lib/message';
import History from './history';
import Comments from './comments';
import Attachments from './attachments';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.lockHandler = this.lockHandler.bind(this);
    this.errors = this.errors.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.tabHandler = this.tabHandler.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.submitComments = this.submitComments.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.finalizeForm = this.finalizeForm.bind(this);
    this.saveAndExit = this.saveAndExit.bind(this);
    this.exportPDF = this.exportPDF.bind(this);
    this.state = {
      form: {},
      bundle: '',
      account: {},
      attachments: [],
      comments: [],
      history: [],
      schema: {},
      uiSchema: {},
      errors: {},
      locked: false,
      noValidate: true,
      forms: {},
      close: false,
      containerSticky: false,
      currentTab: 'attachments',
      tabs: [
        { title: 'history', icon: 'clipboard-list' },
        { title: 'comments', icon: 'comments' },
        { title: 'attachments', icon: 'paperclip' }
      ]
    };
    this.form = React.createRef();
  }

  async componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const appData = await apiCall(
        'GET',
        '/applications/' + this.props.match.params.id,
        '',
        true
      );
      const attachmentData = await apiCall(
        'GET',
        '/applications/' + this.props.match.params.id + '/attachments',
        '',
        true
      );
      const formData = await apiCall('GET', '/forms/' + appData.form, '', true);
      this.setState(state => ({
        form: appData,
        account: appData.account,
        type: '',
        comments: appData.comments,
        history: appData.history,
        attachments: attachmentData === 404 ? [] : attachmentData,
        schema: formData.template.schema,
        uiSchema: formData.template.uiSchema,
        disabled:
          authStore.user.roles.indexOf('mri-staff') !== -1 ||
          (authStore.user.roles.indexOf('mri-staff') === -1 &&
            appData.state === 'locked')
      }));
    } catch (err) {
      addMessage('danger', 'Error retrieving data');
    }
  }

  async lockHandler(ev) {
    this.setState(state => ({
      type: 'lock'
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

  async saveAndExit(ev) {
    await this.form.current.onSubmit(ev);
    this.setState(state => ({ close: true }));
  }

  async saveForm(ev) {
    await this.form.current.onSubmit(ev);
  }

  async formSubmitHandler({ formData }) {
    let body = {};
    let message = '';
    if (this.state.type === 'lock') {
      body = { type: this.state.type };
      message = 'The form has been locked and no further editing is allowed';
    } else {
      body = { type: this.state.locked ? 'submit' : 'save', formData };
      message = this.state.locked
        ? 'Your form has been submitted for review and validation'
        : 'Your form has been temporarily saved';
    }
    await apiCall(
      'PUT',
      '/applications/' + this.props.match.params.id,
      JSON.stringify(body),
      true
    )
      .then(data => {
        this.setState(state => ({
          form: data,
          account: data.account,
          comments: data.comments,
          history: data.history
        }));
        addMessage('success', message);
      })
      .then(() => {
        if (this.state.close) {
          return this.props.history.push('/');
        }
      })
      .catch(err => addMessage('danger', 'Error retrieving data'));
  }

  async exportPDF(ev) {
    ev.persist();
    const fileName = this.props.match.params.id + '.pdf';
    const doc = new jsPDF('p', 'mm', 'a4');
    const printElement = document.getElementById('application-form');
    _.forEach(printElement.elements, (element, idx) => {
      switch (element.type) {
        case 'text':
          element.insertAdjacentHTML(
            'afterend',
            '<div class="tmpDisplay" style="border: 1px solid #3331; padding: 10px;">' +
              element.value +
              '</div>'
          );
          break;
        case 'select-one':
          element.insertAdjacentHTML(
            'afterend',
            '<div class="tmpDisplay" style="border: 1px solid #3331; padding: 10px;">' +
              element.selectedOptions[0].text +
              '</div>'
          );
          break;
        case 'checkbox':
          element.insertAdjacentHTML(
            'afterbegin',
            '<span style="font-size:1.2em; font-weight: bold; margin-right: 20px;">' +
              (element.checked ? 'YES' : 'NO') +
              '</span>'
          );
          break;
        case 'radio':
          if (element.checked) {
            console.log('CHECKED');
            element.style.fontWeight = 'bold';
          } else {
            element.style.opacity = 0;
          }
          break;
        default:
      }
    });
    doc.fromHTML(printElement);
    const elements = document.getElementsByClassName('tmpDisplay');
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }

    doc.save(fileName);
  }

  async submitComments(body) {
    await apiCall(
      'POST',
      '/applications/' + this.props.match.params.id + '/comments',
      JSON.stringify(body),
      true
    )
      .then(data => {
        if (data === 204) {
          return apiCall(
            'GET',
            '/applications/' + this.props.match.params.id,
            '',
            true
          ).then(commentData => {
            this.setState(state => ({
              comments: commentData.comments,
              history: commentData.history
            }));
            addMessage('success', 'Comment posted');
          });
        }
      })
      .catch(err => addMessage('danger', 'Error submitting the comment'));
  }

  async uploadFiles(body) {
    await apiCall(
      'POST',
      '/applications/' + this.props.match.params.id + '/attachments',
      body,
      true,
      'form'
    )
      .then(data => {
        if (data === 204) {
          return apiCall(
            'GET',
            '/applications/' + this.props.match.params.id + '/attachments',
            '',
            true
          ).then(attachments => {
            this.setState(state => ({
              attachments
            }));
            addMessage('success', 'File uploaded');
          });
        }
      })
      .catch(err => addMessage('danger', 'Error uploading the file'));
  }

  errors({ errors }) {
    console.log(errors);
  }

  timeoutHandler() {
    addMessage('danger', 'You need be log in to access the form');
  }

  refreshSessionHandler() {}

  render() {
    const {
      form,
      account,
      attachments,
      schema,
      uiSchema,
      containerSticky,
      tabs,
      comments,
      history,
      currentTab,
      noValidate,
      disabled
    } = this.state;
    if (authStore.token === '') {
      this.timeoutHandler();
      return <Redirect to="/" />;
    }
    console.log(form);
    const sidebarTop = '100';
    const sidebarComponent = () => {
      switch (currentTab) {
        case 'comments':
          return (
            <Comments
              comments={comments}
              submitComments={this.submitComments}
            />
          );
        case 'attachments':
          return (
            <Attachments
              attachments={attachments}
              formId={form.id}
              uploadFiles={this.uploadFiles}
            />
          );
        default:
          return <History history={history} />;
      }
    };

    return (
      <div
        className={`applications flex flex-wrap ${
          containerSticky ? 'is-sticky' : ''
        }`}>
        <div
          id="formContainer"
          className="formContainer w-70-l"
          ref={e => (this.formDiv = e)}>
          <div className="bundle-meta flex">
            <div>
              Applicant: <b>{account.email}</b>
            </div>
            <div>
              Form ID: <b>{form.id}</b>
            </div>

            <div>
              {form.bundle &&
                authStore.user.roles.indexOf('mri-staff') !== -1 ? (
                  <span>
                    Bundle ID:{' '}
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
            className={`${disabled ? 'disabled' : ''} rjsf`}
            disabled={disabled}
            ref={this.form}
            schema={schema}
            uiSchema={uiSchema}
            onError={this.errors}
            formData={form.formData}
            noValidate={noValidate}
            noHtml5Validate={noValidate}
            onSubmit={this.formSubmitHandler}>
            <div className="form-actions form-group flex justify-between">
              <Clock />
              <div className="flex items-center">
                <button
                  className="pdf-export"
                  onClick={e => this.exportPDF(e)}
                  type="button">
                  Print to PDF <i className="fa fa-file-pdf ml2" />
                </button>
                {form.state === 'finalized' &&
                authStore.user.roles.indexOf('mri-staff') !== -1 ? (
                  <div>
                    {' '}
                    <button
                      className="lock"
                      type="button"
                      onClick={this.lockHandler}>
                      Lock
                      <i className="fa fa-lock ml2" />
                    </button>
                  </div>
                ) : (
                  ''
                )}
                {form.state !== 'locked' &&
                authStore.user.roles.indexOf('mri-staff') === -1 ? (
                  <div>
                    {form.state !== 'finalized' ? (
                      <button
                        className="finalize"
                        type="button"
                        onClick={this.finalizeForm}>
                        Finalize
                        <i className="fa fa-check ml2" />
                      </button>
                    ) : (
                      ''
                    )}
                    <button
                      type="button"
                      data-type="save"
                      onClick={this.saveAndExit}>
                      Save and close
                      <i className="fa fa-exit-alt ml2" />
                    </button>
                    <button type="submit" data-type="save">
                      Save and continue
                      <i className="fa fa-save ml2" />
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </Form>
        </div>
        <div className="sidebar w-30-l relative">
          <Sticky topOffset={100}>
            {({ style, isSticky, distanceFromTop = { sidebarTop } }) => (
              <div style={style}>
                <div className={`sidebar-content ${isSticky ? 'sticky' : ''}`}>
                  {' '}
                  <div className="sidebar-tabs tabs flex justify-between">
                    {tabs.map((tab, idx) => (
                      <div
                        id={tab.title}
                        onClick={e => this.tabHandler(e)}
                        key={idx}
                        className={`tab tab-${tab.title} ${
                          currentTab === tab.title ? 'active' : ''
                        }`}>
                        <i className={`fa fa-${tab.icon}`} />
                        {tab.title}
                      </div>
                    ))}
                  </div>
                  <div className="sidebar-lists">{sidebarComponent()}</div>
                </div>
              </div>
            )}
          </Sticky>
        </div>
      </div>
    );
  }
}

export default view(Application);
