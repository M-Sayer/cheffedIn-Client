import React from 'react';
import {NavLink} from 'react-router-dom';



export default class Header extends React.Component {
  
  render() {
    return (
      <header>
        <section className='header-text'>
          <h1>the village cooks</h1>
          <h3>a communal cookbook</h3>
        </section>
        <NavLink exact to='/'>home</NavLink>
        <NavLink exact to='/create'>create recipe</NavLink>
        <NavLink exact to='/login'>login</NavLink>
        <NavLink exact to='/register'>register</NavLink>
      </header>
    ) 
  }
}