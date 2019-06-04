import React, { memo, Suspense } from "react"
import { Router } from "@reach/router"

import CheckAuth from "../components/CheckAuth"
import AppProvider from "../components/providers/AppProvider"
import Timeline from "../pages/Timeline"
import NotFound from "../pages/NotFound"

function Application() {
  return (
    <AppProvider>
      <Suspense fallback={null}>
        <CheckAuth>
          <Router>
            <Timeline path="/" />
            <NotFound default={true} />
          </Router>
        </CheckAuth>
      </Suspense>
    </AppProvider>
  )
}

export default memo(Application)
