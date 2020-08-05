import React from 'react';
import { Link } from 'react-router-dom'

export default class PostedRecipes extends React.Component {

  //lists of saved recipes

  //posted recipes

  render() {
    return (
      <div className='posted-recipes'>
        <section className='new-recipe'>
          <h3>my recipes</h3>
          <Link to='/create'>
            <button>create recipe</button>
          </Link>
        </section>
      </div>
    )
  }
}