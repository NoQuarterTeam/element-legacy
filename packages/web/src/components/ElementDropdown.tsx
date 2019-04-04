import React, { FC, useState, useRef, useEffect } from "react"
import styled from "../application/theme"
import { ChromePicker } from "react-color"

import Input from "./Input"

import { useCreateElementMutation } from "../lib/graphql/types"
import { useAllElements } from "../lib/graphql/element/hooks"

import ElementDropdownOption from "./ElementDropdownOption"

// const elements = [
//   { name: "health", id: 1, archived: false },
//   { name: "work", id: 2, archived: false },
// ]

interface ElementDropdownProps {
  selectedElement: number
  selectElement: any
}
const ElementDropdown: FC<ElementDropdownProps> = ({
  selectedElement,
  selectElement,
}) => {
  const createElement = useCreateElementMutation()
  const [dropdownOpen, openDropdown] = useState(false)
  const elements = useAllElements()

  const dropdownRef = useRef()

  // const closeDropdown = () => {
  //   if (!dropdownRef.current.contains(event.target)) {
  //     openDropdown(dropdownOpen)
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener("click", closeDropdown)
  //   return () => {
  //     document.removeEventListener("click", closeDropdown)
  //   }
  // }, [])

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

  const handleSelectElement = (id: string) => {
    selectElement(id)
    // openDropdown(!dropdownOpen)
  }

  const [pickerId, setPickerId] = useState(null)
  const pickerRef = useRef()
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

  // useEffect(() => {
  //   document.addEventListener("click", closePicker)
  //   return () => {
  //     document.removeEventListener("click", closePicker)
  //   }
  // }, [])

  const handleChangeComplete = color => {
    console.log(color.hex)
  }

  const togglePicker = (e: any) => {
    setPickerId(e.target.id === pickerId ? null : e.target.id)
  }

  return (
    <StyledDropdownContainer ref={dropdownRef}>
      <StyledDropdownPlaceholder
        open={dropdownOpen}
        onClick={() => openDropdown(!dropdownOpen)}
      >
        {selectedElement
          ? elements.find(element => element.id == selectedElement).name
          : "Select Element..."}
      </StyledDropdownPlaceholder>

      <StyledDropdownMenu open={dropdownOpen}>
        <Input placeholder="New Element..." onBlur={e => createNewElement(e)} />
        {elements &&
          elements
            .filter(e => e.archived == false)
            .map((element, index) => (
              <div key={index}>
                <ElementDropdownOption
                  element={element}
                  selected={selectedElement && selectedElement}
                  onClick={() => handleSelectElement(element.id)}
                  togglePicker={e => togglePicker(e)}
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
                <StyledPickerContainer
                  open={element.id == pickerId}
                  ref={pickerRef}
                >
                  <ChromePicker
                    color={element.color}
                    onChangeComplete={handleChangeComplete}
                  />
                </StyledPickerContainer>
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

const StyledDropdownPlaceholder = styled.div<{ open: boolean }>`
  cursor: pointer;
  visibility: ${props => (props.open ? "hidden" : "visible")};
`

const StyledDropdownMenu = styled.div<{ open: boolean }>`
  visibility: ${props => (props.open ? "visible" : "hidden")};
  position: absolute;
  top: 0;
  left: -10px;
  padding: ${props => props.theme.paddingMedium};
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 10px;
  background-color: lightgrey;
  width: 400px;
  max-height: 250px;
  overflow-y: auto;

  z-index: 100;
`

const StyledPickerContainer = styled.div<{ open: boolean }>`
  display: ${props => (props.open ? "block" : "none")};
  position: absolute;
  top: 50px;
  z-index: 1;
`
