import React from 'react';

import RecipeContext from '../contexts/RecipeContext';
import CommentsApiService from '../services/comments-api-service';
import RecipesApiService from '../services/recipes-api-service';

export default class CommentForm extends React.Component {
  static contextType = RecipeContext;

  state =  {
    name: '',
    comment: '',
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
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
      //why can't i use ternary here?
      .then(() => RecipesApiService.getRecipeComments(recipeId))
      // .then(res => (!res.ok) ? {error: res.statusText} : res.json())
      .then(comments => this.context.setComments(comments))
      .catch(error => this.context.setError(error))
  }

  render() {
    return (
      <div className='comment-form-container'>
        <h4>send your regards to the chef!</h4>
        <form className='comment-form'
          onSubmit={(e) => this.handleSubmit(e)}>
          {/* <label> 
            Name:
            <input required type='text' id='comment-name'
            value={this.state.name}
            onChange={(e) => this.handleNameChange(e)} />
          </label> */}
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