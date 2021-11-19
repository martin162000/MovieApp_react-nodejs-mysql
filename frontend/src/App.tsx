import React, { useEffect } from 'react';
import {Switch, Route} from 'react-router-dom';


// STYLES && ASSETS
import './assets/scss/App.scss';

// COMPONENTS
import TheNavigation from "./components/TheNavigation";

//views
import Movies from './views/Movies';
import Details from './views/Details';
import Favourites from './views/Favourites';
import Login from './views/Login';
import Register from './views/Register';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Logout from './views/Logout';
import Profile from './views/Profile';

function App() {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
        if(response.data.loggedIn === true) {
            //console.log(response.data.user[0]);
            dispatch({
              type: "ADD_USERID",
              data: response.data.user[0]
          });
        }
    })

    axios.get("http://localhost:3001/details").then((response) => {
      if(response.data.details) {
         dispatch({
             type: "SET_FAVORITE",
             playload: response.data.details
         });
      }
   })
}, [dispatch])

  return (
    <div className="App fadeIn">
      <header className="App-header">
            <TheNavigation  />
      </header>

      <main className="content">
          <Switch>
              <Route path="/firstReactApp/" component={Movies} exact />
              <Route path="/details/:movieId" component={Details} />
              <Route path="/details" component={Details} />
              <Route path="/favourites" component={Favourites} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/logout" component={Logout} />
              <Route path="/profile" component={Profile} />
           </Switch>


        </main>   

    </div>
  );
}

export default App;
