import React from 'react'
import { Link } from 'react-router-dom'

import UsersApiService from '../../services/users-api-service'
import TokenService from '../../services/token-service'
import NewListForm from '../../components/NewListForm'

export default class SavedLists extends React.Component {
  constructor(props) {
    super(props)
    this.setUserLists = this.setUserLists.bind(this)
  }

  state = {
    userLists: [],
    createList: false,
  }

  setUserLists(lists) {
    this.setState({
      ...this.state, userLists : lists
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
     <Link key={list.id} to={`/users/${list.author_id}/lists/${list.id}`}>
       <section className='user-list'>
        <h2>{list.list_name}</h2>
      </section>
     </Link>
    ))
    return lists
  }

  handleCreateList(e) {
    e.preventDefault();
    this.setState({
      ...this.state, createList: true
    })
  }

  render() {
    return (
      <div className='saved-lists'>
        <h3>saved lists</h3>
        <section className='manage-lists'>
          <button onClick={(e) => this.handleCreateList(e)}>create list</button>
          <button>edit lists</button>
          {this.state.createList && 
            <NewListForm setUserLists={this.setUserLists}/>
          }
        </section>
        {this.createUserLists()}
      </div>
    )
  }
}