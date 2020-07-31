import React from './node_modules/react';
import { Link } from './node_modules/react-router-dom';

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