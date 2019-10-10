import React, { FC, useState } from "react"
import styled, { darken } from "../application/theme"
import ElementDropdown from "./ElementDropdown"
import { ElementFragment } from "../lib/graphql/types"
import { useAllElements } from "../lib/graphql/element/hooks"
import logo from "../public/logo.png"
import textLogo from "../public/textLogo.png"

import { useLogout } from "../lib/graphql/user/hooks"
import { useGetSharedUsersByUser } from "../lib/graphql/sharedElement/hooks"
import { useTimelineContext } from "./providers/TimelineProvider"
import useAppContext from "../lib/hooks/useAppContext"
import { linearGradient } from "polished"

interface NavProps {
  filteredElements: string[]
  handleSetFilteredElements: (elements: string[]) => void
  scrollToToday: () => void
}

const Nav: FC<NavProps> = ({
  filteredElements,
  handleSetFilteredElements,
  scrollToToday,
}) => {
  const { user } = useAppContext()

  const { handleSelectUser, selectedUserId } = useTimelineContext()
  const elements = useAllElements(selectedUserId)
  const sharedUsers = useGetSharedUsersByUser(user.id)
  const [elementsOpen, setElementsOpen] = useState(false)
  const logout = useLogout()

  // TODO: MOVE OUT TO LIB
  const toggleFilteredElement = (element: ElementFragment) => {
    let newFiltered = filteredElements && filteredElements

    if (!elements) return false
    if (filteredElements.length === 0) {
      // if all elements are shown and one is clicked add all others to show only the clicked and its children
      newFiltered = elements.map(element => element.id)

      if (element.children && element.children.length > 0) {
        element.children.map(
          child =>
            (newFiltered = newFiltered.filter(
              (elementId: string) => elementId !== child.id,
            )),
        )
      }
      newFiltered = newFiltered.filter(
        (elementId: string) => elementId !== element.id,
      )
    } else if (filteredElements && filteredElements.includes(element.id)) {
      // if included in filtered array remove from array to hide and its children
      if (element.children && element.children.length > 0) {
        element.children.map(
          child =>
            (newFiltered = newFiltered.filter(
              (elementId: string) => elementId !== child.id,
            )),
        )
      }
      newFiltered = newFiltered.filter(
        (elementId: string) => elementId !== element.id,
      )
    } else {
      // if not in array add to array  and its children
      if (element.children && element.children.length > 0) {
        element.children.map(
          child => (newFiltered = newFiltered.concat(child.id)),
        )
      }
      newFiltered = newFiltered.concat(element.id)
    }
    handleSetFilteredElements(newFiltered)
  }

  const toggleAll = () => {
    if (!elements) return false
    if (filteredElements.length === 0) {
      let newFiltered = elements.map(element => element.id)
      handleSetFilteredElements(newFiltered)
    } else {
      handleSetFilteredElements([])
    }
  }

  const colors = ["#FF9292", "#245A7A", "#F7B002"]

  return (
    <StyledNav>
      <StyledBlur />
      <StyledContainer>
        <StyledLogo src={logo} onClick={scrollToToday} />
        <StyledUser
          key={user.id}
          onClick={() => handleSelectUser(user.id)}
          color={colors[0]}
        >
          {user.firstName.charAt(0)}
          {user.lastName.charAt(0)}
        </StyledUser>
        {sharedUsers &&
          sharedUsers.map((sharedUser, index) => (
            <StyledUser
              key={sharedUser.id}
              onClick={() => handleSelectUser(sharedUser.id)}
              color={colors[index + 1]}
            >
              {sharedUser.firstName.charAt(0)}
              {sharedUser.lastName.charAt(0)}
            </StyledUser>
          ))}
      </StyledContainer>
      <StyledContainer>
        <StyledElementsOpen onClick={() => setElementsOpen(!elementsOpen)}>
          <span role="img" aria-label="elements">
            📚
          </span>
          <br />
          ELEMENTS
        </StyledElementsOpen>
        <ElementDropdown
          open={elementsOpen}
          handleSelectElement={element => toggleFilteredElement(element)}
          elements={elements}
          placeholder="Filter elements"
          filteredElements={filteredElements && filteredElements}
          toggleAll={toggleAll}
        />
        {/* 
        <StyledFeedbackButton
          href="https://www.notion.so/noquarter/Tell-me-how-you-really-feel-3210d7178b704f1dbf977ff82cbb543d"
          target="_blank"
        >
          Feedback
        </StyledFeedbackButton>
        <StyledLogoutButton onClick={logout}>Logout</StyledLogoutButton> */}
        <StyledTextLogo src={textLogo} onClick={scrollToToday} />
      </StyledContainer>
    </StyledNav>
  )
}

const StyledNav = styled.div`
  position: fixed;
  height: 100vh;
  right: 0;
  top: 0;
  z-index: 98;
  display: flex;
  flex-direction: column;
  padding: ${p => p.theme.paddingM};
  align-items: center;
  justify-content: space-between;
`

const StyledBlur = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  right: 0;
  top: 0;
  background-color: ${p =>
    linearGradient({
      colorStops: [`transparent 0%`, `${p.theme.colorBackground} 15%`],
      toDirection: "to right",
      fallback: "#FFF",
    })};
  filter: blur(2px);
`

const StyledUser = styled.div<{ color: string }>`
  display: flex;
  height: 55px;
  width: 55px;
  border-radius: 50%;
  background-color: red;
  justify-content: center;
  align-items: center;
  background-color: ${p => p.color};
  color: white;
  cursor: pointer;
  margin: ${p => p.theme.paddingS} 0;
`

const StyledLogoutButton = styled.a`
  color: ${p => darken(0.3, p.theme.colorYellow)};
  background-color: ${p => p.theme.colorYellow};
  cursor: pointer;
  padding: ${p => p.theme.paddingS} ${p => p.theme.paddingM};
  border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.flexCenter};
  font-weight: ${p => p.theme.fontBold};
  white-space: nowrap;
  margin-left: 10px;
`

const StyledFeedbackButton = styled.a`
  color: ${p => darken(0.3, p.theme.colorPurple)};
  background-color: ${p => p.theme.colorPurple};
  cursor: pointer;
  padding: ${p => p.theme.paddingS} ${p => p.theme.paddingM};
  border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.flexCenter};
  font-weight: ${p => p.theme.fontBold};
  white-space: nowrap;
  margin-left: 10px;
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledLogo = styled.img`
  width: 88px;
  margin: 0 ${p => p.theme.paddingM} ${p => p.theme.paddingL};
  cursor: pointer;
`
const StyledTextLogo = styled.img`
  width: 60px;
  margin: ${p => p.theme.paddingXL} 0 ${p => p.theme.paddingM};
  cursor: pointer;
`

const StyledElementsOpen = styled.div`
  text-align: center;
  cursor: pointer;
  font-size: ${p => p.theme.textS};
  span {
    font-size: ${p => p.theme.textL};
  }
`

export default Nav
