import React from 'react';
import './SearchBar.css'

import RecipesListContext from '../contexts/RecipesListContext';

export default class SearchBar extends React.Component {
  static contextType = RecipesListContext;

  componentDidMount() {
    this.context.clearSearch()
  }

  renderSearchFilters(id, values) {

    const filters = values.map((value, idx) => {
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

      if(window.innerWidth > 767) {
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
        )
      } return (
        <option value={value}>{name}</option>
      )
  })
    let section
    window.innerWidth > 767
      ? section = 
        (<section className={`filter-bar-${id}`}>
          {filters}
        </section>)
      : section = 
        (<label htmlFor={id}>{id}
          <select id={id} onChange={(e) => this.context.handleSearchChange(e)}>
            <option value=''>select</option>
            {filters}
          </select>
        </label>)
    return section
  
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
            {this.renderSearchFilters('time', [30, 60])}
            
            {this.renderSearchFilters('type', ['appetizer', 'main', 'dessert', 'side', 'beverage'])}
            
            {this.renderSearchFilters('vegetarian', ['true'])}
          </section>
        </form>
      </div>
    )
  }
}