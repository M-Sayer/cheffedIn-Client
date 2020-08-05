import React from 'react';
import './SearchBar.css'

import RecipesListContext from '../contexts/RecipesListContext';

export default class SearchBar extends React.Component {
  static contextType = RecipesListContext;

  componentDidMount() {
    this.context.clearSearch()
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
                <label>
                  prep-time:
                  <select id='time' onChange={(e) => this.context.handleSearchChange(e)}>
                    <option value=''>select</option>
                    <option value={30}>30 minutes or less</option>
                    <option value={60}>1 hour or less</option>
                  </select>
                </label>
                <label>
                  meal type:
                  <select id='type' onChange={(e) => this.context.handleSearchChange(e)}>
                  <option value=''>select</option>
                  <option value='appetizer'>appetizer</option>
                  <option value='main'>main</option>
                  <option value='side'>side</option>
                  <option value='dessert'>dessert</option>
                  <option value='beverage'>beverage</option>
                  </select>
                </label>
                <label>
                  diet:
                  <select id='vegetarian' onChange={(e) => this.context.handleSearchChange(e)}>
                    <option value=''>select</option>
                    <option value='false'>non-vegetarian</option>
                    <option value='true'>vegetarian</option>
                  </select>
                </label>
            </section>
          </form>
        </div>
    )
  }
}