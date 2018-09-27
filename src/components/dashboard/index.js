import React from 'react'
import Dashboard from '../../components/Dashboard/dashboard.js'
import Layout from '../../components/layout'

class DashboardIndex extends React.Component {
  render() {
    return (
      <>
        <Layout>
          <Dashboard />
        </Layout>
      </>
    )
  }
}

export default DashboardIndex
