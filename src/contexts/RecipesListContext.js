import React from 'react';

const RecipesListContext = React.createContext({
  recipesList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setRecipesList: () => {},
  handleSearchChange: () => {},
})

export default RecipesListContext;

export class RecipesListProvider extends React.Component {
  state = {
    recipesList: [],
    error: null,
  };

  setRecipesList = (recipesList) => {
    this.setState({ recipesList })
  }

  setError = (error) => {
    console.log(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      recipesList: this.state.recipesList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setRecipesList: this.setRecipesList,
    }
    return (
      <RecipesListContext.Provider value={value}>
        {this.props.children}
      </RecipesListContext.Provider>
    )
    
  }
}