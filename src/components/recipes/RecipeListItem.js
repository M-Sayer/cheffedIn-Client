import React from 'react';
import { Link } from 'react-router-dom';

export default class RecipeListItem extends React.Component {

  render() {
    const { recipe } = this.props;
    
    return(
      <Link to={`/recipes/${recipe.id}`} className='RecipeListItem'>
        <section>
          <img src={recipe.image} alt={recipe.title} />
          <h4>{recipe.title}</h4>
          <p>by {recipe.author}</p>
        </section>
      </Link>
    )
  }
}