import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'

import TokenService from '../services/token-service'

export default class Header extends React.Component {
  
  state = {
    loggedIn: null
  }

  componentDidMount() {
    TokenService.hasAuthToken() 
      ? this.setState({ loggedIn : true })
      : this.setState({ loggedIn : false })
  }

  logOutUser() {
    TokenService.clearToken()
    this.setState({ loggedIn: false })
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
        {this.state.loggedIn
          ? this.renderLogOut()
          : this.renderLogIn()
        }
        {TokenService.hasAuthToken() && this.renderLogOut()}
        {!TokenService.hasAuthToken() && this.renderLogIn()}
      </header>
    ) 
  }
}