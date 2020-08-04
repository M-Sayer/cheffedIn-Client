import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'

import TokenService from '../services/token-service'

export default class Header extends React.Component {
  
  
  renderLogOut() {
    return (
      <div className='header-logged-in'>
        <Link
          onClick={TokenService.clearToken}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLogIn() {
    return (
      <div className='header-logged-out'>
        <Link
          to='/register'>
          Register
        </Link>
        <Link
          to='/login'>
          Log In
        </Link>
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
        {TokenService.hasAuthToken()
          ? this.renderLogOut()
          : this.renderLogIn()
        }
      </header>
    ) 
  }
}