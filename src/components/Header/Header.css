/* eslint no-unused-vars: 0 */
import React from 'react'
import { Link } from 'gatsby'

const userLinks = [
  {
    label: 'MRI',
    path: '/',
    Icon: 'home',
  },
  {
    label: 'Info',
    path: '/info',
    Icon: 'info-circle',
  },
  {
    label: 'Help',
    path: '/help',
    Icon: 'question-circle',
  },
  {
    label: 'Account',
    path: '/account',
    Icon: 'user-circle',
  },
  {
    label: 'Dashboard',
    path: '/dashboard',
    Icon: 'tachometer-alt',
  },
]

const backButton = () => {
  return window.location.pathname !== '/' ? (
    <Link
      to="/"
      className="fixed link ma2 br2 pa2 bg-primary-color white shadow-light dim"
      style={{ top: '70px' }}
    >
      <i className="fa fa-arrow-circle-left f7" /> back
    </Link>
  ) : (
    'HELLO'
  )
}
const Header = ({ siteTitle }) => (
  <>
    <div className="bg-white z-999 w-100 shadow-light fixed top-0 pv2 ph3">
      <nav className="ttu flex justify-between">
        <div className="userNav flex justify-start">
          {userLinks.map(({ label, Icon, path }, key) => (
            <Link key={key} to={path} className="pt1 link silver dim mh3">
              <div className="flex flex-column f6 items-center">
                <i className={`fa fa-${Icon} mb2 fa-15x`} />
                <span className="f7">{label}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="actions pointer flex items-center">
          <i className="fa fa-ellipsis-v fa-15x silver" />
        </div>
      </nav>
    </div>
    {backButton()}
  </>
)
export default Header
