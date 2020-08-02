import React from 'react'

const UserListsContext = React.createContext({
  userLists: [],
  error: null,
  setUserLists: () => {},
  setError: () => {},
  clearError: () => {},
})

export default UserListsContext

export class UserListsProvider extends React.Component {
  state = {
    userLists: [],
    error: null,
  }

  setUserLists = (userLists) => {
    this.setState({ userLists })
  }

  setError = (error) => {
    console.log(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      userLists: this.state.userLists,
      error: this.state.error,
      setUserLists: this.setUserLists,
      setError: this.setError,
      clearError: this.clearError,
    }

    return (
      <UserListsContext.Provider value={value}>
        {this.props.children}
      </UserListsContext.Provider>
    )
  }


}