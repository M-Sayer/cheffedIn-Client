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

  renderLogOut() {
    return (
      <div className='header-logged-in'>
        <Link
          onClick={() => this.logOutUser()}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLogIn() {
    return (
      <div className='header-logged-out'>
        <section className='register-link'>
          <Link
            to='/register'>
            Register
          </Link>
        </section>
        <section className='login-link'>
          <Link
            to='/login'>
            Log In
          </Link>
        </section>
      </div>
    )
  }
  
  render() {
    return (
      <header>
        <section className='header-text'>
          <h1>the village cooks</h1>
          <h3>a communal cookbook</h3>
        </section>
        {this.context.isLoggedIn
          ? this.renderLogOut()
          : this.renderLogIn()
        }
      </header>
    ) 
  }
}