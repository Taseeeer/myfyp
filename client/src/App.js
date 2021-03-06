import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";

// Redux 
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profileforms/CreateProfile";
import EditProfile from "./components/profileforms/EditProfile";
import AddExperience from "./components/profileforms/AddExperience";
import AddEducation from "./components/profileforms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";

if(localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return(
    <React.Fragment>
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />  
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />  
            <Route exact path="/register" component={Register} />  
            <Route exact path="/profiles" component={Profiles} />  
            <Route exact path="/profile/:id" component={Profile} />  
            <PrivateRoute exact path="/dashboard" component={Dashboard} />  
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />  
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />  
            <PrivateRoute exact path="/add-experience" component={AddExperience} />  
            <PrivateRoute exact path="/add-education" component={AddEducation} />  
            <PrivateRoute exact path="/posts" component={Posts} />  
          </Switch>
        </section>
      </Router>
    </Provider>
    </React.Fragment>
  );
};

export default App;
