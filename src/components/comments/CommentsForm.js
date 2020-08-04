import React from 'react';
import './CommentsForm.css'

import RecipeContext from '../../contexts/RecipeContext';
import CommentsApiService from '../../services/comments-api-service';
import RecipesApiService from '../../services/recipes-api-service';

export default class CommentForm extends React.Component {
  static contextType = RecipeContext;

  state =  {
    comment: '',
  }

  handleCommentChange = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const recipeId = this.context.recipe.id;
    CommentsApiService.createComment(recipeId, this.state.comment)
      .then(() => RecipesApiService.getRecipeComments(recipeId))
      .then(comments => this.context.setComments(comments))
      .catch(error => this.context.setError(error))
  }

  render() {
    return (
      <div className='comment-form-container'>
        <h4>send your regards to the chef!</h4>
        <form className='comment-form'
          onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            Comment:
            <textarea required type='text' id='comment-body'
            value={this.state.comment}
            onChange={(e) => this.handleCommentChange(e)} />
            </label>
          <input type='submit' />
      </form>
    </div>
    )
  }

}