import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RecipesListPage from './Routes/RecipesListPage';
// import LoginPage from './Routes/LoginPage';
// import RegisterPage from './Routes/RegisterPage';
import RecipePage from './Routes/RecipePage';
// import CreateRecipePage from './Routes/CreateRecipePage';
// import AboutPage from './Routes/AboutPage';
// import AccountPage from './Routes/AccountPage';
import Header from './components/Header';


function App() {
  return (
   <div>
     <header>

     </header>
     <main>
       <Switch>
         <Route exact path={'/'} component={RecipesListPage}  />
         <Route path={'recipe/:recipeId'} component={RecipePage}/>
         {/* <Route path={'/login'} component={LoginPage}/>
         <Route path={'/register'} component={RegisterPage}/>
         <Route path={'/create'} component={CreateRecipePage}/>
         <Route path={'/about'} component={AboutPage}/>
         <Route path={'/account'} component={AccountPage}/> */}
       </Switch>
     </main>
   </div>
  );
}

export default App;
