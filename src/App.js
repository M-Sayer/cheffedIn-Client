import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css'

import Home from './Routes/Home';

import LoginPage from './Routes/LoginPage';
import RegisterPage from './Routes/RegisterPage';
import RecipePage from './Routes/RecipePage';
import CreateRecipePage from './Routes/CreateRecipePage';
// import AboutPage from './Routes/AboutPage';
import Header from './components/Header';
import UserDash from './Routes/UserDash'
import RecipesInListPage from './Routes/RecipesInListPage'
import PrivateRoute from './Routes/PrivateRoute'


function App() {
  return (
   <div className='App'>
     <>
      <Header />
     </>
     <main>
       <Switch>
         <Route exact path={'/'} component={Home}  />
         <Route path={'/recipes/:recipeId'} component={RecipePage}/>
         <PrivateRoute path={'/create'} component={CreateRecipePage} />
         <Route path={'/login'} component={LoginPage} />
         <PrivateRoute path={'/register'} component={RegisterPage} />
         <PrivateRoute path={'/dashboard'} component={UserDash} />
         <PrivateRoute path={'/users/:user_id/lists/:list_id/recipes'} component={RecipesInListPage} />
         {/* <Route path={'/about'} component={AboutPage}/>
        */}
       </Switch>
     </main>
   </div>
  );
}

export default App;
