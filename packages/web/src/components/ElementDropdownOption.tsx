import React, { FC, useState, useRef, useEffect } from "react"
import styled from "../application/theme"

import Input from "./Input"

interface ElementDropdownOptionProps {
  element: any
  selected: number
  togglePicker: any
}
const ElementDropdownOption: FC<ElementDropdownOptionProps> = ({
  element,
  selected,
  togglePicker,
  ...props
}) => {
  return (
    <>
      <StyledOptionContainer {...props}>
        <StyledOption selected={selected} id={element.id}>
          {element.name}
        </StyledOption>
        <StyledColorCircle
          id={element.id}
          onClick={e => togglePicker(e)}
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

  &:hover ${StyledDelete} {
    visibility: visible;
  }
`

const StyledOption = styled.p<{ selected: number; id: number }>`
  cursor: pointer;
  font-weight: ${props => (props.id == props.selected ? "900" : "400")};
`

const StyledColorCircle = styled.div`
  border-radius: 50%;
  height: 21px;
  width: 21px;
  margin: 16px 5px;
  cursor: pointer;
  background-color: ${props => props.color};
`
