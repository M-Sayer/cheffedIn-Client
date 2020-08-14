import React from 'react';
import './SearchBar.css'

import RecipesListContext from '../contexts/RecipesListContext';

export default class SearchBar extends React.Component {
  static contextType = RecipesListContext;

  state = {
    30: false,
    60: false,
    appetizer: false,
    main: false,
    dessert: false,
    side: false,
    beverage: false,
    vegetarian: false,
  }

  componentDidMount() {
    this.context.clearSearch()
  }

  handleToggleFilter(e) {
    e.preventDefault()
    //toggle whether a filter button should be active
    //if false => set state to true and call search function for selected button
    //if true => set state to false and clear selected button from search
    if (this.state[e.target.key] === false) {
      this.setState({
        ...this.state,
        [e.target.key]: true
      })

      this.context.handleSearchChange(e)
    }
  }

  renderFilterButtons(id, values) {
    const buttons = values.map(value => {
      let name
      if(value === 30) {
        name = 'Under 30 Minutes'
      } else if(value === 60) {
        name = 'Under 1 Hour'
      } else if(value === 'true') {
        name = 'vegetarian'
      } else {
        name = value
      }

      return (
        <button
          onClick={(e) => this.handleToggleFilter(e)} 
          key={name}
          id={id}
          value={value}
          className='filter-button'>
          {name}
        </button>
    )})

    return buttons
  }

  render() {
    
    
    return (
        <div className='search-bar'>
          <form className='search-form'>
            <section className='search'>
              <input placeholder='search for recipes...'
              type='text' id='title' 
              value={this.context.search.title} 
              onChange={(e) => this.context.handleSearchChange(e)} />
            </section>
            <section className='filter-bar'>
                {this.renderFilterButtons('time', [30, 60])}
                {this.renderFilterButtons('type', ['appetizer', 'main', 'dessert', 'side', 'beverage'])}
                {this.renderFilterButtons('vegetarian', ['true'])}
            </section>
          </form>
        </div>
    )
  }
}