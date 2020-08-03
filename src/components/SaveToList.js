import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'


const SaveToList = (props) => {

  function createOptions() {
    const lists = props.listsContext.userLists.map(list => (
      <option key={list.id} value={list.list_name}>{list.list_name}</option>
    ))
    
    return lists
  }
  
  function handleSubmit(values) {
    console.log(values)
  }
  
  function renderListsSelection() {
    return (
      <div className='user-list-selection'>
       <Formik
       initialValues={{
         list: ''
       }}
       validationSchema={Yup.object({
         list: Yup.string().required('A selection is required')
       })}
       onSubmit={ (values, {setSubmitting}) => {
         handleSubmit(values)
       }}
       >
         <Form>
           <label>Choose a list
            <Field name='list' as='select'>
              <option value=''>select</option>
              {createOptions()}
            </Field>
           </label>
         </Form>
       </Formik>
      </div>
    )
  }

  return (
    <>
    {renderListsSelection()}
    </>
  )
}

export default SaveToList