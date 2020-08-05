import React from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import ListsApiService from '../services/lists-api-service'
import UsersApiService from '../services/users-api-service'
import TokenService from '../services/token-service'
import UserListsContext from '../contexts/UserListsContext'

export default class NewListForm extends React.Component {
  static contextType = UserListsContext

  handleSubmit(newList) {
    const uid = TokenService.getUserIdFromToken()
    this.props.toggleCreateList()
    ListsApiService.postList(newList)
      .then(() => UsersApiService.getListsForUser(uid))
      .then(lists => this.context.setUserLists(lists))
      .catch(error => console.log(error))
  }

  cancelForm(e) {
    e.preventDefault()
    this.props.toggleCreateList()
  }
  
  createListForm() {
    return (
      <Formik
        initialValues={{
          list_name: '',
        }}
        validationSchema={Yup.object({
          list_name: Yup.string()
            .required('Required')
            .max(20, 'Must be 20 characters or less'),
        })}
        onSubmit={ (values, { setSubmitting }) => {
          this.handleSubmit(values)
        }}
      >
        <Form>
          <label>list name:
            <Field name='list_name' type='text'/>
            <ErrorMessage name='list_name' />
          </label>
          <section className='create-list-form-buttons'>
            <button type='submit'>create</button>
            <button onClick={(e) => this.cancelForm(e)}>cancel</button>
          </section>
        </Form>
      </Formik>
    )
  }

  render() {
    return (
      <section className='create-list-form'>
        {this.createListForm()}
      </section>
    )
  }
}