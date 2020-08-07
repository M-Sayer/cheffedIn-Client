import React from 'react';
import './Comments.css'

import RecipeContext from '../../contexts/RecipeContext';
import CommentsApiService from '../../services/comments-api-service';
import RecipesApiService from '../../services/recipes-api-service';
import CommentsForm from './CommentsForm';
import TokenService from '../../services/token-service'

export default class Comments extends React.Component {
  static contextType = RecipeContext;

  state = {
    edit: false,
    edit_id: null,
    comment: '',
  }

  handleEdit(e, id, comment) {
    e.preventDefault();
    this.setState({
      edit: !this.state.edit,
      edit_id: id,
      comment: comment
    })
  }

  handleCancelEdit() {
    this.setState({
      edit: false,
      edit_id: null,
      comment: '',
    })
  }

  handleDelete(e, id) {
    e.preventDefault();
    CommentsApiService.deleteComment(id)
      .then(() => RecipesApiService.getRecipeComments(this.context.recipe.id))
      .then(comments => this.context.setComments(comments))
      .catch(error => this.context.setError(error))
  }

  handleCommentChange = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  handleSubmit(e, comment_id) {
    e.preventDefault();
    const recipeId = this.context.recipe.id;
    CommentsApiService.updateComment(comment_id, this.state.comment)
      .then(() => RecipesApiService.getRecipeComments(recipeId))
      .then(comments => this.context.setComments(comments))
      .then(() => this.setState({
        edit: false,
        edit_id: null,
        comment: ''
      }))
      .catch(error => this.context.setError(error))
  }

  renderComments() {
    const uid = TokenService.getUserIdFromToken()
    return this.context.comments.map((comment, idx) => (
      <li className='comment' id={idx} key={comment.id}>
        <p className='username'>{comment.author}:</p>
        {this.state.edit_id !== comment.id && 
          <section className='manage-comment'>       
            <p>{comment.message}</p>
            {!this.state.edit && uid === comment.author_id &&
              <section className='manage-comment-buttons'>
                <button onClick={(e) => this.handleEdit(e, comment.id, comment.message)}>Edit</button>
                <button onClick={(e) => this.handleDelete(e, comment.id)}>Delete</button>
              </section>}
          </section>
          } 
          {this.state.edit && this.state.edit_id === comment.id &&
            <form className='comment-form'
            onSubmit={(e) => this.handleSubmit(e, comment.id,)}>
              <label htmlFor='comment-body'>
                Comment:
                <textarea required type='text' id='comment-body'
                value={this.state.comment}
                onChange={(e) => this.handleCommentChange(e)} />
              </label>
              <section className='comment-form-buttons'>
                <button type='submit'>Submit</button>
                <button type='cancel' 
                onClick={() => this.handleCancelEdit()}>Cancel</button>
              </section>
            </form>}
      </li>
    ));
  }

  render() {
    return (
      <div className='comments-section-container'>
        {this.context.comments.length > 0 && 
          <section className='comments-section'>
            <h4>the word on the street:</h4>
            <ul className='comments'>
              {this.renderComments()}
            </ul>
          </section>
        }
      <section className='comments-form'>
        {!this.state.edit && (TokenService.getToken() !== null) && <CommentsForm />}
      </section>
      </div>
    )
  }
}