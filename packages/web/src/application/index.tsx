import React, { memo, Suspense } from "react"
import { Router } from "@reach/router"

import { AppContext } from "./context"
import { useMe } from "../lib/graphql/user/hooks"

import Loading from "../components/Loading"
import CheckAuth from "../components/CheckAuth"

import Timeline from "../pages/Timeline"
import NotFound from "../pages/NotFound"

function Application() {
  const { user, userLoading } = useMe()

  return (
    <AppContext.Provider value={{ user }}>
      <Loading loading={userLoading}>
        <Suspense fallback={null}>
          <CheckAuth>
            <Router>
              <Timeline path="/" />
              <NotFound default={true} />
            </Router>
          </CheckAuth>
        </Suspense>
      </Loading>
    </AppContext.Provider>
  )
}

export default memo(Application)
