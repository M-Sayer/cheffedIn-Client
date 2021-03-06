import React from 'react'
import { Link } from 'react-router-dom'

import UsersApiService from '../../services/users-api-service'
import TokenService from '../../services/token-service'
import NewListForm from '../../components/NewListForm'
import UserContext from '../../contexts/UserContext'

export default class SavedLists extends React.Component {
  constructor(props) {
    super(props)
    this.toggleCreateList = this.toggleCreateList.bind(this)
  }

  static contextType = UserContext
  // create new lists
  // delete lists

  state = {
    createList: false,
  }

  toggleCreateList() {
    this.setState({
      ...this.state, 
      createList: !this.state.createList, 
    })
  }

  //get user lists
  componentDidMount() {
    const uid = TokenService.getUserIdFromToken()
    UsersApiService.getListsForUser(uid)
      .then(lists => {
        this.context.setUserLists(lists)
      })
  }

  createUserLists() {
    const lists = this.context.userLists.map(list => (
     <Link key={list.id} to={`/users/${list.author_id}/lists/${list.id}/recipes`}>
      <section className='user-list'>
      <h4>{list.list_name}</h4>
      </section>
     </Link>
    ))
    return lists
  }

  handleCreateList(e) {
    e.preventDefault();
    this.toggleCreateList()
  }

  render() {
    return (
      <div className='saved-lists'>
        <section className='create-list'>
          <h3>my lists</h3>
          {!this.state.createList && 
            <button onClick={(e) => this.handleCreateList(e)}>create list</button>
          }
        </section>

        {this.state.createList && 
          <NewListForm
          class={'dashboard-create-list'} 
          toggleCreateList={this.toggleCreateList} />
        }
        {this.createUserLists()}
      </div>
    )
  }
}