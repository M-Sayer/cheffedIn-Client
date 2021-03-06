import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './CreateRecipePage.css'

import UnsplashSearch from '../components/Unsplash/UnsplashSearch'

import RecipesApiService from '../services/recipes-api-service';

class CreateRecipePage extends React.Component {
  
  state = {
    imageUrl: '',
    imageAlt: '',
    imageSearch: '',
    error: null,
  }
 
  setError(error) {
    this.setState({ error })
  }
  
  cancelImageSearch = () => {
    this.setState({
      imageSearch: 'false'
    })
  }

  setImage = (url, alt) => {
    this.setState({
     imageUrl: url, imageAlt: alt
    })
  }

  setDisplayPhoto = (src, alt) => {
    if(this.state.imageUrl !== ''){
      return (
        <img className='selected-photo' src={this.state.imageUrl} alt={this.state.imageAlt} />
      )
    }
    return null
  }

  handleSubmit(values) {
    const newRecipe = {
      ...values,
      image: this.state.imageUrl
    }
    RecipesApiService.createRecipe(newRecipe)
      .then(() => this.props.history.goBack())
      .catch(error => this.setError(error))
  }

  createRecipeForm = () => {
    return (
      <Formik
        initialValues={{
          title: '',
          about: '',
          dish_type: '',
          vegetarian: '',
          prep_time_minutes: '0',
          prep_time_hours: '0',
          serving_size: '',
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
          dish_type: Yup.string().required('Required'),
          vegetarian: Yup.bool().required('Required'),
          prep_time_minutes: Yup.string().required('Required'),
          prep_time_hours: Yup.string(),
          serving_size: Yup.string().required('Required'),
          ingredients: Yup.string()
            .max(500, 'Must be 500 characters or less')
            .required('Required'),
          steps: Yup.string().required('Required'),
        })}
        onSubmit={ (values, { setSubmitting }) => {
          this.handleSubmit(values)
        }}
      >
        <Form>
          <label htmlFor='title'>Recipe Name:
            <Field name='title' type='text' />
            <ErrorMessage component='section' className='error-message' name='title' />
          </label>
          <label htmlFor='about'>Tell us about this recipe:
            <Field name='about' type='text' />
            <ErrorMessage component='section' className='error-message' name='about' />
          </label>
          <label htmlFor='dish_type'>What type of dish is it?
            <Field name='dish_type' as='select'>
              <option value=''>select</option>
              <option value='appetizer'>appetizer</option>
              <option value='main'>main</option>
              <option value='side'>side</option>
              <option value='dessert'>dessert</option>
              <option value='beverage'>beverage</option>
            </Field>
            <ErrorMessage component='section' className='error-message' name='dish_type' />
          </label>
          <label htmlFor='vegetarian'>Is it vegetarian?
            <Field name='vegetarian' as='select'>
              <option value=''>select</option>
              <option value={true}>yes</option>
              <option value={false}>no</option>
            </Field>
            <ErrorMessage component='section' className='error-message' name='vegetarian' />
          </label>
          <label htmlFor='photo-search'>Search Unsplash for a cover image:
            <UnsplashSearch
              displayPhoto={this.setDisplayPhoto}
              setImage={this.setImage}
              cancelSearch={this.cancelImageSearch}
            />
            {this.setDisplayPhoto()}
          </label>
          <label htmlFor='prep_time_minutes'> How long does it take to prepare this item?
            <Field name='prep_time_minutes' as='select'>
              <option value='0'>minutes</option>
              <option value='15'>15 minutes</option>
              <option value='30'>30 minutes</option>
              <option value='45'>45 minutes</option>
            </Field>
            <ErrorMessage component='section' className='error-message' name='prep_time_minutes' />
            <Field name='prep_time_hours' as='select'>
              <option value='0'>hours</option>
              <option value='1'>1 hour</option>
              <option value='2'>2 hours</option>
              <option value='3'>3 hours</option>
            </Field>
            <ErrorMessage component='section' className='error-message' name='prep_time_hours' />
          </label>
          <label htmlFor='serving_size'> How many servings does it yield?
            <Field name='serving_size' as='select'>
              <option value=''>select</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </Field>
            <ErrorMessage component='section' className='error-message' name='serving_size' />
          </label>
          <label htmlFor='ingredients'> What are the ingredients?
            <Field name='ingredients' as='textarea' />
            <ErrorMessage component='section' className='error-message' name='ingredients' />
          </label>
          <label htmlFor='steps'> How do we make it?
            <Field name='steps' as='textarea' />
            <ErrorMessage component='section' className='error-message' name='steps' />
          </label>
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    )
  }

  render() {
    return (
      <div className='create-recipe'>
        {this.createRecipeForm()}
      </div>
    )
  }
}

export default CreateRecipePage;