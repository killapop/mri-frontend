import React from 'react';
import { Redirect } from 'react-router-dom';
import { Sticky } from 'react-sticky';
import { view } from 'react-easy-state';
import moment from 'moment';
import { authStore } from '../../lib/store';
import { apiCall } from '../../lib/api-calls';
import { add as addMessage } from '../../lib/message';
import History from '../applications/history';
import Comments from '../applications/comments';
import Attachments from '../applications/attachments';

import './bundle.css';

class Bundle extends React.Component {
  constructor(props) {
    super(props);
    this.updateBundle = this.updateBundle.bind(this);
    this.lockHandler = this.lockHandler.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.tabHandler = this.tabHandler.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.submitComments = this.submitComments.bind(this);
    this.state = {
      bundle: {},
      attachments: [],
      comments: [],
      history: [],
      type: [],
      case_worker: {},
      locked: false,
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
      const bundleData = await apiCall(
        'GET',
        '/bundles/' + this.props.match.params.id,
        '',
        true
      );
      const attachmentData = await apiCall(
        'GET',
        '/bundles/' + this.props.match.params.id + '/attachments',
        '',
        true
      );
      this.setState(state => ({
        bundle: bundleData,
        case_worker: bundleData.case_worker,
        comments: bundleData.comments,
        history: bundleData.history,
        attachments: attachmentData === 404 ? [] : attachmentData
      }));
    } catch (err) {
      addMessage('danger', 'Error retrieving data');
    }
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

  async finalizeForm(ev) {
    this.setState(state => ({
      locked: true
    }));
    await this.form.current.onSubmit(ev);
  }

  async updateBundle() {
    await apiCall(
      'PUT',
      '/bundles/' + this.props.match.params.id,
      JSON.stringify({
        type: this.state.type
      }),
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
      .then(() => {
        if (this.state.close) {
          return this.props.history.push('/');
        }
      })
      .catch(err => addMessage('danger', 'Error retrieving data'));
  }

  async submitComments(body) {
    await apiCall(
      'POST',
      '/bundles/' + this.props.match.params.id + '/comments',
      JSON.stringify(body),
      true
    )
      .then(data => {
        if (data === 204) {
          return apiCall(
            'GET',
            '/bundles/' + this.props.match.params.id,
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
      '/bundles/' + this.props.match.params.id + '/attachments',
      body,
      true,
      'form'
    )
      .then(data => {
        if (data === 204) {
          return apiCall(
            'GET',
            '/bundles/' + this.props.match.params.id + '/attachments',
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
      bundle,
      case_worker,
      attachments,
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
          return (
            <Attachments
              attachments={attachments}
              formId={bundle.id}
              uploadFiles={this.uploadFiles}
            />
          );
        default:
          return <History history={history} />;
      }
    };

    return (
      <div
        className={`bundles flex flex-wrap ${
          containerSticky ? 'is-sticky' : ''
        }`}>
        <div className="formContainer w-70-l">
          <div className="title pb0 flex justify-start">
            Bundle - {bundle.id}
          </div>
          <div className="bundle-meta flex">
            <div className="state">
              State:
              <b>{bundle.state}</b>
            </div>
            <div className="case-worker">
              Case worker: <b>{case_worker.email}</b>
            </div>
            <div className="created">
              Created: <b>{moment(bundle.created_at).format('Do-MMM-YYYY')}</b>
            </div>
            <div className="created">
              Updated: <b>{moment(bundle.updated_at).format('Do-MMM-YYYY')}</b>
            </div>
          </div>
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

export default view(Bundle);
