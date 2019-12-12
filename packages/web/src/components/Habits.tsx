import React from "react"
import styled from "styled-components"
import { lighten } from "polished"
import dayjs, { Dayjs } from "dayjs"

import {
  isToday,
  calculateHabitProgress,
  allActiveHabits,
} from "../lib/helpers"
import HabitModal from "./HabitModal"
import { useDisclosure, Button } from "@chakra-ui/core"
import { useAllHabits } from "../lib/graphql/habit/hooks"
import { useAllProgress } from "../lib/graphql/progress/hooks"

interface Props {
  day: Dayjs
}

export const Habits: React.FC<Props> = ({ day }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { habits } = useAllHabits()
  const { allProgress } = useAllProgress()

  return (
    <>
      {!habits || !allProgress ? (
        <StyledHabits today={isToday(day)} count={0} />
      ) : allActiveHabits(day, habits).length === 0 && isToday(day) ? (
        // TODO clean up with theme, or something?
        <Button
          bg="#D2ECFC"
          height={31}
          fontSize={12}
          fontWeight="normal"
          onClick={onOpen}
          borderRadius={0}
          alignItems="space-between"
        >
          Add Habits
        </Button>
      ) : (
        <StyledHabits
          today={isToday(day)}
          count={habits && allActiveHabits(day, habits).length}
          onClick={onOpen}
        >
          {calculateHabitProgress(day, allProgress, habits).map(
            (result: any[], index) => (
              <StyledCircle
                key={index}
                completed={result[1]}
                count={habits && allActiveHabits(day, habits).length}
                past={dayjs(day).isBefore(dayjs())}
              />
            ),
          )}
        </StyledHabits>
      )}
      <HabitModal
        day={day}
        isOpen={isOpen}
        onClose={onClose}
        habits={habits}
        allProgress={allProgress}
      />
    </>
  )
}

const StyledHabits = styled.div<{ today: boolean; count: any }>`
  display: flex;
  height: 31px;
  justify-content: ${props => (props.count > 6 ? "center" : "space-evenly")};
  cursor: pointer;
  padding: ${p => p.theme.paddingM};
  padding-left: ${props =>
    props.count > 6 ? 8 + 0.73 * props.count + "px" : "8px"};
  background-color: ${p => (p.today ? p.theme.colorBlue : "transparent")};

  &:hover {
    background-color: ${p => lighten(0.02, p.theme.colorLightBlue)};
  }
`

const StyledCircle = styled.div<{
  completed: boolean
  count: any
  past: boolean
}>`
  min-width: 11px;
  min-height: 11px;
  margin-left: ${p => (p.count > 6 ? -0.3 * p.count + "px" : 0)};
  border-radius: 50%;
  background-color: ${p =>
    p.completed ? "#8CCEA7" : p.past ? p.theme.colorRed : "#EAEBEF"};
  z-index: ${p => (p.completed ? 1 : 0)};
`
