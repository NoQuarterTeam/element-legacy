import React, { useEffect, useRef, FC, useState } from "react"
import { RouteComponentProps } from "@reach/router"
import dayjs, { Dayjs } from "dayjs"
// import useAppContext from "../../lib/hooks/useAppContext"
// import { useLogout } from "../../lib/graphql/user/hooks"
import Day from "../components/Day"
import TimelineHead from "../components/TimelineHead"
import { useAllTasks } from "../lib/graphql/task/hooks"
import { getDays } from "../lib/helpers"
import DragDropContainer from "../components/DragDropContainer"
import TaskModal from "../components/TaskModal"
import HabitModal from "../components/HabitModal"
// import Button from "../components/Button"
import { TaskFragment, ElementFragment } from "../lib/graphql/types"
import { useAllElements } from "../lib/graphql/element/hooks"
import ElementDropdown from "../components/ElementDropdown"
import styled from "../application/theme"

const Timeline: FC<RouteComponentProps> = () => {
  // const { user } = useAppContext()
  const [modal, setModal] = useState("")
  const [task, setTask] = useState()
  const [dayClicked, setDayClicked] = useState()
  // const [isLoading, setIsLoading] = useState(true)
  const [filteredElements, setFilteredElements] = useState()

  const allTasks = useAllTasks()
  const elements = useAllElements()

  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (timelineRef.current) {
      window.scrollTo(timelineRef.current.scrollWidth / 2.4, 0)
    }
  }, [timelineRef.current])

  useEffect(() => {
    setFilteredElements(
      elements &&
        elements.filter(el => !el.archived).map(element => element.id),
    )
  }, [elements])

  const openTaskModal = (day: Dayjs, task?: TaskFragment) => {
    setModal("task")
    if (task) {
      setTask(task)
    } else {
      const scheduledTask = { scheduledDate: day }
      setTask(scheduledTask)
    }
  }

  const handleHabitModal = (day: Dayjs) => {
    setModal("habit")
    setDayClicked(day)
  }

  const closeTaskModal = () => {
    setTask("")
    setModal("")
  }

  const toggleFilteredElement = (element: ElementFragment) => {
    let newFiltered = filteredElements && filteredElements
    if (filteredElements && filteredElements.includes(element.id)) {
      if (element.children && element.children.length > 0) {
        element.children.map(child => {
          newFiltered = newFiltered.filter(
            (elementId: string) => elementId !== child.id,
          )
        })
      }
      newFiltered = newFiltered.filter(
        (elementId: string) => elementId !== element.id,
      )
    } else {
      if (element.children && element.children.length > 0) {
        element.children.map(child => {
          newFiltered = newFiltered.concat(child.id)
        })
      }
      newFiltered = newFiltered.concat(element.id)
    }
    setFilteredElements(newFiltered)
  }

  const toggleAll = () => {
    if (
      elements &&
      filteredElements.length === elements.filter(el => !el.archived).length
    ) {
      setFilteredElements([])
    } else {
      setFilteredElements(
        elements &&
          elements.filter(el => !el.archived).map(element => element.id),
      )
    }
  }

  return (
    <>
      {modal === "task" && (
        <TaskModal task={task} closeModal={() => closeTaskModal()} />
      )}
      {modal === "habit" && (
        <HabitModal day={dayClicked} closeModal={() => closeTaskModal()} />
      )}

      <StyledNav>
        <ElementDropdown
          handleSelectElement={element => toggleFilteredElement(element)}
          elements={elements}
          placeholder="Hide/Show Elements"
          filteredElements={filteredElements && filteredElements}
          toggleAll={toggleAll}
        />
      </StyledNav>
      <StyledTimelineWrapper ref={timelineRef}>
        <TimelineHead openHabitModal={handleHabitModal} />
        <StyledTimeline>
          {allTasks && (
            <DragDropContainer allTasks={allTasks}>
              <StyledDaysWrapper>
                {getDays(dayjs().subtract(20, "day"), 40).map(day => {
                  return (
                    <Day
                      key={day.unix()}
                      day={day}
                      month={dayjs(day).format("MMMM")}
                      tasks={allTasks.filter(
                        t =>
                          dayjs(t.scheduledDate).isSame(dayjs(day), "day") &&
                          filteredElements &&
                          filteredElements.includes(t.element.id),
                      )}
                      handleTaskModal={passedTask =>
                        openTaskModal(dayjs(day), passedTask)
                      }
                      weekend={dayjs(day).day() === 0 || dayjs(day).day() === 6}
                    />
                  )
                })}
              </StyledDaysWrapper>
            </DragDropContainer>
          )}
        </StyledTimeline>
      </StyledTimelineWrapper>
    </>
  )
}

export default Timeline

const StyledNav = styled.div`
  height: 50px;
  width: 100%;
  z-index: 98;
  position: fixed;
  background-color: ${p => p.theme.colorBackground};
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.0655288);
  display: flex;
  padding-left: 100px;
`

const StyledTimelineWrapper = styled.div`
  padding-top: 100px;
  /* overflow: scroll; */
`

const StyledTimeline = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledDaysWrapper = styled.div`
  display: flex;
  width: fit-content;
  overflow: scroll;
`
