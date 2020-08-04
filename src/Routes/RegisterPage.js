import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import RegisterApiService from '../services/register-api-service'
import TokenService from '../services/token-service'

class RegisterPage extends React.Component {
  
  handleSubmit(values) {
    RegisterApiService.postUser(values)
      .then(res => TokenService.saveToken(res.authToken))
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
            <ErrorMessage name='first_name' />
          </label>
          <label>last name:
            <Field name='last_name' type='text' />
            <ErrorMessage name='last_name' />
          </label>
          <label>email:
            <Field name='email' type='text' />
            <ErrorMessage name='email' />
          </label>
          <label>username:
            <Field name='user_name' type='text' />
            <ErrorMessage name='user_name' />
          </label>
          <label>password:
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
      <div className='register'>
        {this.createRegisterForm()}
      </div>
    )
  }
}

export default RegisterPage;