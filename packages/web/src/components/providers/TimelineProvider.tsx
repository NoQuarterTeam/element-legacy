import React, {
  FC,
  useState,
  createContext,
  useCallback,
  useContext,
} from "react"
import { ElementFragment } from "../../lib/graphql/types"
import { isMobileDevice } from "../../lib/helpers"
import { useMe } from "./MeProvider"

const TimelineProvider: FC = ({ children }) => {
  const user = useMe()
  const [modal, setModal] = useState("")
  const [selectedElement, setSelectedElement] = useState()
  const [selectedUserId, setSelectedUserId] = useState(user.id)

  let days = 20
  if (isMobileDevice()) {
    days = 4
  }

  const [daysBack, setDaysBack] = useState(days)
  const [daysForward, setDaysForward] = useState(days)

  const handleSetModal = useCallback(setModal, [setModal])
  const handleSelectUser = useCallback(setSelectedUserId, [setSelectedUserId])
  const handleSetElement = useCallback(setSelectedElement, [setSelectedElement])
  const handleDaysForward = useCallback(setDaysForward, [setDaysForward])
  const handleDaysBack = useCallback(setDaysBack, [setDaysBack])
  // const allTasks = useAllTasks(selectedUserId)

  return (
    <TimelineContextProvider
      value={{
        selectedUserId,
        handleSelectUser,
        modal,
        handleSetModal,
        handleSetElement,
        selectedElement,
        daysForward,
        daysBack,
        handleDaysForward,
        handleDaysBack,
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
  daysForward: number
  daysBack: number
  handleDaysForward: (days: number) => void
  handleDaysBack: (days: number) => void
}

const TimelineContext = createContext<TimelineContext | undefined>(undefined)
const TimelineContextProvider = TimelineContext.Provider

export function useTimelineContext() {
  const context = useContext(TimelineContext)
  if (!context) throw new Error("no timeline contect")
  return context
}
