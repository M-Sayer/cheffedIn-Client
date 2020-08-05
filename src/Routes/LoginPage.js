import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import LoginApiService from '../services/login-api-service'
import TokenService from '../services/token-service'
import RecipesListContext from '../contexts/RecipesListContext'

class LoginPage extends React.Component {
  static contextType = RecipesListContext

  handleSubmit(creds) {
    LoginApiService.postCreds(creds)
      .then(res => {
        TokenService.saveToken(res.authToken)
        this.context.setLoggedIn(true)
      })
      .then(() => this.props.history.goBack())
      
  }

  createLoginForm() {
    return (
      <Formik 
        initialValues={{
          user_name: '',
          password: ''
        }}
        validationSchema={Yup.object({
          user_name: Yup.string().required('Required'),
          password: Yup.string().required('Required')
        })}
        onSubmit={ (values, { setSubmitting }) => {
          this.handleSubmit(values)
        }}
      >
        <Form className='form'>
          <label> username:
            <Field name='user_name' type='text' />
            <ErrorMessage name='user_name' />
          </label>
          <label> password:
            <Field name='password' type='text' />
            <ErrorMessage name='password' />
          </label>
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    )
  }
  
  render() {
    return (
      <div className='login'>
        {this.createLoginForm()}
      </div>
    )
  }
}

export default LoginPage;