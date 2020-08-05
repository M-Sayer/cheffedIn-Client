import React from 'react';

import Unsplash from './Unsplash';

export default class PhotoSearch extends React.Component {

  state = {
    search: '',
    photos: [],
    active: false
  }

  getPhotos = () => {
    const key = '4p9nMyeTZlHhsqZYofgzD7oRjgB8SJjl2lAhyXiLvxc';
    let query = this.state.search;
    if(query !== '') {
      fetch(`https://api.unsplash.com/search/photos?page=1&per_page=6&query=${query}&client_id=${key}`)
      .then(res => res.json())
      .then(data => this.setState({
        photos : data.results
      }))
      .catch(error => console.log(error))
    }
    
  }
    
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      search: e.target.value,
      active: true
    })
  }

  activeToggle = () => {
    let toggle = !this.state.active
    this.setState({
      active: toggle
    })
  }

  displayPhotos = () => {
    if(this.state.active) {
      return (
        <Unsplash 
          displayPhoto={this.props.displayPhoto} 
          toggle={this.activeToggle} 
          setImage={this.props.setImage}
          photos={this.state.photos}
          cancelSearch={this.props.cancelSearch}
        />
      )
    }
  }

  render() {
    return(
      <div>
        <section className='photo-search'
        onChange={this.getPhotos()} >
        <label>
          Photo Search:
          <input type='text'
          value={this.state.search}
          onChange={(e) => this.handleChange(e)}
          ></input>
          <button type='submit'>Search</button>
        </label>
        </section>
        {this.displayPhotos()}
      </div>
    )
  }
}