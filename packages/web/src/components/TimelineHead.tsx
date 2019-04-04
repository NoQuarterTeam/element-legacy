import React from "react"
import styled from "styled-components"
import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import { getMonths, getDays, today } from "../lib/helpers"
dayjs.extend(advancedFormat)

function TimelineHead() {
  // const { openHabitsModal, habits, groupedProgress } = useContext(AppContext)

  // const calculateProgress = day => {
  //   const progArr = groupedProgress[dayjs(day).format("DD/MM/YYYY")].reduce(
  //     (acc, progress) => {
  //       return [...acc, progress.task.element.name]
  //     },
  //     [],
  //   )
  //   // remove duplicates:
  //   const progressUnique = progArr.filter(function(value, index, array) {
  //     return array.indexOf(value) == index
  //   })

  //   // habits filter by createdAt date is before now

  //   const habitArr = habits
  //     .filter(h => !h.archived)
  //     .filter(hab =>
  //       dayjs(day)
  //         .startOf("day")
  //         .isAfter(
  //           dayjs(hab.createdAt)
  //             .startOf("day")
  //             .subtract(1, "day"),
  //         ),
  //     )
  //     .reduce((acc, habit) => {
  //       return [...acc, habit.element.name]
  //     }, [])

  //   const results = habitArr.reduce((acc, habit) => {
  //     return [...acc, progressUnique.includes(habit)]
  //   }, [])

  //   return results
  // }

  // DAYJS set month is broken!!
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <StyledMonthsHeadContainer>
      {getMonths(dayjs().subtract(10, "day"), 20).map((month, i) => {
        return (
          <StyledTimelineHead key={i}>
            <StyledMonthHeader>{monthNames[month]}</StyledMonthHeader>
            <StyledDaysHeader>
              {getDays(dayjs().subtract(20, "day"), 40)
                .filter(day => {
                  return month === day.month()
                })
                .map(day => (
                  <StyledContainer key={day.unix()}>
                    <StyledDayHeader
                      key={day.unix()}
                      today={today(day)}
                      weekend={dayjs(day).day() === 0 || dayjs(day).day() == 6}
                    >
                      {dayjs(day).format("ddd Do")}
                    </StyledDayHeader>
                    {/* <StyledHabbits
                      weekend={dayjs(day).day() == 0 || dayjs(day).day() == 6}
                      onClick={() => openHabitsModal(dayjs(day))}
                    >
                      {groupedProgress[dayjs(day).format("DD/MM/YYYY")] &&
                        calculateProgress(day).map((e, index) => {
                          return e && <Circle key={index} completed={e} />
                        })}

                      {groupedProgress[dayjs(day).format("DD/MM/YYYY")] &&
                        calculateProgress(day).map((e, index) => {
                          return !e && <Circle key={index} completed={e} />
                        })}

                      {!groupedProgress[dayjs(day).format("DD/MM/YYYY")] &&
                        habits
                          .filter(h => !h.archived)
                          .filter(hab =>
                            dayjs(day)
                              .startOf("day")
                              .isAfter(
                                dayjs(hab.createdAt)
                                  .startOf("day")
                                  .subtract(1, "day"),
                              ),
                          )
                          .map((e, index) => {
                            return <Circle key={index} completed={false} />
                          })}
                    </StyledHabbits> */}
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
  box-shadow: 0 4px 2px -2px rgba(15, 15, 15, 0.1);
  width: fit-content;
`

const StyledMonthHeader = styled.h3`
  display: flex;
  flex-direction: row;
  position: sticky;
  width: 64px;
  left: 16px;
  margin-left: 16px;
`

const StyledDaysHeader = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledDayHeader = styled.h3<{ weekend: boolean; today: boolean }>`
  font-weight: ${props => (props.today ? "800" : "400")};
  font-size: ${props => (props.today ? "14px" : "12px")};
  width: 88px;
  height: 177px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.weekend ? "rgba(0,0,0,0.03)" : "")};
  padding-top: 160px;
  margin-top: -160px;
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`

// const StyledHabbits = styled.div<{ weekend: boolean }>`
//   display: flex;
//   justify-content: space-around;
//   cursor: pointer;
//   padding: 8px 8px;
//   background-color: ${props => (props.weekend ? "rgba(0,0,0,0.03)" : "")};
// `

// const Circle = styled.div<{ completed: boolean }>`
//   width: 8px;
//   height: 8px;
//   border-radius: 50%;
//   background-color: ${props => (props.completed ? "lightgreen" : "red")};
// `
