import React, { FC } from "react"
import ThemeProvider from "./ThemeProvider"
import ApolloProvider from "./ApolloProvider"
import StateProvider from "./StateProvider"
import TimelineProvider from "./TimelineProvider"
import CheckAuth from "../CheckAuth"

const AppProvider: FC = ({ children }) => {
  return (
    <ApolloProvider>
      <ThemeProvider>
        <StateProvider>
          <CheckAuth>
            <TimelineProvider>{children}</TimelineProvider>
          </CheckAuth>
        </StateProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default AppProvider
