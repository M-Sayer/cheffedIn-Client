import React from 'react';
import './SearchBar.css'

import RecipesListContext from '../contexts/RecipesListContext';

export default class SearchBar extends React.Component {
  static contextType = RecipesListContext;

  componentDidMount() {
    this.context.clearSearch()
  }

  renderFilterButtons(id, values) {
    const buttons = values.map((value, idx) => {
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
          key={idx}
          id={id}
          value={value}
          className={`${
            this.context.search[id] === `${value}`
            ? 'filter-button-on'
            : 'filter-button-off' 
          }`}>
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
            <section className='filter-bar-time'>
              {this.renderFilterButtons('time', [30, 60])}
            </section>
            <section className='filter-bar-type'>
              {this.renderFilterButtons('type', ['appetizer', 'main', 'dessert', 'side', 'beverage'])}
            </section>  
            <section className='filter-bar-vegetarian'>
              {this.renderFilterButtons('vegetarian', ['true'])}
            </section>
          </section>
        </form>
      </div>
    )
  }
}