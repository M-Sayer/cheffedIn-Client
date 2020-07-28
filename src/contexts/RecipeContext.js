import React from 'react';

const RecipeContext = React.createContext({
  recipe: {},
  comments: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setRecipe: () => {},
  clearRecipe: () => {},
  setComments: () => {},
  addComment: () => {},
})

export default RecipeContext 

export class RecipeProvider extends React.Component {
  state = {
    recipe: {},
    error: null,
    comments: []
  }

  setError = (error) => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setRecipe = (recipe) => {
    this.setState({ recipe })
  }

  clearRecipe = () => {
    this.setRecipe({})
  }

  setComments = (comments) => {
    this.setState({ comments })
  }

  clearComments = () => {
    this.setComments([])
  }

  addComment = (comment) => {
    this.setComments([
      ...this.state.comments,
      comment
    ])
  }

  render() {
    const value = {
      recipe: this.state.recipe,
      comments: this.state.comments,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setRecipe: this.setRecipe,
      clearRecipe: this.clearRecipe,
      setComments: this.setComments,
      addComment: this.addComment,
    }

    return (
      <RecipeContext.Provider value={value}>
        {this.props.children}
      </RecipeContext.Provider>
    )
  }
}