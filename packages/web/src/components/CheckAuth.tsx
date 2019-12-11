import React from "react"
import { Redirect, Router, RouteComponentProps } from "@reach/router"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import { useAuth } from "./providers/MeProvider"

export const CheckAuth: React.FC = ({ children }) => {
  const user = useAuth()
  return user ? (
    <>{children}</>
  ) : (
    <Router>
      <Home path="/" />
      <Login path="/login" />
      <Register path="/register" />
      <NotFound default={true} />
    </Router>
  )
}

const NotFound: React.FC<RouteComponentProps> = () => {
  return <Redirect to="/" noThrow={true} />
}
