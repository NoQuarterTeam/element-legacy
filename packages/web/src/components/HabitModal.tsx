import React, { FC } from "react"
import {
  useCreateHabit,
  useAllHabits,
  useArchiveHabit,
} from "../lib/graphql/habit/hooks"
import { useAllProgress } from "../lib/graphql/progress/hooks"

import { HabitInput, HabitFragment } from "../lib/graphql/types"
import Modal from "./Modal"
import HabitForm from "./HabitForm"
import FlexGrid from "./styled/FlexGrid"
import styled from "styled-components"
import { darken, lighten } from "polished"
import { calculateHabitProgress } from "../lib/helpers"
import { Dayjs } from "dayjs"
import dayjs = require("dayjs")

interface HabitModalProps {
  closeModal: () => void
  day: Dayjs
}
const HabitModal: FC<HabitModalProps> = ({ closeModal, day }) => {
  const createHabit = useCreateHabit()
  const archiveHabit = useArchiveHabit()
  const habits = useAllHabits()

  const allProgress = useAllProgress()
  if (!allProgress) return null

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
        // archivedAt: dayjs(day).format("DD/MM/YYYY"),
      },
    })
  }

  return (
    <Modal onClose={closeModal}>
      <StyledHeader>Habits - {dayjs(day).format("Do MMMM")}</StyledHeader>
      <StyledInfo>
        Select which elements of your life you want to track as habits
      </StyledInfo>
      <FlexGrid style={{ marginBottom: "1rem", justifyContent: "flex-start" }}>
        {habits &&
          calculateHabitProgress(day, allProgress, habits).map(
            (result: any[]) => {
              let habit = result[0]
              let completed = result[1]

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
      {habits && <HabitForm onFormSubmit={handleCreateHabit} habits={habits} />}
    </Modal>
  )
}

export default HabitModal

const StyledHeader = styled.h2`
  color: ${p => p.theme.colorLabel};
`

const StyledInfo = styled.p`
  margin: ${p => p.theme.paddingS} 0 ${p => p.theme.paddingL};
  color: ${p => p.theme.colorLabel};
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
  border-radius: ${p => p.theme.borderRadius};
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
