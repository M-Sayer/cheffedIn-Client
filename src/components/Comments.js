import React from 'react';

import RecipeContext from '../contexts/RecipeContext';

export default class Comments extends React.Component {
  static contextType = RecipeContext;

  renderComments() {
    return this.context.comments.map((comment, idx) => (
      <li className='comment' id={idx} key={comment.id}>
        <p className='username'>{comment.username}:</p>
        <p>{comment.message}</p>
      </li>
    ));
    // return comments
  }

  render() {
    return (
      <div className='comments-section-container'>
        <section className='comments-section'>
        <h4>the word on the street:</h4>
          <ul className='comments'>
            {this.renderComments()}
          </ul>
      </section>
      </div>
    )
  }
}