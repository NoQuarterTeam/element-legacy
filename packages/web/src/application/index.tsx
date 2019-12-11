import React, { memo, Suspense } from "react"
import { Router } from "@reach/router"

import { AppProvider } from "../components/providers/AppProvider"
import Timeline from "../pages/Timeline"
import NotFound from "../pages/NotFound"

function Application() {
  return (
    <AppProvider>
      <Suspense fallback={null}>
        <Router>
          <Timeline path="/" />
          <NotFound default={true} />
        </Router>
      </Suspense>
    </AppProvider>
  )
}

export default memo(Application)
