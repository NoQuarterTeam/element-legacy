import React, { FC } from "react"
import { useCreateHabit, useArchiveHabit } from "../lib/graphql/habit/hooks"

import {
  HabitInput,
  HabitFragment,
  ProgressFragment,
} from "../lib/graphql/types"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/core"
import HabitForm from "./HabitForm"
import FlexGrid from "./styled/FlexGrid"
import styled from "styled-components"
import { darken, lighten } from "polished"
import {
  calculateHabitProgress,
  allActiveHabits,
  isMobileDevice,
} from "../lib/helpers"
import { Dayjs } from "dayjs"
import dayjs from "dayjs"

interface HabitModalProps {
  day: Dayjs
  isOpen: boolean
  onClose: () => void
  habits?: HabitFragment[] | null
  allProgress?: ProgressFragment[] | null
}

const HabitModal: FC<HabitModalProps> = ({
  day,
  isOpen,
  onClose,
  habits,
  allProgress,
}) => {
  const [createHabit] = useCreateHabit()
  const [archiveHabit] = useArchiveHabit()

  const handleCreateHabit = async (habitData: HabitInput) => {
    const data = { ...habitData, archived: false }
    await createHabit({
      variables: {
        data,
      },
    })
  }

  const handleArchiveHabit = async (habitData: HabitFragment, day: Dayjs) => {
    await archiveHabit({
      variables: {
        habitId: habitData.id,
        data: { archivedAt: dayjs(day).format("MM/DD/YYYY") },
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={["full", "lg"]}>
      <ModalOverlay />
      <ModalContent
        m={0}
        height={["100vh", "auto"]}
        border="solid"
        borderWidth={4}
        borderColor="black"
      >
        <ModalBody p={12} m={0}>
          {isMobileDevice() && <ModalCloseButton />}
          <StyledHeader>
            Daily Habits - {dayjs(day).format("Do MMMM")}
          </StyledHeader>
          <StyledInfo>
            Select which elements of your life you want to track as habits
          </StyledInfo>
          <FlexGrid
            style={{ marginBottom: "1rem", justifyContent: "flex-start" }}
          >
            {habits &&
              allProgress &&
              calculateHabitProgress(day, allProgress, habits).map(
                (result: any[]) => {
                  const habit = result[0]
                  const completed = result[1]

                  return (
                    <StyledOptionContainer
                      key={habit.id}
                      color={habit.element.color}
                      completed={completed}
                    >
                      <StyledOption completed={completed}>
                        {habit.element.name}
                      </StyledOption>
                      <StyledDelete
                        color={habit.element.color}
                        onClick={() => handleArchiveHabit(habit, day)}
                      >
                        x
                      </StyledDelete>
                    </StyledOptionContainer>
                  )
                },
              )}
          </FlexGrid>
          {habits && (
            <HabitForm
              onFormSubmit={handleCreateHabit}
              habits={allActiveHabits(dayjs(day), habits)}
              day={day.format("YYYY-MM-DD")}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default HabitModal

const StyledHeader = styled.h2`
  color: black;
`

const StyledInfo = styled.p`
  margin: ${p => p.theme.paddingS} 0 ${p => p.theme.paddingL};
  color: black;
`

const StyledDelete = styled.p<{ color: string }>`
  font-size: ${p => p.theme.textS};
  color: ${p => darken(0.2, p.color)};
  position: absolute;
  top: 0;
  right: ${p => p.theme.paddingM};
  visibility: hidden;
`

const StyledOption = styled.p<{ completed: boolean }>`
  width: 100%;
  font-size: ${p => p.theme.textM};
  text-decoration: ${props => (props.completed ? "line-through" : "none")};
`

const StyledOptionContainer = styled.div<{ color: string; completed: boolean }>`
  position: relative;
  ${p => p.theme.flexCenter};
  padding: ${p => p.theme.paddingM} ${p => p.theme.paddingL};
  cursor: pointer;
  margin: ${p => p.theme.paddingS} 0;
  color: ${p => darken(0.2, p.color)};
  background-color: ${props =>
    props.completed ? "white" : p => lighten(0.2, p.color)};
  margin-right: ${p => p.theme.paddingM};
  border: ${props =>
    props.completed ? `1px solid ${lighten(0.2, props.color)}` : "none"};

  &:hover ${StyledDelete} {
    visibility: visible;
    transform: scale(1.2);
  }
`
