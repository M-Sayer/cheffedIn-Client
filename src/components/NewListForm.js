import React from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export default class NewListForm extends React.Component {

  handleSubmit(newList) {

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
            <Field name='list_name' type='text' />
            <ErrorMessage name='list_name' />
          </label>
          <button type='submit'>create</button>
        </Form>
      </Formik>
    )
  }

  render() {
    return (
      <section className='create-list'>
        {this.createListForm()}
      </section>
    )
  }
}