import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'

import TokenService from '../services/token-service'
import RecipesListContext from '../contexts/RecipesListContext'

export default class Header extends React.Component {
  static contextType = RecipesListContext

  componentDidMount() {
    this.context.setLoggedIn(
      TokenService.hasAuthToken()
    )
  }

  logOutUser() {
    TokenService.clearToken()
    this.context.setLoggedIn(false)
  }

  renderLogout() {
    return (
      <section className='header-logout-link'>
        <Link
          onClick={() => this.logOutUser()}
          to='/'>
          Logout
        </Link>
      </section>
    )
  }

  renderLogin() {
    return (
        <section className='header-login-link'>
          <Link
            to='/login'>
            Log In
          </Link>
        </section>
    )
  }

  renderDashboard() {
    return (
      <section className='header-dashboard-link'>
        <Link to='/dashboard'>Dashboard</Link>
      </section>
    )
  }

  renderRegister() {
    return (
      <section className='header-register-link'>
        <Link
          to='/register'>
          Register
        </Link>
      </section>
    )
  }
  
  render() {
    return (
      <header>
        <section className='logo-text'>
          <Link to='/'>
            <h1>cheffedIn</h1>
          </Link>
        </section>
        <section className='header-links'>
          {this.context.isLoggedIn && this.renderDashboard()}
          {this.context.isLoggedIn && this.renderLogout()}
          {!this.context.isLoggedIn && this.renderRegister()}
          {!this.context.isLoggedIn && this.renderLogin()}

        </section>
      </header>
    ) 
  }
}