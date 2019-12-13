import React from "react"
import styled from "styled-components"
import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import { getMonths, getDays, isToday, monthNames } from "../lib/helpers"
import { useTimelineContext } from "./providers/TimelineProvider"
import { useMe } from "./providers/MeProvider"
import { Habits } from "./Habits"
import { useAllHabits } from "../lib/graphql/habit/hooks"
import { useAllProgress } from "../lib/graphql/progress/hooks"

dayjs.extend(advancedFormat)

interface TimelineHeadProps {
  daysBack: number
  daysForward: number
}
const TimelineHead: React.FC<TimelineHeadProps> = ({
  daysBack,
  daysForward,
}) => {
  const user = useMe()
  const { selectedUserId } = useTimelineContext()

  const { habits } = useAllHabits()
  const { allProgress } = useAllProgress()

  const months = React.useMemo(
    () => getMonths(dayjs().subtract(daysBack, "day"), daysBack + daysForward),
    [daysBack, daysForward],
  )
  const days = React.useMemo(
    () => getDays(dayjs().subtract(daysBack, "day"), daysBack + daysForward),
    [daysBack, daysForward],
  )

  return (
    <StyledMonthsHeadContainer>
      {months.map((month, i) => (
        <StyledTimelineHead key={i}>
          <StyledMonthHeader>{monthNames[month]}</StyledMonthHeader>
          <StyledDaysHeader>
            {days
              .filter(day => month === day.month())
              .map(day => (
                <StyledContainer
                  key={day.unix()}
                  today={isToday(day)}
                  weekend={dayjs(day).day() === 0 || dayjs(day).day() === 6}
                  monday={dayjs(day).day() === 1}
                  first={dayjs(day).date() === 1}
                >
                  <StyledDayHeader
                    key={day.unix()}
                    today={isToday(day)}
                    weekend={dayjs(day).day() === 0 || dayjs(day).day() === 6}
                  >
                    {dayjs(day).format("ddd Do")}
                  </StyledDayHeader>

                  {user.id === selectedUserId && (
                    <Habits
                      day={day}
                      allProgress={allProgress}
                      habits={habits}
                    />
                  )}
                </StyledContainer>
              ))}
          </StyledDaysHeader>
        </StyledTimelineHead>
      ))}
    </StyledMonthsHeadContainer>
  )
}

export default TimelineHead

const StyledTimelineHead = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${p => p.theme.colorBackground};
`

const StyledMonthsHeadContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: fit-content;
  z-index: 50;
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
  color: ${p => (p.today ? "black" : p.theme.colorText)};
  width: 98px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${p => (p.today ? "113px" : "119px")};
  background-color: ${p => p.today && p.theme.colorBlue};
  border-bottom: none;
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
