import React, { FC, useState } from "react"
import styled from "../application/theme"
import ElementDropdown from "./ElementDropdown"
import { ElementFragment } from "../lib/graphql/types"
import { useAllElements } from "../lib/graphql/element/hooks"
import { ChevronsRight } from "styled-icons/boxicons-regular/ChevronsRight"
import { Filter } from "styled-icons/boxicons-regular/Filter"
import { Feedback } from "styled-icons/material/Feedback"
import { AccountBox } from "styled-icons/material/AccountBox"
import { LogOut } from "styled-icons/boxicons-regular/LogOut"
import { Today } from "styled-icons/material/Today"
import { Link as ReachLink } from "@reach/router"

import { useLogout } from "../lib/graphql/user/hooks"
import { useGetSharedUsersByUser } from "../lib/graphql/sharedElement/hooks"
import { useTimelineContext } from "./providers/TimelineProvider"
import { useMe } from "./providers/MeProvider"
import { Link, Avatar } from "@chakra-ui/core"

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
  const user = useMe()
  const [open, setOpen] = useState(true)
  const { handleSelectUser, selectedUserId } = useTimelineContext()
  const elements = useAllElements(user.id)
  const sharedUsers = useGetSharedUsersByUser(user.id)
  const [elementsOpen, setElementsOpen] = useState(false)

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
      const newFiltered = elements.map(element => element.id)
      handleSetFilteredElements(newFiltered)
    } else {
      handleSetFilteredElements([])
    }
  }

  const colors = ["#FF9292", "#245A7A", "#F7B002"]

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <StyledNav open={open}>
      <StyledContainer>
        <StyledCloseButton open={open} onClick={() => handleToggle()}>
          <ChevronsRight width={40} color="lightgrey" />
        </StyledCloseButton>
        <Avatar
          size="md"
          name={user.firstName + " " + user.lastName}
          src={user.avatarUrl || undefined}
          onClick={() => handleSelectUser(user.id)}
          mt={4}
          cursor="pointer"
          display={open ? "block" : "none"}
          opacity={user.id !== selectedUserId ? 0.6 : 1}
        />
        {sharedUsers?.map((sharedUser, index) => (
          <Avatar
            key={sharedUser.id}
            size="md"
            name={sharedUser.firstName + " " + sharedUser.lastName}
            src={sharedUser.avatarUrl || undefined}
            onClick={() => handleSelectUser(sharedUser.id)}
            mt={4}
            cursor="pointer"
            display={open ? "block" : "none"}
            opacity={sharedUser.id !== selectedUserId ? 0.6 : 1}
          />
        ))}
        {/* <StyledUser
          key={user.id}
          onClick={() => handleSelectUser(user.id)}
          color={colors[0]}
          open={open}
          selected={selectedUserId === user.id}
        >
          {user.firstName.charAt(0)}
          {user.lastName.charAt(0)}
        </StyledUser>
        {sharedUsers?.map((sharedUser, index) => (
          <StyledUser
            key={sharedUser.id}
            onClick={() => handleSelectUser(sharedUser.id)}
            color={colors[index + 1]}
            selected={selectedUserId === sharedUser.id}
            open={open}
          >
            {sharedUser.firstName.charAt(0)}
            {sharedUser.lastName.charAt(0)}
          </StyledUser>
        ))} */}
      </StyledContainer>
      <StyledContainer>
        <StyledElementsOpen onClick={() => setElementsOpen(true)} open={open}>
          <Filter width={30} color="lightgrey" />
          ELEMENTS
        </StyledElementsOpen>
        <ElementDropdown
          open={elementsOpen}
          onClose={() => setElementsOpen(false)}
          handleSelectElement={element => toggleFilteredElement(element)}
          elements={elements}
          placeholder="Filter elements"
          filteredElements={filteredElements && filteredElements}
          toggleAll={toggleAll}
        />
        <StyledFeedbackButton
          href="https://www.notion.so/noquarter/Tell-me-how-you-really-feel-3210d7178b704f1dbf977ff82cbb543d"
          target="_blank"
          open={open}
        >
          <Feedback width={20} color="lightgrey" />
          FEEDBACK
        </StyledFeedbackButton>
        <StyledAccountButton as={ReachLink} to="/account" open={open}>
          <AccountBox width={20} color="lightgrey" />
          ACCOUNT
        </StyledAccountButton>
        <StyledToday onClick={scrollToToday} open={open}>
          <Today width={30} color="lightgrey" />
        </StyledToday>
      </StyledContainer>
    </StyledNav>
  )
}

const StyledNav = styled.div<{ open: boolean }>`
  position: fixed;
  height: 100vh;
  right: 0;
  top: 0;
  /* overflow: hidden; */
  z-index: 98;
  width: ${p => (p.open ? "75px" : "0px")};
  background: ${p => p.theme.colorBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: width 0.3s;
  box-shadow: -4px 0px 4px 4px rgba(200, 200, 200, 0.1);
`

const StyledCloseButton = styled.button<{ open: boolean }>`
  transform-origin: left;
  transform: ${p => !p.open && "translate(20px, 0) scale(-1, -1) "};
  transition: transform 0.4s;
`

// const StyledUser = styled.div<{
//   color: string
//   selected: boolean
//   open: boolean
// }>`
//   visibility: ${p => (p.open ? "visible" : "hidden")};
//   display: flex;
//   height: 45px;
//   width: 45px;
//   border-radius: 50%;
//   justify-content: center;
//   align-items: center;
//   background-color: ${p => p.color};
//   color: white;
//   cursor: pointer;
//   margin: ${p => p.theme.paddingM} 0;
//   border: 2px solid black;
//   opacity: ${p => !p.selected && 0.7};
// `

// const StyledLogoutButton = styled.a`
//   color: ${p => darken(0.3, p.theme.colorYellow)};
//   background-color: ${p => p.theme.colorYellow};
//   cursor: pointer;
//   padding: ${p => p.theme.paddingS} ${p => p.theme.paddingM};
//   border-radius: ${p => p.theme.borderRadius};
//   ${p => p.theme.flexCenter};
//   font-weight: ${p => p.theme.fontBold};
//   white-space: nowrap;
//   margin-left: 10px;
// `

const StyledFeedbackButton = styled.a<{ open: boolean }>`
  visibility: ${p => (p.open ? "visible" : "hidden")};
  text-align: center;
  cursor: pointer;
  font-size: ${p => p.theme.textXXS};
  text-decoration: none;
  margin-bottom: ${p => p.theme.paddingL};
  font-variant: small-caps;
  color: ${p => p.theme.colorLabel};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledAccountButton = styled(Link)<{ open: boolean }>`
  visibility: ${p => (p.open ? "visible" : "hidden")};
  text-align: center;
  cursor: pointer;
  font-size: ${p => p.theme.textXXS};
  text-decoration: none;
  margin-bottom: ${p => p.theme.paddingXL};
  font-variant: small-caps;
  color: ${p => p.theme.colorLabel};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledToday = styled.button<{ open: boolean }>`
  transform-origin: left;
  transform: ${p => !p.open && "translate(10px, 0) scale(-1, 1) "};
  transition: transform 0.4s;
  margin-bottom: ${p => p.theme.paddingL};
`

const StyledElementsOpen = styled.div<{ open: boolean }>`
  visibility: ${p => (p.open ? "visible" : "hidden")};
  text-align: center;
  font-variant: small-caps;
  cursor: pointer;
  font-size: ${p => p.theme.textXXS};
  margin-bottom: ${p => p.theme.paddingL};
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${p => p.theme.colorLabel};
`

export default Nav
