import React, { useContext, useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import './Header.css'

import TokenService from '../services/token-service'
import RecipesListContext from '../contexts/RecipesListContext'

const Header = (props) => {
  const recipesContext = useContext(RecipesListContext)

  const history = useHistory()

  const width = window.innerWidth

  useEffect(() => {
    recipesContext.setLoggedIn(
      TokenService.hasAuthToken()
    )
  }, [])

  function renderLogin() {
    return (
          <button className='header-login-button'
            onClick={() => history.push('/login')}
            > Log In
          </button>
    )
  }

  function renderNavLinks() {
    return (
      <section className='header-nav-links'>
        <NavLink className='header-link'
          activeClassName='header-link-active'
          exact to='/'>Home
        </NavLink>
        <NavLink className='header-link'
          activeClassName='header-link-active'
          to='/dashboard'>Dashboard
        </NavLink>
        <NavLink className='header-link'
          activeClassName='header-link-active'
          to='/create'>Create Recipe
        </NavLink>
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
      {recipesContext.isLoggedIn && (width > 767) && renderNavLinks()}
      {!recipesContext.isLoggedIn && 
        <section className='header-buttons'>
          {renderRegister()}
          {renderLogin()}
        </section>
      }
    </header>
  ) 
}

export default Header