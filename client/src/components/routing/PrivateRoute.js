import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import auth from "../../reducers/auth";

const PrivateRoute = ({ component: Component, auth, ...rest}) => (
    <Route {...rest} render={props => !auth.isAuthenticated && !auth.loading ? <Redirect to="login" /> : (<Component {...props}/>)}/>
)

const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps)(PrivateRoute);