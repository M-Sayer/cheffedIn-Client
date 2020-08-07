import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import ListsApiService from '../services/lists-api-service'

const SaveToList = (props) => {

  function createOptions() {
    const lists = props.listsContext.userLists.map(list => (
      <option key={list.id} value={list.id}>{list.list_name}</option>
    ))
    
    return lists
  }
  
  function handleSubmit(values) {
    const list_id = values.list_id
    const recipe_id = props.props.match.params.recipeId
    const newData = { list_id: list_id, recipe_id: recipe_id }
    ListsApiService.postRecipeToList(recipe_id, list_id, newData)
      .then(() => props.toggle())
  }
  
  function renderListsSelection() {
    return (
      <div className='user-list-selection'>
       <Formik
       initialValues={{
         list_id: ''
       }}
       validationSchema={Yup.object({
         list_id: Yup.string().required('A selection is required')
       })}
       onSubmit={ (values, {setSubmitting}) => {
         handleSubmit(values)
       }}
       >
         <Form>
           <label htmlFor='list_id'>Choose a list
            <Field name='list_id' as='select'>
              <option value=''>select</option>
              {createOptions()}
            </Field>
            <ErrorMessage name='list_id' />
           </label>
           <section className='selection-buttons'>
            <button type='submit'>save</button>
            <button onClick={() => props.toggle()}>cancel</button>
           </section>
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