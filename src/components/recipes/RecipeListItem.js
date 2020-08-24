import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeListItem.css'

export default class RecipeListItem extends React.Component {

  render() {
    const { recipe } = this.props;
    
    return(
      <Link to={`/recipes/${recipe.id}`} className='recipe-tile'>
        <img src={recipe.image} alt={recipe.title} />
        <h4>{recipe.title}</h4>
      </Link>
    )
  }
}