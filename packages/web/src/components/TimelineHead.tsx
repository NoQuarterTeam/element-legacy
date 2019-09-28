import React from "react"
import styled from "styled-components"
import dayjs, { Dayjs } from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import {
  getMonths,
  getDays,
  today,
  calculateHabitProgress,
  monthNames,
  allActiveHabits,
} from "../lib/helpers"
import { useAllHabits } from "../lib/graphql/habit/hooks"
import { useAllProgress } from "../lib/graphql/progress/hooks"
import { FC } from "react"
import { darken, lighten } from "polished"
import { useTimelineContext } from "./providers/TimelineProvider"
import useAppContext from "../lib/hooks/useAppContext"
dayjs.extend(advancedFormat)

interface TimelineHeadProps {
  openHabitModal: (day: Dayjs) => void
}
const TimelineHead: FC<TimelineHeadProps> = ({ openHabitModal }) => {
  const { user } = useAppContext()
  const { selectedUserId } = useTimelineContext()
  const habits = useAllHabits()
  const allProgress = useAllProgress()

  return (
    <StyledMonthsHeadContainer>
      {getMonths(dayjs().subtract(20, "day"), 40).map((month, i) => {
        return (
          <StyledTimelineHead key={i}>
            <StyledMonthHeader>{monthNames[month]}</StyledMonthHeader>
            <StyledDaysHeader>
              {getDays(dayjs().subtract(20, "day"), 40)
                .filter(day => {
                  return month === day.month()
                })
                .map(day => (
                  <StyledContainer
                    key={day.unix()}
                    today={today(day)}
                    weekend={dayjs(day).day() === 0 || dayjs(day).day() === 6}
                  >
                    <StyledDayHeader key={day.unix()} today={today(day)}>
                      {dayjs(day).format("ddd Do")}
                    </StyledDayHeader>
                    {allProgress &&
                      user.id === selectedUserId &&
                      habits &&
                      allActiveHabits(day, habits).length !== 0 && (
                        <StyledHabits
                          today={today(day)}
                          count={habits && allActiveHabits(day, habits).length}
                          onClick={() => openHabitModal(day)}
                        >
                          {calculateHabitProgress(day, allProgress, habits).map(
                            (result: any[], index) => {
                              return (
                                <Circle
                                  key={index}
                                  completed={result[1]}
                                  count={
                                    habits &&
                                    allActiveHabits(day, habits).length
                                  }
                                  past={dayjs(day).isBefore(dayjs())}
                                />
                              )
                            },
                          )}
                        </StyledHabits>
                      )}
                    {today(day) &&
                      user.id === selectedUserId &&
                      (habits && allActiveHabits(day, habits).length === 0) && (
                        <StyledAddHabits onClick={() => openHabitModal(day)}>
                          Add habit
                        </StyledAddHabits>
                      )}
                    {today(day) && user.id === selectedUserId && !habits && (
                      <StyledAddHabits onClick={() => openHabitModal(day)}>
                        Add habit
                      </StyledAddHabits>
                    )}
                  </StyledContainer>
                ))}
            </StyledDaysHeader>
          </StyledTimelineHead>
        )
      })}
    </StyledMonthsHeadContainer>
  )
}

export default TimelineHead

const StyledTimelineHead = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledMonthsHeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
`

const StyledMonthHeader = styled.h3`
  display: flex;
  flex-direction: row;
  position: sticky;
  width: 64px;
  margin-bottom: ${p => p.theme.paddingM};
  left: ${p => p.theme.paddingML};
  margin-left: ${p => p.theme.paddingML};
  z-index: 1;
`

const StyledDaysHeader = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledDayHeader = styled.h3<{ today: boolean }>`
  font-weight: ${props => (props.today ? "800" : "400")};
  font-size: ${props => (props.today ? "15px" : "12px")};
  width: 88px;
  height: 190px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 160px;
  margin-top: -160px;
`

const StyledContainer = styled.div<{ weekend: boolean; today: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${props =>
    props.weekend
      ? p => darken(0.02, p.theme.colorBackground)
      : p => p.theme.colorBackground};
  padding-top: 168px;
  margin-top: -168px;
  background-color: ${props =>
    props.weekend
      ? p => darken(0.02, p.theme.colorBackground)
      : p => p.theme.colorBackground};
  background-color: ${props =>
    props.today ? lighten(0.35, props.theme.colorPurple) : ""};
`

const StyledHabits = styled.div<{ today: boolean; count: any }>`
  display: flex;
  max-width: 88px;
  justify-content: ${props => (props.count > 6 ? "center" : "space-evenly")};
  cursor: pointer;
  padding: ${p => p.theme.paddingM};
  padding-left: ${props =>
    props.count > 6 ? 8 + 0.73 * props.count + "px" : "8px"};
  margin: ${p => p.theme.paddingS};

  &:hover {
    background-color: ${p => lighten(0.34, p.theme.colorPurple)};
    border-radius: ${p => p.theme.borderRadius};
  }
`

const Circle = styled.div<{ completed: boolean; count: any; past: boolean }>`
  min-width: 11px;
  min-height: 11px;
  margin-left: ${props => (props.count > 6 ? -0.3 * props.count + "px" : 0)};
  border-radius: 50%;
  background-color: ${props =>
    props.completed
      ? "#A3ED9E"
      : props.past
      ? darken(0.1, props.theme.colorRed)
      : darken(0.1, props.theme.colorBackground)};
  z-index: ${props => (props.completed ? 1 : 0)};
`

const StyledAddHabits = styled.p`
  font-size: ${p => p.theme.textXS};
  background-color: ${props => lighten(0.2, props.theme.colorPlaceholder)};
  color: ${p => lighten(0.5, p.theme.colorText)};
  border-radius: ${p => p.theme.borderRadiusS};
  text-align: center;
  padding: ${p => p.theme.paddingS};
  margin: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${props => lighten(0.1, props.theme.colorPlaceholder)};
  }
`
