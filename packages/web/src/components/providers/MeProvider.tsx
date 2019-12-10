import React from "react"

import { useMeQuery, UserFragment } from "../../lib/graphql/types"
import { Loading } from "../Loading"

const MeContext = React.createContext<{ me: UserFragment | null | undefined }>({
  me: undefined,
})

export const MeProvider: React.FC = ({ children }) => {
  const { data, loading } = useMeQuery()
  const user = data?.me
  return (
    <MeContext.Provider value={{ me: user }}>
      <Loading loading={loading}>{children}</Loading>
    </MeContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(MeContext)
  if (!context) throw new Error("useMe must be called under a MeProvider")
  return context.me
}

export function useMe() {
  const context = React.useContext(MeContext)
  if (!context) throw new Error("useMe must be called under a MeProvider")
  if (!context.me) throw new Error("User not found")
  return context.me
}
