import { useContext } from "react"
import { AppContext } from "../../application/context"
import { Me } from "../../lib/graphql/types"

type AppContextReturn = {
  user: Me.Me
}

function useAppContext(): AppContextReturn {
  const { user } = useContext(AppContext)
  return { user: user! }
}

export default useAppContext
