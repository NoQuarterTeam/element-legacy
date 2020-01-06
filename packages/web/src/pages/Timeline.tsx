import React from "react"
import { RouteComponentProps } from "@reach/router"
import dayjs from "dayjs"
import throttle from "lodash.throttle"

import Day from "../components/Day"
import TimelineHead from "../components/TimelineHead"
import { getDays, isMobileDevice } from "../lib/helpers"
import { DragDropContainer } from "../components/DragDropContainer"

import { useAllTasksQuery } from "../lib/graphql/types"
import styled, { media } from "../application/theme"
import Nav from "../components/Nav"
import { useTimelineContext } from "../components/providers/TimelineProvider"

import { useMe } from "../components/providers/MeProvider"
import useEventListener from "../lib/hooks/useEventListener"

const Timeline: React.FC<RouteComponentProps> = () => {
  const user = useMe()
  const [initialLoad, setInitialLoad] = React.useState(true)

  let DAY_COUNT = 20
  if (isMobileDevice()) {
    DAY_COUNT = 5
  }

  const [daysBack, setDaysBack] = React.useState(DAY_COUNT)
  const [daysForward, setDaysForward] = React.useState(DAY_COUNT)

  const [filteredElements, setFilteredElements] = React.useState<string[]>([])
  const { selectedUserId } = useTimelineContext()

  const { data, fetchMore, loading } = useAllTasksQuery({
    variables: { selectedUserId, daysBack: DAY_COUNT, daysForward: DAY_COUNT },
    fetchPolicy: "cache-and-network",
  })
  const allTasks = data && data.allTasks ? data.allTasks : []

  const timelineRef = React.useRef<HTMLDivElement>(null)
  const fullWidthTimelineRef = React.useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!fullWidthTimelineRef.current) return

    const right =
      fullWidthTimelineRef.current.getBoundingClientRect().right - 100 <=
      window.innerWidth

    const left = fullWidthTimelineRef.current.getBoundingClientRect().left >= 0

    if (right && !loading) {
      handleForward()
    } else if (left && !loading) {
      handleBack()
    }
  }

  useEventListener(
    "scroll",
    throttle(handleScroll, 400, { leading: true, trailing: true }),
    true,
  )

  const handleForward = async () => {
    fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !prev.allTasks || !fetchMoreResult.allTasks)
          return prev
        return Object.assign({}, prev, {
          allTasks: [...prev.allTasks, ...fetchMoreResult.allTasks],
        })
      },
      variables: {
        selectedUserId,
        daysBack: -daysForward - 1,
        daysForward: daysForward + DAY_COUNT,
      },
    })

    setDaysForward(daysForward + DAY_COUNT)
  }

  const handleBack = async () => {
    fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!prev.allTasks || !fetchMoreResult?.allTasks) return prev

        return Object.assign({}, prev, {
          allTasks: [...prev.allTasks, ...fetchMoreResult.allTasks],
        })
      },
      variables: {
        selectedUserId,
        daysBack: daysBack + DAY_COUNT,
        daysForward: -daysBack - 1,
      },
    })
    if (timelineRef.current) {
      let num = (DAY_COUNT - 1.5) * 98
      if (isMobileDevice()) {
        num = (DAY_COUNT + 1) * 98
      }
      timelineRef.current.scrollTo({
        left: num,
      })
    }

    setDaysBack(daysBack + DAY_COUNT)
  }

  const handleScrollToToday = React.useCallback(async () => {
    if (timelineRef.current) {
      if (isMobileDevice()) {
        const num = daysBack * 98
        timelineRef.current.scrollTo(num, 0)
      } else {
        const num = (daysBack - 2) * 98
        timelineRef.current.scrollTo(num, 0)
      }
    }
  }, [daysBack])

  // Initial load
  React.useEffect(() => {
    if (initialLoad && timelineRef.current) {
      handleScrollToToday()
      setInitialLoad(false)
    }
  }, [handleScrollToToday, initialLoad])

  const startDate = React.useMemo(() => dayjs().subtract(daysBack, "day"), [
    daysBack,
  ])

  const daysCount = React.useMemo(() => daysBack + daysForward, [
    daysBack,
    daysForward,
  ])

  const days = React.useMemo(() => getDays(startDate, daysCount), [
    startDate,
    daysCount,
  ])

  const filteredTasks = allTasks.filter(
    task => !filteredElements?.includes(task.element.id),
  )

  return (
    <>
      {filteredTasks && (
        <StyledTimelineWrapper ref={timelineRef}>
          <TimelineHead
            days={days}
            startDate={startDate}
            daysCount={daysCount}
          />
          <StyledTimeline ref={fullWidthTimelineRef}>
            <StyledSpacer currentUser={user.id === selectedUserId} />
            <StyledDaysWrapper>
              <DragDropContainer tasks={filteredTasks}>
                {days.map(day => (
                  <Day
                    key={day.unix()}
                    day={day}
                    tasks={filteredTasks.filter(t =>
                      dayjs(t.scheduledDate).isSame(dayjs(day), "day"),
                    )}
                    selectedUserId={selectedUserId}
                  />
                ))}
              </DragDropContainer>
            </StyledDaysWrapper>
          </StyledTimeline>
          <Nav
            filteredElements={filteredElements}
            handleSetFilteredElements={setFilteredElements}
            scrollToToday={handleScrollToToday}
          />
        </StyledTimelineWrapper>
      )}
    </>
  )
}

export default Timeline

const StyledTimelineWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
`

const StyledTimeline = styled.div`
  width: fit-content;
  height: 100vh;
  overflow-x: auto;
  overflow-y: scroll;
`

const StyledDaysWrapper = styled.div`
  display: flex;
  width: fit-content;
  flex: 1;
  min-height: min-content;
  height: fit-content;
  overflow: hidden;
`

const StyledSpacer = styled.div<{ currentUser: boolean }>`
  height: ${p => (p.currentUser ? "172px" : "141px")};

  ${p => media.greaterThan("md")`
    height: ${p.currentUser ? "172px" : "141px"};
  `}
`
