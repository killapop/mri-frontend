import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-jsonschema-form';
import { Sticky } from 'react-sticky';
import { authStore } from '../../lib/store';
// import { view } from 'react-easy-state';
import Clock from '../../components/common/clock';
import { apiCall } from '../../lib/api-calls';
import { add as addMessage } from '../../lib/message';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.lockHandler = this.lockHandler.bind(this);
    this.errors = this.errors.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      form: {},
      schema: {},
      uiSchema: {},
      errors: {},
      locked: false,
      forms: {},
      containerSticky: false
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
          form: data
        }));
      })
      .catch(err => {
        addMessage('danger', 'Error retrieving data');
      });

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

  async formSubmitHandler({ formData }) {
    await apiCall(
      'PUT',
      '/applications/' + this.props.match.params.id,
      JSON.stringify({ type: this.state.locked ? 'submit' : 'save', formData }),
      true
    )
      .then(data => {
        this.setState(state => ({ form: data }));
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

  errors({ errors }) {
    console.log(errors);
  }

  timeoutHandler() {}

  refreshSessionHandler() {}

  render() {
    const { form, schema, uiSchema, containerSticky } = this.state;
    if (authStore.token === '') {
      this.timeoutHandler();
      return <Redirect to="/" />;
    }
    const sidebarTop = '100';
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
        <div className="sidebar w-30-l">
          <Sticky topOffset={100}>
            {({ style, isSticky, distanceFromTop = { sidebarTop } }) => (
              <div style={style}>
                <div className={`sidebar-content ${isSticky ? 'sticky' : ''}`}>
                  {' '}
                  Sidebar
                </div>
              </div>
            )}
          </Sticky>
        </div>
      </div>
    );
  }
}

export default Application;
