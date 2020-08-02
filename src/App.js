import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Routes/Home';

import LoginPage from './Routes/LoginPage';
import RegisterPage from './Routes/RegisterPage';
import RecipePage from './Routes/RecipePage';
import CreateRecipePage from './Routes/CreateRecipePage';
// import AboutPage from './Routes/AboutPage';
// import AccountPage from './Routes/AccountPage';
import Header from './components/Header';
import UserDash from './Routes/UserDash'
import RecipesInListPage from './Routes/RecipesInListPage'


function App() {
  return (
   <div>
     <Header />
     <main>
       <Switch>
         <Route exact path={'/'} component={Home}  />
         <Route path={'/recipes/:recipeId'} component={RecipePage}/>
         <Route path={'/create'} component={CreateRecipePage} />
         <Route path={'/login'} component={LoginPage} />
         <Route path={'/register'} component={RegisterPage} />
         <Route path={'/dashboard'} component={UserDash} />
         <Route path={'/users/:user_id/lists/:list_id/recipes'} component={RecipesInListPage} />
         {/* <Route path={'/about'} component={AboutPage}/>
         <Route path={'/account'} component={AccountPage}/> */}
       </Switch>
     </main>
   </div>
  );
}

export default App;
