import React from "react"
import { ElementFragment } from "../../lib/graphql/types"
import { useMe } from "./MeProvider"

export const TimelineProvider: React.FC = ({ children }) => {
  const user = useMe()
  const [modal, setModal] = React.useState("")
  const [selectedElement, setSelectedElement] = React.useState()
  const [selectedUserId, setSelectedUserId] = React.useState(user.id)

  const handleSetModal = React.useCallback(setModal, [setModal])
  const handleSelectUser = React.useCallback(setSelectedUserId, [
    setSelectedUserId,
  ])
  const handleSetElement = React.useCallback(setSelectedElement, [
    setSelectedElement,
  ])

  return (
    <TimelineContextProvider
      value={{
        selectedUserId,
        handleSelectUser,
        modal,
        handleSetModal,
        handleSetElement,
        selectedElement,
      }}
    >
      {children}
    </TimelineContextProvider>
  )
}

interface TimelineContext {
  selectedUserId: string
  handleSelectUser: (userId: string) => void
  modal: string
  selectedElement: ElementFragment
  handleSetModal: (modal: string) => void
  handleSetElement: (element: ElementFragment) => void
}

const TimelineContext = React.createContext<TimelineContext | undefined>(
  undefined,
)
const TimelineContextProvider = TimelineContext.Provider

export function useTimelineContext() {
  const context = React.useContext(TimelineContext)
  if (!context) throw new Error("no timeline context")
  return context
}
