import React, { FC } from "react"
import styled, { darken } from "../application/theme"
import ElementDropdown from "./ElementDropdown"
import { ElementFragment } from "../lib/graphql/types"
import { useAllElements } from "../lib/graphql/element/hooks"
import logo from "../public/logo.png"
import { useLogout } from "../lib/graphql/user/hooks"
import { Select } from "@noquarter/ui"
import { useGetSharedUsersByUser } from "../lib/graphql/sharedElement/hooks"
import { useTimelineContext } from "./providers/TimelineProvider"
import useAppContext from "../lib/hooks/useAppContext"

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

  const selectUserOptions =
    sharedUsers &&
    sharedUsers.map(user => ({
      label: user.firstName,
      value: user.id,
    }))

  return (
    <StyledNav>
      <StyledLogo src={logo} onClick={scrollToToday} />
      <StyledRow>
        <Select
          value={selectedUserId}
          onChange={e => handleSelectUser(e.target.value)}
          options={
            selectUserOptions
              ? [
                  {
                    label: user.firstName,
                    value: user.id,
                  },
                  ...selectUserOptions,
                ]
              : []
          }
          style={{ padding: "0px", paddingLeft: "10px", margin: "0" }}
        />
        <ElementDropdown
          handleSelectElement={element => toggleFilteredElement(element)}
          elements={elements}
          placeholder="Filter elements"
          filteredElements={filteredElements && filteredElements}
          toggleAll={toggleAll}
        />
        <StyledFeedbackButton
          href="https://www.notion.so/noquarter/Tell-me-how-you-really-feel-3210d7178b704f1dbf977ff82cbb543d"
          target="_blank"
        >
          Feedback
        </StyledFeedbackButton>
        <StyledLogoutButton onClick={logout}>Logout</StyledLogoutButton>
      </StyledRow>
    </StyledNav>
  )
}

const StyledNav = styled.div`
  /* width: 100%; */
  z-index: 98;
  position: fixed;
  background-color: ${p => p.theme.colorBackground};
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.0655288);
  display: flex;
  padding: ${p => p.theme.paddingM};
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 0 2rem;
  border-radius: ${p => p.theme.borderRadius};
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

const StyledRow = styled.div`
  display: flex;
`

const StyledLogo = styled.img`
  height: 30px;
`

export default Nav
