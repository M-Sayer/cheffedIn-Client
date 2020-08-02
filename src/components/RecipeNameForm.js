import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export default class RecipeNameForm extends React.Component {

  createForm() {
    return (
      <Formik
        initialValues={{
          title: '',
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .required('Required')
            .max(15, 'Must be 15 characters or less')
        })}
        onSubmit={ (values, {setSubmitting}) => {
          this.props.handleSubmit(values)
        }}
      >
        <Form>
          <label>list name:
            <Field name='title' type='text' />
            <ErrorMessage name='title' />
          </label>
          <button type='submit'>submit</button>
          <button type='cancel'>cancel</button>
        </Form>
      </Formik>
    )
  }

  render() {
    return (
      <section className='edit-list-name'>
        {this.createForm()}
      </section>
    )
  }
}