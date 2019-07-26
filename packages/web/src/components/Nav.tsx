import React, { FC } from "react"
import styled from "../application/theme"
import ElementDropdown from "./ElementDropdown"
import { ElementFragment } from "../lib/graphql/types"
import { useAllElements } from "../lib/graphql/element/hooks"

interface NavProps {
  filteredElements: string[]
  handleSetFilteredElements: (elements: string[]) => void
}

const Nav: FC<NavProps> = ({ filteredElements, handleSetFilteredElements }) => {
  const elements = useAllElements()

  const toggleFilteredElement = (element: ElementFragment) => {
    let newFiltered = filteredElements && filteredElements

    if (!elements) return false
    if (filteredElements.length === 0) {
      // if all elements are shown and one is clicked add all other to show only the clicked and its children
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
  return (
    <StyledNav>
      <ElementDropdown
        handleSelectElement={element => toggleFilteredElement(element)}
        elements={elements}
        placeholder="Filter elements"
        filteredElements={filteredElements && filteredElements}
        toggleAll={toggleAll}
      />
    </StyledNav>
  )
}

const StyledNav = styled.div`
  width: 100%;
  z-index: 98;
  position: fixed;
  background-color: ${p => p.theme.colorBackground};
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.0655288);
  display: flex;
  padding: ${p => p.theme.paddingM};
  align-items: center;
  justify-content: flex-start;
`

export default Nav
