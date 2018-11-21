import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Sticky } from 'react-sticky';
import { view } from 'react-easy-state';
import Reactahead from 'reactahead';
import moment from 'moment';
import _ from 'lodash';
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
    this.fetchData = this.fetchData.bind(this);
    this.tabHandler = this.tabHandler.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.change = this.change.bind(this);
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
    this.associate = React.createRef();
    this.associateButton = React.createRef();
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
      const applicationData = await apiCall('GET', '/applications', '', true);
      this.setState(state => ({
        applications: _.map(
          _.filter(
            applicationData,
            application =>
              application.state === 'finalized' && !application.bundle
          ),
          'id'
        ),
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

  tabHandler(e) {
    e.persist();
    this.setState(state => ({ currentTab: e.target.id }));
  }

  change(o, i) {
    this.setState(state => ({ associate: true }));
    document.getElementsByClassName('reactahead-input')[0].innertext = o;
    this.applicationChooser.clearInput();
    document.getElementById('associate').innerHTML = o;
    this.associateButton.current.id = o;
  }

  async updateBundle(e) {
    e.persist();
    const type = e.target.dataset.type;
    const body = { type: type };
    let successMessage = '';
    if (type === 'associate' || type === 'dissociate') {
      Object.assign(body, { applications: [e.target.id] });
      successMessage = `Application ${
        e.target.id
      } has been successfully ${type}d`;
      this.associateButton.current.id = null;
      document.getElementById('associate').innerHTML = '';
    } else {
      successMessage = `Bundle state successfully updated to <b>${type}</b>`;
    }
    await apiCall(
      'PUT',
      '/bundles/' + this.props.match.params.id,
      JSON.stringify(body),
      true
    )
      .then(data => {
        if (!data) {
          addMessage('success', successMessage);
          this.fetchData();
        } else {
          addMessage('danger', 'There was an error updating the bundle.');
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

  render() {
    const {
      bundle,
      applications,
      case_worker,
      attachments,
      containerSticky,
      tabs,
      comments,
      history,
      currentTab
    } = this.state;
    if (authStore.token === '') {
      return <Redirect to="/" />;
    }
    console.log(applications);
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
        <div className="bundleContainer w-70-l">
          <div className="title pb0 flex justify-start mv3 ml3">
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
          <div className="bundle-applications">
            <div className="flex justify-between">
              <h1 className="mt4 ml3">
                Applications {` `}{' '}
                <span className="list-size">{_.size(bundle.applications)}</span>
              </h1>
              <div className="associate-application">
                <Reactahead
                  api={api => (this.applicationChooser = api)}
                  noResultMsg="Found no applications that match your search"
                  suggestions={applications}
                  onSubmit={this.change}
                  placeholder={`Search by application id`}
                />
                <div className="flex items-end mt3">
                  <span id="associate">&nbsp;</span>
                  <button
                    type="button"
                    data-type="associate"
                    id=""
                    className="ml3 flex"
                    ref={this.associateButton}
                    onClick={e => this.updateBundle(e)}>
                    <i className="fa fa-plus mr2" />associate
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-column">
              <div className="selected-header w-100 flex">
                <div className="text-center b">Id</div>
                <div className="text-center b">Applicant</div>
                <div className="text-center b">Actions</div>
              </div>
              {_.map(bundle.applications, (application, idx) => (
                <div className="selected-item w-100 flex" key={idx}>
                  <div className="id">
                    <Link to={`/applications/${application.id}`}>
                      {application.id}
                    </Link>
                  </div>
                  <div className="id">{application.applicant}</div>
                  <div className="id">
                    <div
                      id={application.id}
                      data-type="dissociate"
                      onClick={e => this.updateBundle(e)}
                      className="pointer">
                      <i className="mr2 fa fa-trash red" />dissociate
                    </div>
                  </div>
                </div>
              ))}
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
