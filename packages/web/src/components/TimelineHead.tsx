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
  const { selectedUserId, daysBack, daysForward } = useTimelineContext()
  const habits = useAllHabits()
  const allProgress = useAllProgress()

  return (
    <StyledMonthsHeadContainer>
      {getMonths(dayjs().subtract(daysBack, "day"), daysBack + daysForward).map(
        (month, i) => {
          return (
            <StyledTimelineHead key={i}>
              <StyledMonthHeader>{monthNames[month]}</StyledMonthHeader>
              <StyledDaysHeader>
                {getDays(
                  dayjs().subtract(daysBack, "day"),
                  daysBack + daysForward,
                )
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
                            count={
                              habits && allActiveHabits(day, habits).length
                            }
                            onClick={() => openHabitModal(day)}
                          >
                            {calculateHabitProgress(
                              day,
                              allProgress,
                              habits,
                            ).map((result: any[], index) => {
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
                            })}
                          </StyledHabits>
                        )}
                      {today(day) &&
                        user.id === selectedUserId &&
                        (habits &&
                          allActiveHabits(day, habits).length === 0) && (
                          <StyledAddHabits
                            onClick={() => openHabitModal(day)}
                            today={today(day)}
                          >
                            Add habit
                          </StyledAddHabits>
                        )}
                      {today(day) && user.id === selectedUserId && !habits && (
                        <StyledAddHabits
                          onClick={() => openHabitModal(day)}
                          today={today(day)}
                        >
                          Add habit
                        </StyledAddHabits>
                      )}
                    </StyledContainer>
                  ))}
              </StyledDaysHeader>
            </StyledTimelineHead>
          )
        },
      )}
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
  width: max-content;
  padding: ${p => p.theme.paddingXL} 0;
  left: ${p => p.theme.paddingML};
  margin-left: ${p => p.theme.paddingML};
  z-index: 1;
  font-size: ${p => p.theme.textL};
  /* font-weight: ${p => p.theme.fontSemiBold}; */
  color: black;
`

const StyledDaysHeader = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledDayHeader = styled.h3<{ today: boolean }>`
  font-size: ${p => (p.today ? p.theme.textM : p.theme.textS)};
  /* font-weight: ${p =>
    p.today ? p.theme.fontSemiBold : p.theme.fontNormal}; */
  color: ${p => (p.today ? "black" : p.theme.colorText)};
  width: 98px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${p => (p.today ? "134px" : "140px")};
  margin-top: -140px;
`

const StyledContainer = styled.div<{ weekend: boolean; today: boolean }>`
  display: flex;
  flex-direction: column;
  padding-top: 140px;
  margin-top: -140px;
  background-color: ${p =>
    p.weekend
      ? p => lighten(0.025, p.theme.colorLightBlue)
      : p => p.theme.colorBackground};
  background-color: ${p => (p.today ? p.theme.colorLightBlue : "")};
`

const StyledHabits = styled.div<{ today: boolean; count: any }>`
  display: flex;
  /* max-width: 88px; */
  justify-content: ${props => (props.count > 6 ? "center" : "space-evenly")};
  cursor: pointer;
  padding: ${p => p.theme.paddingM};
  padding-left: ${props =>
    props.count > 6 ? 8 + 0.73 * props.count + "px" : "8px"};

  &:hover {
    background-color: ${p => lighten(0.02, p.theme.colorLightBlue)};
  }
`

const Circle = styled.div<{ completed: boolean; count: any; past: boolean }>`
  min-width: 11px;
  min-height: 11px;
  margin-left: ${p => (p.count > 6 ? -0.3 * p.count + "px" : 0)};
  border-radius: 50%;
  background-color: ${p =>
    p.completed
      ? "#8CCEA7"
      : p.past
      ? p.theme.colorRed
      : darken(0.1, p.theme.colorBackground)};
  z-index: ${p => (p.completed ? 1 : 0)};
`

const StyledAddHabits = styled.p<{ today: boolean }>`
  font-size: ${p => p.theme.textXS};
  background-color: ${p => lighten(0.2, p.theme.colorPlaceholder)};
  color: ${p => lighten(0.5, p.theme.colorText)};
  border-radius: ${p => p.theme.borderRadiusS};
  text-align: center;
  padding: ${p => p.theme.paddingS};
  margin: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${p =>
      darken(0.01, lighten(0.02, p.theme.colorLightBlue))};
  }
`
