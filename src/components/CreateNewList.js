import React from 'react'

import { useFormikContext } from 'formik'

const CreateNewList = (props) => {

  const { values } = useFormikContext()
  
  React.useEffect(() => {
    if(values.list_id === 'new-list') {
      return props.createList()
    }
  }, [values, props])

  return null
}

export default CreateNewList