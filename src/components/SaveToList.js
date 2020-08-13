import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import ListsApiService from '../services/lists-api-service'

const SaveToList = (props) => {

  const [state, setState] = useState({error: false, errorMessage: ''})

  function createOptions() {
    const lists = props.listsContext.userLists.map(list => (
      <option key={list.id} value={list.id}>{list.list_name}</option>
    ))
    
    return lists
  }
  
  async function handleSubmit(values) {
    setState({ ...state, error: false })
    const list_id = values.list_id
    const recipe_id = props.props.match.params.recipeId
    const newData = { list_id: list_id, recipe_id: recipe_id }
    
    try {
      let response = await ListsApiService.postRecipeToList(list_id, recipe_id, newData)
      
      if(!response.ok) {
        let e = await response.json()
        await Promise.reject(e)
      } else { 
        props.toggle()
        props.showSuccess()
      }
    } 
    catch (e) {
      showError(e)
    } 
  }

  function renderError() {
    return (
      <div className='popup-error-container'>
        <span className='popup-error-message'>
          <p>{state.errorMessage}</p>
        </span>
      </div>
    )
  }

  function showError(e) {
    setState({ error:true, errorMessage: e.error })
    return setTimeout(() => setState({error:false}), 2000) 
  }
  
  function renderListsSelection() {
    return (
      <section className='user-list-selection'>
        {state.error && renderError()}
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
            <ErrorMessage component='section' className='error-message' name='list_id' />
           </label>
           <section className='save-recipe-buttons'>
            <button type='submit'>save</button>
            <button onClick={() => props.toggle()}>cancel</button>
           </section>
         </Form>
       </Formik>
      </section>
    )
  }

  return (
    <>
    {renderListsSelection()}
    </>
  )
}

export default SaveToList