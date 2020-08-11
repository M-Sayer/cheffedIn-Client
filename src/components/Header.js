import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Header.css'

import TokenService from '../services/token-service'
import RecipesListContext from '../contexts/RecipesListContext'

const Header = (props) => {
  const recipesContext = useContext(RecipesListContext)

  const history = useHistory()

  useEffect(() => {
    recipesContext.setLoggedIn(
      TokenService.hasAuthToken()
    )
  }, [])

  function logOutUser() {
    TokenService.clearToken()
    recipesContext.setLoggedIn(false)
  }

  function renderLogout() {
    return (
        <button className='header-logout-button'
          onClick={() => {
            logOutUser()
            history.push('/')
        }}> Logout
        </button>
    )
  }

  function renderLogin() {
    return (
          <button className='header-login-button'
            onClick={() => history.push('/login')}
            > Log In
          </button>
    )
  }

  function renderDashboard() {
    return (
      <section className='header-dashboard-link'>
        <Link to='/dashboard'>Dashboard</Link>
      </section>
    )
  }

  function renderRegister() {
    return (
        <button className='header-register-button'
        onClick={() => history.push('/register')}>
          Register
        </button>
    )
  }
  
  return (
    <header>
      <section className='logo-text'>
        <Link to='/'>
          <h1>cheffedIn</h1>
        </Link>
      </section>
      <section className='header-buttons'>
        {recipesContext.isLoggedIn && renderDashboard()}
        {recipesContext.isLoggedIn && renderLogout()}
        {!recipesContext.isLoggedIn && renderRegister()}
        {!recipesContext.isLoggedIn && renderLogin()}

      </section>
    </header>
  ) 
}

export default Header