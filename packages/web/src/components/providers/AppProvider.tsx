import React from "react"
import { ThemeProvider } from "./ThemeProvider"
import { ApolloProvider } from "./ApolloProvider"
import { MeProvider } from "./MeProvider"
import { TimelineProvider } from "./TimelineProvider"
import { CheckAuth } from "../CheckAuth"

export const AppProvider: React.FC = ({ children }) => {
  return (
    <ApolloProvider>
      <ThemeProvider>
        <MeProvider>
          <CheckAuth>
            <TimelineProvider>{children}</TimelineProvider>
          </CheckAuth>
        </MeProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}
