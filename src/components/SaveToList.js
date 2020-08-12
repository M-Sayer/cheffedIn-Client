import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import ListsApiService from '../services/lists-api-service'

const SaveToList = (props) => {

  const [state, setState] = useState({error: false})

  function createOptions() {
    const lists = props.listsContext.userLists.map(list => (
      <option key={list.id} value={list.id}>{list.list_name}</option>
    ))
    
    return lists
  }
  
  function handleSubmit(values) {
    setState({ error: false})
    const list_id = values.list_id
    const recipe_id = props.props.match.params.recipeId
    const newData = { list_id: list_id, recipe_id: recipe_id }
    ListsApiService.postRecipeToList(list_id, recipe_id, newData)
      .then(res => {

          props.toggle()
        
      })
      .catch(error => setState({ error: error.error }))
  }
  
  function renderListsSelection() {
    return (
      <div className='user-list-selection'>
         {state.error &&
          <div className='error-container'>
            <p className='error-message'>{state.error}</p>
          </div>
         }
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
           <section className='save-recipe-buttons'>
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