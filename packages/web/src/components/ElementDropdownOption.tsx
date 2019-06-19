import React, { FC } from "react"
import styled from "../application/theme"

import { lighten } from "@noquarter/ui"
import { ElementFragment } from "../lib/graphql/types"
import { darken } from "polished"

interface ElementDropdownOptionProps {
  element: ElementFragment
  selected: any
  togglePicker: any
  handleSelectElement: () => void
  archiveElement: (element: ElementFragment) => void
}
const ElementDropdownOption: FC<ElementDropdownOptionProps> = ({
  element,
  selected,
  togglePicker,
  handleSelectElement,
  archiveElement,
  ...props
}) => {
  return (
    <>
      <StyledOptionContainer {...props} color={element.color}>
        <StyledOption
          selectedId={selected && selected.id}
          onClick={handleSelectElement}
          id={element.id}
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

const StyledOption = styled.p<{ selectedId: string; id: string }>`
  font-weight: ${props =>
    props.id === props.selectedId
      ? p => p.theme.fontBlack
      : p => p.theme.fontBold};
  width: 100%;
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

const StyledOptionContainer = styled.div<{ color: string }>`
  position: relative;
  ${p => p.theme.flexCenter};
  padding: ${p => p.theme.paddingM} ${p => p.theme.paddingL}
    ${p => p.theme.paddingM} ${p => p.theme.paddingM};
  margin: ${p => p.theme.paddingS};
  border-radius: ${p => p.theme.borderRadius};
  cursor: pointer;

  &:hover {
    background-color: ${p => lighten(0.2, p.color)};
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
