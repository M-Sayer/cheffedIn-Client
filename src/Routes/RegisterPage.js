import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import RegisterApiService from '../services/register-api-service'
import TokenService from '../services/token-service'
import RecipesListContext from '../contexts/RecipesListContext'

class RegisterPage extends React.Component {
  static contextType = RecipesListContext

  state = {
    error: null
  }

  setError(error) {
    this.setState({ error })
  }

  clearError() {
    this.setState({ error: null})
  }

  handleSubmit(values) {
    RegisterApiService.postUser(values)
      .then(res => {
        TokenService.saveToken(res.authToken)
        this.context.setLoggedIn(true)
        this.props.history.goBack()
      })
      .catch(error => this.setError(error))
  }

  createRegisterForm() {
    return (
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          user_name: '',
          password: '',
        }}
        validationSchema={Yup.object({
          first_name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          last_name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          user_name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          password: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        })}
        onSubmit={ (values, { setSubmitting }) => {
          this.handleSubmit(values)
        }}
      >
        <Form className='form'>
          <label>first name:
            <Field name='first_name' type='text' />
            <ErrorMessage component='section' className='error-message' name='first_name' />
          </label>
          <label>last name:
            <Field name='last_name' type='text' />
            <ErrorMessage component='section' className='error-message' name='last_name' />
          </label>
          <label>email:
            <Field name='email' type='text' />
            <ErrorMessage component='section' className='error-message' name='email' />
          </label>
          <label>username:
            <Field name='user_name' type='text' />
            <ErrorMessage component='section' className='error-message' name='user_name' />
          </label>
          <label>password:
            <Field name='password' type='password' />
            <ErrorMessage component='section' className='error-message' name='password' />
          </label>
          <button type='submit'>Submit</button>
        </Form>
      </Formik>  
    )
  }

  render() {
    return (
     
      <div className='register'>
        {this.state.error &&
          <section className='error-container'>
            <p className='error-message'>
            {this.state.error.error.message}
            </p>
          </section>
        }
        {this.createRegisterForm()}
      </div>
    )
  }
}

export default RegisterPage;