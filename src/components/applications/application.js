import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-jsonschema-form';
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
    this.submitComments = this.submitComments.bind(this);
    this.state = {
      form: {},
      attachments: [],
      comments: [],
      history: [],
      schema: {},
      uiSchema: {},
      errors: {},
      locked: false,
      forms: {},
      containerSticky: false,
      currentTab: 'history',
      tabs: [
        { title: 'history', icon: 'clipboard-list' },
        { title: 'comments', icon: 'comments' },
        { title: 'attachments', icon: 'paperclip' }
      ]
    };
  }

  async componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    await apiCall(
      'GET',
      '/applications/' + this.props.match.params.id,
      '',
      true
    )
      .then(data => {
        this.setState(state => ({
          form: data,
          comments: data.comments,
          history: data.history
        }));
      })
      .catch(err => {
        addMessage('danger', 'Error retrieving data');
      });

    // await apiCall(
    //   'GET',
    //   '/applications/' + this.props.match.params.id + '/attachments',
    //   '',
    //   true
    // )
    //   .then(data => {
    //     this.setState(state => ({
    //       attachments: data
    //     }));
    //   })
    //   .catch(err => {
    //     addMessage('danger', 'Error retrieving data');
    //   });

    await apiCall('GET', '/forms/' + this.state.form.form, '', true)
      .then(data => {
        this.setState(state => ({
          schema: data.template.schema,
          uiSchema: data.template.uiSchema
        }));
      })
      .catch(err => addMessage('danger', 'Error retrieving data'));
  }

  lockHandler(e) {
    e.persist();
    this.setState(state => ({
      locked: e.target.checked
    }));
  }

  tabHandler(e) {
    e.persist();
    this.setState(state => ({ currentTab: e.target.id }));
  }

  async formSubmitHandler({ formData }) {
    await apiCall(
      'PUT',
      '/applications/' + this.props.match.params.id,
      JSON.stringify({ type: this.state.locked ? 'submit' : 'save', formData }),
      true
    )
      .then(data => {
        this.setState(state => ({
          form: data,
          comments: data.comments,
          history: data.history
        }));
        addMessage(
          `${this.state.locked ? 'success' : 'info'}`,
          `Form ${
            this.state.locked
              ? 'submitted for processing. One of our staff witll contact you shortly'
              : 'saved temporarirly'
          }`
        );
      })
      .catch(err => addMessage('danger', 'Error retrieving data'));
  }

  async submitComments(body) {
    console.log(body);
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
        // this.setState(state => ({ form: data }));
        // addMessage(
        //   `${this.state.locked ? 'success' : 'info'}`,
        //   `Form ${
        //     this.state.locked
        //       ? 'submitted for processing. One of our staff witll contact you shortly'
        //       : 'saved temporarirly'
        //   }`
        // );
      })
      .catch(err => addMessage('danger', 'Error submitting the comment'));
  }

  errors({ errors }) {
    console.log(errors);
  }

  timeoutHandler() {}

  refreshSessionHandler() {}

  render() {
    const {
      form,
      attachments,
      schema,
      uiSchema,
      containerSticky,
      tabs,
      comments,
      history,
      currentTab
    } = this.state;
    if (authStore.token === '') {
      this.timeoutHandler();
      return <Redirect to="/" />;
    }
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
          return <Attachments attachments={attachments} />;
        default:
          return <History history={history} />;
      }
    };

    return (
      <div
        className={`applications flex flex-wrap ${
          containerSticky ? 'is-sticky' : ''
        }`}>
        <div className="formContainer w-70-l">
          <Form
            schema={schema}
            uiSchema={uiSchema}
            onError={this.errors}
            formData={form.formData}
            onSubmit={this.formSubmitHandler}>
            <div className="form-actions form-group flex justify-between">
              <Clock />
              <div className="flex items-center">
                <div className="submitLock pr3">
                  <input
                    id="submitLockcheckbox"
                    type="checkbox"
                    onChange={e => this.lockHandler(e)}
                  />

                  <label className="white pr2 f6" htmlFor="submitLockcheckbox">
                    {this.state.locked ? (
                      <span>
                        Locked (Unlock)
                        <i className="fa fa-2x fa-lock pr2" />
                      </span>
                    ) : (
                      <span>
                        Lock for submission
                        <i className="fa fa-2x fa-lock-open pr2" />
                      </span>
                    )}
                  </label>
                </div>
                <button type="submit" data-type="save">
                  {schema.saveButton || 'Save'}
                  <i className="fa fa-save ml2" />
                </button>
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
