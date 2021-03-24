import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login/Login';
import Notfound from './components/Notfound/Notfound';
import { createContext, useState } from 'react';
import Destination from './components/Destination/Destination';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const UserContext = createContext();

function App() {
  const [loggedInUser,setLoggedInUser] = useState({
    isSignedIn:false,
    name:'',
    email:'',
    password:'',
    error:'',
    message:''
  });
  // console.log("user from App: ",loggedInUser);
  return (
    <UserContext.Provider value = {[loggedInUser,setLoggedInUser]}>
    <Router>
    <div>
    
    <Switch>
    <Route exact path="/">
    <Home />
    </Route>
    <Route path="/home">
    <Home />
  </Route>
  <Route path="/login">
    <Login />
    </Route>
    <PrivateRoute path="/destination/:vehicleType">
    <Destination/>
    </PrivateRoute>
    <Route path="*">
    <Notfound />
  </Route>
    </Switch>
    </div>
    </Router>
    </UserContext.Provider>
  );
 
}

export default App;
