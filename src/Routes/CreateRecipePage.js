import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import RecipesApiService from '../services/recipes-api-service';

class CreateRecipePage extends React.Component() {
  
  CreateRecipeForm = () => {
    return (
      <Formik
        initialValues={{
          title: '',
          about: '',
          prep_time_minutes: '',
          prep_time_hours: '',
          serving_size: '',
          vegetarian: '',
          ingredients: '',
          steps: '',
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(25, 'Must be 25 characters or less')
            .required('Required'),
          about: Yup.string()
            .max(250, 'Must be 250 characters or less')
            .required('Required'),
          prep_time_minutes: Yup.string().required('Required'),
          prep_time_hours: Yup.string().required('Required'),
          serving_size: Yup.string().required('Required'),
          vegetarian: Yup.bool().required('Required'),
          ingredients: Yup.string()
            .max(500, 'Must be 500 characters or less')
            .required('Required'),
          steps: Yup.string().required('Required'),
        })}
        onSubmit={ (values, { setSubmitting }) => {
          return RecipesApiService.createRecipe()
        }}
      >
        <Form>
          <label htmlFor=''
        </Form>

      </Formik>
    )
  }

  render() {
    return (
      
    )
  }
}

export default CreateRecipePage;