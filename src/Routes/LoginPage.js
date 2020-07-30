import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import LoginApiService from '../services/login-api-service'

class LoginPage extends React.Component {

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
          LoginApiService.postCreds(values)
        }}
      >
        <Form>
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