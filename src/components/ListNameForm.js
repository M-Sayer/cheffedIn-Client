import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export default class ListNameForm extends React.Component {

  createForm() {
    return (
      <Formik
        initialValues={{
          list_name: this.props.listName(),
        }}
        validationSchema={Yup.object({
          list_name: Yup.string()
            .required('Required')
            .max(25, 'Must be 15 characters or less')
        })}
        onSubmit={ (values, {setSubmitting}) => {
          this.props.handleSubmit(values)
        }}
      >
        <Form>
          <label>list name:
            <Field name='list_name' type='text' />
            <ErrorMessage name='list_name' />
          </label>
          <button type='submit'>submit</button>
          <button onClick={() => this.props.cancelForm()}
           type='cancel'>cancel</button>
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