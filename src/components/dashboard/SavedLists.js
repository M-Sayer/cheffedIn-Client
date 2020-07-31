import React from 'react'
import { Link } from 'react-router-dom'

import UsersApiService from '../../services/users-api-service'
import TokenService from '../../services/token-service'
import NewListForm from '../../components/NewListForm'
import ListsApiService from '../../services/lists-api-service'

export default class SavedLists extends React.Component {
  constructor(props) {
    super(props)
    this.setUserLists = this.setUserLists.bind(this)
    this.toggleCreateList = this.toggleCreateList.bind(this)
  }

  state = {
    userLists: [],
    createList: false,
    editList: false,
  }

  setUserLists(lists) {
    this.setState({
      ...this.state, userLists : lists
    })
  }

  toggleCreateList() {
    this.setState({
      ...this.state, 
      createList: !this.state.createList, 
      editList: !this.state.editList

    })
  }

  toggleEditList() {
    this.setState({
      ...this.state, editList: !this.state.editList
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

  deleteList(e, list_id) {
    e.preventDefault()
    const uid = TokenService.getUserIdFromToken()
    ListsApiService.deleteList(list_id)
      .then(() => UsersApiService.getListsForUser(uid))
      .then(lists => this.setUserLists(lists))
  }

  createUserLists() {
    const lists = this.state.userLists.map(list => (
     <Link key={list.id} to={`/users/${list.author_id}/lists/${list.id}`}>
       <section className='user-list'>
        <h2>{list.list_name}</h2>
      </section>
      {this.state.editList && 
       <section className='edit-lists'>
         <button>edit</button>
         <button onClick={(e) => this.deleteList(e, list.id)}>delete</button>
       </section>
       }
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
        <h3>saved lists</h3>
        {!this.state.editList && <section className='manage-lists'>
          <button onClick={(e) => this.handleCreateList(e)}>create list</button>
          <button onClick={(e) => this.toggleEditList()}>edit lists</button>
        </section>}

        {this.state.createList && 
          <NewListForm 
          toggleCreateList={this.toggleCreateList}
          setUserLists={this.setUserLists}/>
        }
        {this.state.editList && 
          <button onClick={(e) => this.toggleEditList(e)}>cancel</button>
        }
        {this.createUserLists()}
      </div>
    )
  }
}