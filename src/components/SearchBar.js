import React from 'react';
import './SearchBar.css'

import RecipesListContext from '../contexts/RecipesListContext';

export default class SearchBar extends React.Component {
  static contextType = RecipesListContext;

  componentDidMount() {
    this.context.clearSearch()
  }

  render

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
          onClick={(e) => this.context.handleSearchChange(e)} 
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