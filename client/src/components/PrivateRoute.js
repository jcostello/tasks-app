import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {userAuthenticated } from './../utils/userAuthentication'

const PrivateRoute = ({ component: Component, ...rest }) =>  {
  return userAuthenticated() 
    ? <Route {...rest} render={() => ( rest.children )} /> 
    : <Redirect to='/sign_in' />
}

export default PrivateRoute