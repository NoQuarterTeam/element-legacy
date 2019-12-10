import React from "react"
import { Redirect, Router, RouteComponentProps } from "@reach/router"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import { useMe } from "./providers/MeProvider"

const CheckAuth: React.FC = ({ children }) => {
  const user = useMe()
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

export default CheckAuth

const NotFound: React.FC<RouteComponentProps> = () => {
  return <Redirect to="/" noThrow={true} />
}
