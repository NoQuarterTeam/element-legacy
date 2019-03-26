import React from "react"
import { MeQuery } from "../lib/graphql/types"

export interface AppContext {
  user: MeQuery["me"]
}
export const AppContext = React.createContext<AppContext>({
  user: null,
})
