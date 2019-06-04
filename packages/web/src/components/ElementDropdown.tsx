import React, { FC, useState, useRef, useEffect } from "react"
import styled from "../application/theme"
import { TwitterPicker } from "react-color"

import Input from "./Input"

import {
  useCreateElementMutation,
  Element,
  useUpdateElementMutation,
} from "../lib/graphql/types"
import { useAllElements } from "../lib/graphql/element/hooks"

import ElementDropdownOption from "./ElementDropdownOption"
import useOnClickOutside from "../lib/hooks/useOnOutsideClick"

interface ElementDropdownProps {
  selectedElement: Element
  selectElement: any
}
const ElementDropdown: FC<ElementDropdownProps> = ({
  selectedElement,
  handleSelectElement,
}) => {
  const createElement = useCreateElementMutation()
  const updateElement = useUpdateElementMutation()
  const [dropdownOpen, openDropdown] = useState(false)
  const [pickerOpen, openColorPicker] = useState(false)
  const [pickerElement, setPickerElement] = useState(selectedElement)
  const elements = useAllElements()
  const pickerRef = useRef()
  const dropdownRef = useRef()

  const createNewElement = async (e: any) => {
    if (e.target.value !== "") {
      e.persist()
      const elementData = {
        name: e.target.value,
        color: "#333",
      }
      await createElement({
        variables: {
          data: elementData,
        },
      })
      e.target.value = ""
    }
  }

  const selectElement = (element: any) => {
    handleSelectElement(element)
    openDropdown(false)
  }

  // const buttonRef = useRef()

  // const closePicker = () => {
  //   if (pickerRef.current) {
  //     if (
  //       !pickerRef.current.contains(event.target) &&
  //       !buttonRef.current.contains(event.target)
  //     ) {
  //       setPickerId(null)
  //     }
  //   }
  // }

  useOnClickOutside(dropdownRef, () => openDropdown(false))
  useOnClickOutside(pickerRef, () => openColorPicker(false))

  const handleChangeComplete = (color: any) => {
    const elementData = {
      color: color.hex,
    }
    updateElement({
      variables: {
        elementId: pickerElement.id,
        data: elementData,
      },
    })
  }

  const selectedPicker = (element: any) => {
    openColorPicker(!pickerOpen)
    setPickerElement(element)
  }

  return (
    <StyledDropdownContainer ref={dropdownRef}>
      <StyledDropdownPlaceholder
        open={dropdownOpen}
        onClick={() => openDropdown(!dropdownOpen)}
        color={selectedElement && selectedElement.color}
      >
        {selectedElement ? selectedElement.name : "Select Element..."}
      </StyledDropdownPlaceholder>

      {pickerOpen && (
        <StyledPickerContainer>
          <div ref={pickerRef}>
            <TwitterPicker
              color={pickerElement && pickerElement.color}
              onChangeComplete={handleChangeComplete}
              triangle={"hide"}
            />
          </div>
        </StyledPickerContainer>
      )}
      <StyledDropdownMenu open={dropdownOpen}>
        <Input placeholder="New Element..." onBlur={e => createNewElement(e)} />
        {elements &&
          elements
            .filter(e => e.archived === false)
            .map((element, index) => (
              <div key={index}>
                <ElementDropdownOption
                  element={element}
                  selected={selectedElement && selectedElement}
                  handleSelectElement={() => selectElement(element)}
                  togglePicker={element => selectedPicker(element)}
                  // archiveElement={() =>
                  //   handleUpdateElement({
                  //     ...element,
                  //     archived: true,
                  //   })
                  // }
                  // updateElementColor={color =>
                  //   handleUpdateElement({
                  //     ...element,
                  //     color: color,
                  //   })
                  // }
                />
              </div>
            ))}
      </StyledDropdownMenu>
    </StyledDropdownContainer>
  )
}

export default ElementDropdown

const StyledDropdownContainer = styled.div`
  position: relative;
`

const StyledDropdownPlaceholder = styled.div<{ open: boolean; color: string }>`
  cursor: pointer;
  visibility: ${props => (props.open ? "hidden" : "visible")};
  background-color: ${props => (props.color ? props.color : "#d4d4d4")};
  padding: 5px 10px;
  border-radius: 5px;
  color: ${props => (props.color ? "white" : "#333")};
  margin-left: -5px;
  display: flex;
  justify-content: center;
  align-content: center;

  &:after {
    content: "";
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 10px solid white;
    margin-left: 10px;
    margin-top: 7px;
  }
`

const StyledDropdownMenu = styled.div<{ open: boolean }>`
  visibility: ${props => (props.open ? "visible" : "hidden")};
  position: absolute;
  top: 0;
  left: -10px;
  padding: ${props => props.theme.paddingM};
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 10px;
  background-color: white;
  width: 400px;
  max-height: 350px;
  overflow-y: auto;
  z-index: 100;
`

const StyledPickerContainer = styled.div`
  position: fixed;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  overflow: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1001;
`
