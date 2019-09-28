import React, { FC, useState, createContext } from "react"
import useAppContext from "../../lib/hooks/useAppContext"
import { useCallback } from "react"
import { useContext } from "react"
import { ElementFragment } from "../../lib/graphql/types"

const TimelineProvider: FC = ({ children }) => {
  const { user } = useAppContext()
  const [modal, setModal] = useState("")
  const [selectedElement, setSelectedElement] = useState()
  const [selectedUserId, setSelectedUserId] = useState(user.id)

  const handleSetModal = useCallback(setModal, [setModal])
  const handleSelectUser = useCallback(setSelectedUserId, [setSelectedUserId])
  const handleSetElement = useCallback(setSelectedElement, [setSelectedElement])

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

export default TimelineProvider

interface TimelineContext {
  selectedUserId: string
  handleSelectUser: (userId: string) => void
  modal: string
  selectedElement: ElementFragment
  handleSetModal: (modal: string) => void
  handleSetElement: (element: ElementFragment) => void
}

const TimelineContext = createContext<TimelineContext | undefined>(undefined)
const TimelineContextProvider = TimelineContext.Provider

export function useTimelineContext() {
  const context = useContext(TimelineContext)
  if (!context) throw new Error("no timeline contect")
  return context
}
