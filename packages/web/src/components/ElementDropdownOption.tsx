import React, { FC } from "react"
import styled from "../application/theme"

import { lighten } from "@noquarter/ui"
import { ElementFragment } from "../lib/graphql/types"
import { darken } from "polished"

interface ElementDropdownOptionProps {
  element: ElementFragment
  selected: any
  child?: boolean
  togglePicker: any
  hiddenElement?: boolean
  handleSelectElement: () => void
  archiveElement: (element: ElementFragment) => void
}
const ElementDropdownOption: FC<ElementDropdownOptionProps> = ({
  element,
  selected,
  togglePicker,
  handleSelectElement,
  archiveElement,
  hiddenElement,
  ...props
}) => {
  return (
    <>
      <StyledOptionContainer
        {...props}
        hiddenElement={hiddenElement}
        color={element.color}
      >
        <StyledOption
          selectedId={selected && selected.id}
          onClick={handleSelectElement}
          id={element.id}
          hiddenElement={hiddenElement}
        >
          {element.name}
        </StyledOption>

        <StyledColorCircle
          id={element.id}
          onClick={() => togglePicker(element)}
          color={element.color}
          // ref={buttonRef}
        />
        <StyledDelete
          color={element.color}
          onClick={() => archiveElement(element)}
        >
          x
        </StyledDelete>
      </StyledOptionContainer>
    </>
  )
}

export default ElementDropdownOption

const StyledDelete = styled.p<{ color: string }>`
  font-size: ${p => p.theme.textS};
  color: ${p => darken(0.2, p.color)};
  position: absolute;
  top: 0;
  right: ${p => p.theme.paddingM};
  visibility: hidden;

  &:hover {
    transform: scale(1.1);
  }
`

const StyledOption = styled.p<{
  selectedId: string
  id: string
  hiddenElement?: boolean
}>`
  font-weight: ${props =>
    props.id === props.selectedId
      ? p => p.theme.fontBlack
      : p => p.theme.fontBold};
  width: 100%;
  text-decoration: ${p => (p.hiddenElement ? "line-through" : "inherit")};
`

const StyledColorCircle = styled.div`
  border-radius: 50%;
  min-height: 16px;
  visibility: hidden;
  min-width: 16px;
  margin: 0 ${p => p.theme.paddingM};
  cursor: pointer;
  background-color: ${props => props.color};

  &:hover {
    transform: scale(1.1);
  }
`

const StyledOptionContainer = styled.div<{
  color: string
  child?: boolean
  hiddenElement?: boolean
}>`
  position: relative;
  ${p => p.theme.flexCenter};
  padding: ${p => p.theme.paddingM} ${p => p.theme.paddingL}
    ${p => p.theme.paddingM} ${p => p.theme.paddingM};
  margin: ${p => p.theme.paddingS};
  border-radius: ${p => p.theme.borderRadius};
  cursor: pointer;
  margin-left: ${p => (p.child ? p.theme.paddingL : p.theme.paddingS)};
  text-decoration: ${p => (p.hiddenElement ? "line-through" : "normal")};

  &:hover {
    background-color: ${p =>
      p.hiddenElement ? "white" : lighten(0.2, p.color)};
  }

  &:hover ${StyledColorCircle} {
    visibility: visible;
  }

  &:hover ${StyledDelete} {
    visibility: visible;
  }

  &:hover ${StyledOption} {
    color: ${p => darken(0.2, p.color)};
  }
`
