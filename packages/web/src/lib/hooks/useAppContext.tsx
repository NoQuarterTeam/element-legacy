import { useContext } from "react"

import { AppContext } from "../../application/context"

function useAppContext() {
  const { user } = useContext(AppContext)
  // eslint-disable-next-line
  return { user: user! }
}

export default useAppContext
