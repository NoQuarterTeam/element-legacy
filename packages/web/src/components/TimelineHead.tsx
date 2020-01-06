import React from "react"
import styled from "styled-components"
import dayjs, { Dayjs } from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import { isToday, monthNames, getMonths } from "../lib/helpers"
import { useTimelineContext } from "./providers/TimelineProvider"
import { useMe } from "./providers/MeProvider"
import Habits from "./Habits"
import { useAllHabits } from "../lib/graphql/habit/hooks"
import { useAllProgress } from "../lib/graphql/progress/hooks"
import { media } from "../application/theme"

dayjs.extend(advancedFormat)

interface TimelineHeadProps {
  days: Dayjs[]
  startDate: Dayjs
  daysCount: number
}
const TimelineHead: React.FC<TimelineHeadProps> = ({
  days,
  startDate,
  daysCount,
}) => {
  const user = useMe()
  const { selectedUserId } = useTimelineContext()

  const { habits } = useAllHabits()
  const { allProgress } = useAllProgress()

  const months = React.useMemo(() => getMonths(startDate, daysCount), [
    startDate,
    daysCount,
  ])

  return (
    <StyledMonthsHeadContainer>
      {months.map((month, i) => (
        <StyledTimelineHead key={i}>
          <StyledMonthHeader>{monthNames[month.month]}</StyledMonthHeader>
          <StyledDaysHeader>
            {days
              .filter(
                day => month.month === day.month() && month.year === day.year(),
              )
              .map((day, i) => (
                <StyledContainer
                  key={i}
                  today={isToday(day)}
                  weekend={day.day() === 0 || day.day() === 6}
                  monday={day.day() === 1}
                  first={day.date() === 1}
                >
                  <StyledDayHeader
                    key={i}
                    today={isToday(day)}
                    weekend={day.day() === 0 || day.day() === 6}
                  >
                    {day.format("ddd Do")}
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

export default React.memo(TimelineHead)

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
  padding-top: ${p => (p.today ? "114px" : "119px")};
  background-color: ${p => p.today && p.theme.colorBlue};
  border-bottom: none;
  font-weight: ${p => (p.today ? p.theme.fontBold : p.theme.fontNormal)};
  padding-bottom: ${p => (p.today ? "4px" : "5px")};
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
  margin-top: -95px;
  background-color: ${p => p.theme.colorBackground};
  border-left: ${p => p.monday && "5px #efefef dotted"};
  border-left: ${p => p.first && `5px ${p.theme.colorLightBlue} dotted`};

  ${media.greaterThan("md")`
    margin-top: -95px;
  `};
`
