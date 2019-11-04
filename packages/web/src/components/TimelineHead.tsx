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
                      monday={dayjs(day).day() === 1}
                      first={dayjs(day).date() === 1}
                    >
                      <StyledDayHeader
                        key={day.unix()}
                        today={today(day)}
                        weekend={
                          dayjs(day).day() === 0 || dayjs(day).day() === 6
                        }
                      >
                        {dayjs(day).format("ddd Do")}
                      </StyledDayHeader>

                      {allProgress &&
                      user.id === selectedUserId &&
                      habits &&
                      allActiveHabits(day, habits).length !== 0 ? (
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
                      ) : user.id === selectedUserId &&
                        (habits &&
                          allActiveHabits(day, habits).length === 0) ? (
                        today(day) ? (
                          <StyledAddHabits
                            onClick={() => openHabitModal(day)}
                            today={today(day)}
                          >
                            Add habit
                          </StyledAddHabits>
                        ) : (
                          <StyledHabits today={today(day)} count={1} />
                        )
                      ) : (
                        <></>
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
  padding: ${p => p.theme.paddingL} 0;
  left: ${p => p.theme.paddingML};
  margin-left: ${p => p.theme.paddingML};
  z-index: 1;
  font-size: ${p => p.theme.textXL};
  /* font-weight: ${p => p.theme.fontSemiBold};  */
  color: black;
`

const StyledDaysHeader = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledDayHeader = styled.h3<{ today: boolean; weekend: boolean }>`
  font-size: ${p => (p.today ? p.theme.textM : p.theme.textS)};
  /* font-weight: ${p =>
    p.today ? p.theme.fontSemiBold : p.theme.fontNormal}; */
  color: ${p => (p.today ? "black" : p.theme.colorText)};
  width: 98px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${p => (p.today ? "113px" : "119px")};
  /* margin-top: ${p => (p.today ? "-6px" : "0px")}; */
  background-color: ${p => p.today && p.theme.colorBlue};
  /* border: ${p => (p.today ? "3px solid black" : "none")}; */
  /* box-sizing: content-box; */

  border-bottom: none;
  /* border-radius: ${p => p.theme.borderRadiusL} ${p =>
  p.theme.borderRadiusL}  0 0; */
  font-weight: ${p => (p.today ? p.theme.fontBold : p.theme.fontNormal)};
  padding-bottom: 5px;

`

const StyledContainer = styled.div<{
  weekend: boolean
  today: boolean
  monday: boolean
  first: boolean
}>`
  display: flex;
  flex-direction: column;
  padding-top: 0px;
  margin-top: -93px;
  background-color: ${p => p.theme.colorBackground};
  border-left: ${p => p.monday && "5px #efefef dotted"};
  border-left: ${p => p.first && `5px ${p.theme.colorLightBlue} dotted`};
`

const StyledHabits = styled.div<{ today: boolean; count: any }>`
  display: flex;
  /* max-width: 88px; */
  height: 31px;
  justify-content: ${props => (props.count > 6 ? "center" : "space-evenly")};
  cursor: pointer;
  padding: ${p => p.theme.paddingM};
  padding-left: ${props =>
    props.count > 6 ? 8 + 0.73 * props.count + "px" : "8px"};
  background-color: ${p => (p.today ? p.theme.colorBlue : "transparent")};
  /* border: ${p => (p.today ? "3px solid black" : "none")}; */
  /* border-bottom: none;
  border-top: none; */

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
    p.completed ? "#8CCEA7" : p.past ? p.theme.colorRed : "#EAEBEF"};
  z-index: ${p => (p.completed ? 1 : 0)};
`

const StyledAddHabits = styled.p<{ today: boolean }>`
  font-size: ${p => p.theme.textXS};
  background-color: ${p => lighten(0.2, p.theme.colorPlaceholder)};
  color: ${p => lighten(0.5, p.theme.colorText)};
  border-radius: ${p => p.theme.borderRadiusS};
  text-align: center;
  align-items: center;
  /* padding: ${p => p.theme.paddingS}; */
  height: 31px;
  cursor: pointer;

  &:hover {
    background-color: ${p =>
      darken(0.01, lighten(0.02, p.theme.colorLightBlue))};
  }
`
