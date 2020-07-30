import React from 'react';

const RecipesListContext = React.createContext({
  recipesList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setRecipesList: () => {},
  handleSearchChange: () => {},
  search: {
    title: '',
    type: '',
    vegetarian: '',
    time: '',
  } 
})

export default RecipesListContext;

export class RecipesListProvider extends React.Component {
  state = {
    recipesList: [],
    error: null,
    test: 'sdfsdfsdf',
    search: {
      title: '',
      type: '',
      vegetarian: '',
      time: '',
    }
  };

  handleSearchChange(e) {
    e.preventDefault();
    console.log(this.state)
    
  }

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

  // doFilter() {
  //   const recipes = this.state.recipesList;
  //   const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().indexOf(this.state.search.title.trim()) > -1 && recipe.dish_type.indexOf(this.state.search.type) > -1 && (this.state.search.time === '' || (recipe.prep_time_hours + recipe.prep_time_minutes) <= this.state.search.time))

  //   return filteredRecipes
  // }

  render() {
    // let filteredRecipes = this.doFilter()

    const value = {
      recipesList: this.state.recipesList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setRecipesList: this.setRecipesList,
      search: this.state.search,
      // filteredRecipes: filteredRecipes,
      handleSearchChange: this.handleSearchChange,
    }
    return (
      <RecipesListContext.Provider value={value}>
        {this.props.children}
      </RecipesListContext.Provider>
    )
    
  }
}