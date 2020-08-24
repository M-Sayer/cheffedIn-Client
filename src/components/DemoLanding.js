import React, {useState, useContext} from 'react'
import './DemoLanding.css'

import UserContext from '../contexts/UserContext'

const DemoLanding = (props) => {
  const [state, setState] = useState({ show: true })

  const userContext = useContext(UserContext)

  function generateLanding() {
    return (
      <div className='modal'>
       <section className='modal-landing'>
        <h1>welcome!</h1>
          <p>
            The purpose of this app is to be a social site for recipe management. Users can view recipes uploaded by other users, as well as search & filter recipes. Users can also log in to upload recipes, save recipes to lists, and leave comments on recipes.
          </p>
          <p>
            A demo account has been created with these credentials:
            <section>
              username: frost
              password: staygolden
            </section>
          </p>
          <button onClick={() => userContext.closeModal()}>
            close 
          </button>
       </section>
      </div>
    )
  }

  return (
    userContext.landingModal && generateLanding()
  )

}

export default DemoLanding
