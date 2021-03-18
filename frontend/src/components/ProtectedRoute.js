import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ allowed, path, children, redirectPath = "/login" }) => {
  return allowed ?
    <Route path={path}>
      {children}
    </Route>
    :
    <Redirect to={redirectPath} />
}

export default ProtectedRoute
