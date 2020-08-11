import React from 'react'
import { NavLink } from 'react-router-dom'
import './Footer.css'

const Footer = (props) => {
  
  function renderButtons() {
    return (
      <div className='footer'>
        <NavLink className='footer-link' 
          activeClassName='active-footer-link'
          exact to='/'>Home</NavLink>
        <NavLink className='footer-link' 
          activeClassName='active-footer-link'
          to='/dashboard'>Dashboard</NavLink>
        <NavLink className='footer-link' 
          activeClassName='active-footer-link'
          to='/create'>Create</NavLink>
      </div>
    )
  }

  return renderButtons()
  
}

export default Footer