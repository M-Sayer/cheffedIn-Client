import React from 'react'
import { Link } from 'react-router-dom'

import UsersApiService from '../../services/users-api-service'
import TokenService from '../../services/token-service'

export default class SavedLists extends React.Component {

  state = {
    userLists: []
  }

  setUserLists(lists) {
    this.setState({
      userLists : lists
    })
  }

  //get user lists
  componentDidMount() {
    const uid = TokenService.getUserIdFromToken()
    UsersApiService.getListsForUser(uid)
      .then(lists => {
        this.setUserLists(lists)
      })
  }

  createUserLists() {
    const lists = this.state.userLists.map(list => (
     <Link to={`/users/${list.author_id}/lists/${list.id}`}>
       <section className='user-list'>
        <h2>{list.list_name}</h2>
      </section>
     </Link>
    ))
    return lists
  }

  render() {
    return (
      <div className='saved-lists'>
        {this.createUserLists()}
      </div>
    )
  }
}