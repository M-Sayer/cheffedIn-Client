import React from 'react';

export default class Unsplash extends React.Component {
  
// toggle PhotoSearch active to off, so it stops dislaying live search photos
// capture clicked photo url, and add to imageurl in form state
// display the photo they chose
handleClick = (e) => {
  e.preventDefault();
  this.props.toggle();
  this.props.cancelSearch();
  this.props.setImage(e.target.src,e.target.alt)
}

  generatePhotos = () => {
    if(this.props.photos === []) {
      return null
    } else {
      let photos = this.props.photos.map((photo, idx) => (
        <img onClick={(e) => this.handleClick(e)}
        key={idx} src={photo.urls.small} alt={photo.alt_description} /> ));

        return photos
    }
  }
  
  render() {
    return (
      <div className='live-photos'>
        {this.generatePhotos()}
      </div>
    )
  }
} 