import React, { useContext } from "react";
import Home  from "./pages/home/Home";
import Login from "./pages/login/Login"
import Profile from "./pages/profile/Profile"
import Messenger from "./pages/messenger/Messenger"
import CreateUser from "./pages/createUser/CreateUser"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";


function App() {

  const {user} = useContext(AuthContext)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login /> }
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>
        <Route path="/profile/:username">
          {!user ? <Redirect to="/" /> : <Profile />}
        </Route>
        <Route path="/createUser">
          {!user ? <Redirect to="/" /> : <CreateUser />}
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
