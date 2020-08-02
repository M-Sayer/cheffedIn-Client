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
  // create new lists
  // delete lists

  state = {
    userLists: [],
    createList: false,
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

  handleDeleteList(e, list_id) {
    e.preventDefault()
    const uid = TokenService.getUserIdFromToken()
    ListsApiService.deleteList(list_id)
      .then(() => UsersApiService.getListsForUser(uid))
      .then(lists => this.setUserLists(lists))
  }

  createUserLists() {
    const lists = this.state.userLists.map(list => (
     <Link key={list.id} to={`/users/${list.author_id}/lists/${list.id}/recipes`}>
       <section className='user-list'>
        <h2>{list.list_name}</h2>
      </section>
       <section className='delete-lists'>
         <button onClick={(e) => this.handleDeleteList(e, list.id)}>delete</button>
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
        <h3>saved lists</h3>
          <section className='create-list'>
            <button onClick={(e) => this.handleCreateList(e)}>create list</button>
          </section>

        {this.state.createList && 
          <NewListForm 
          toggleCreateList={this.toggleCreateList}
          setUserLists={this.setUserLists}/>
        }
        {this.createUserLists()}
      </div>
    )
  }
}