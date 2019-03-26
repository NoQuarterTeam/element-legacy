import { useContext } from "react"

import { AppContext } from "../../application/context"

function useAppContext() {
  const { user } = useContext(AppContext)
  // Casting them as not null for App as there is CheckUser && CheckHouse
  if (!user) throw new Error("")
  return { user }
}

export default useAppContext
