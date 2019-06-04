import React, { FC, useState, useRef, useEffect } from "react"
import styled from "../application/theme"

import Input from "./Input"

interface ElementDropdownOptionProps {
  element: any
  selected: any
  togglePicker: any
  handleSelectElement: () => void
}
const ElementDropdownOption: FC<ElementDropdownOptionProps> = ({
  element,
  selected,
  togglePicker,
  handleSelectElement,
  ...props
}) => {
  return (
    <>
      <StyledOptionContainer {...props}>
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

        {/* <StyledDelete onClick={() => archiveElement(element)}>
        Archive
      </StyledDelete> */}
      </StyledOptionContainer>
    </>
  )
}

export default ElementDropdownOption

const StyledDelete = styled.p`
  visibility: hidden;
  cursor: pointer;
  font-size: 8px;
`

const StyledOptionContainer = styled.div`
  display: flex;
  position: relative;
  margin: 20px 0;
  align-items: center;

  &:hover ${StyledDelete} {
    visibility: visible;
  }
`

const StyledOption = styled.p<{ selectedId: number; id: number }>`
  cursor: pointer;
  font-weight: ${props => (props.id === props.selectedId ? "900" : "400")};
`

const StyledColorCircle = styled.div`
  border-radius: 50%;
  height: 21px;
  width: 21px;
  margin: 0 10px;
  cursor: pointer;
  background-color: ${props => props.color};
`
