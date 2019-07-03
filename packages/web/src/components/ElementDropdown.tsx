import React, { createRef, FC, useEffect, useState } from "react"
import { TwitterPicker } from "react-color"
import styled from "../application/theme"
import {
  useCreateElement,
  useUpdateElement,
} from "../lib/graphql/element/hooks"
import { ElementFragment } from "../lib/graphql/types"
import useOnClickOutside from "../lib/hooks/useOnOutsideClick"
import ElementDropdownOption from "./ElementDropdownOption"
import Input from "./Input"
import { lighten } from "@noquarter/ui"

interface ElementDropdownProps {
  selectedElementId: string
  elements: ElementFragment[] | undefined | null
  handleSelectElement: (element: ElementFragment) => void
}
const ElementDropdown: FC<ElementDropdownProps> = ({
  selectedElementId,
  handleSelectElement,
  elements,
}) => {
  const createElement = useCreateElement()
  const updateElement = useUpdateElement()
  const [dropdownOpen, openDropdown] = useState(false)
  const [pickerOpen, openColorPicker] = useState(false)
  const [newElement, setNewElement] = useState("")
  const [pickerElement, setPickerElement] = useState<ElementFragment>()
  const [selectedElement, selectSelectedElement] = useState<ElementFragment>()
  const pickerRef = createRef<HTMLDivElement>()
  const dropdownRef = createRef<HTMLDivElement>()

  useEffect(() => {
    if (elements) {
      const el = elements.find(e => e.id === selectedElementId)
      // if (!el) return
      selectSelectedElement(el)
    }
  }, [elements, selectedElementId])

  const createNewElement = async () => {
    if (newElement !== "") {
      let letters = "0123456789ABCDEF"
      let generatedColor = ""
      for (var i = 0; i < 6; i++) {
        generatedColor += letters[Math.floor(Math.random() * 16)]
      }
      const elementData = {
        name: newElement,
        color: "#" + generatedColor,
      }
      await createElement({
        variables: {
          data: elementData,
        },
      })
      setNewElement("")
    }
  }

  const selectElement = (element: ElementFragment) => {
    handleSelectElement(element)
    openDropdown(false)
  }

  useOnClickOutside(dropdownRef, () => openDropdown(false))
  useOnClickOutside(pickerRef, () => openColorPicker(false))

  const handleChangeComplete = (color: any) => {
    const elementData = {
      color: color.hex,
    }
    if (!pickerElement) return
    updateElement({
      variables: {
        elementId: pickerElement.id,
        data: elementData,
      },
    })
  }

  const handleArchiveElement = (element: ElementFragment) => {
    const elementData = {
      archived: true,
    }

    updateElement({
      variables: {
        elementId: element.id,
        data: elementData,
      },
    })
  }

  const selectedPicker = (element: ElementFragment) => {
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
        {selectedElement ? selectedElement.name : "Select element..."}
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
        <StyledNewElement>
          <Input
            placeholder="New Element..."
            onChange={e => setNewElement(e.target.value)}
            value={newElement}
            style={{ fontSize: "16px", padding: 0 }}
            autoFocus
          />
          <StyledAdd newElement={newElement} onClick={createNewElement}>
            +
          </StyledAdd>
        </StyledNewElement>
        {elements &&
          elements
            .filter(e => e.archived === false)
            .map((element, index) => (
              <div key={index}>
                <ElementDropdownOption
                  element={element}
                  selected={selectedElement && selectedElement}
                  handleSelectElement={() => selectElement(element)}
                  togglePicker={() => selectedPicker(element)}
                  archiveElement={handleArchiveElement}
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

const StyledDropdownPlaceholder = styled.div<{
  open: boolean
  color?: string
}>`
  color: ${p => lighten(0.1, p.theme.colorText)};
  background-color: ${props =>
    props.color ? lighten(0.2, props.color) : p => p.theme.colorPlaceholder};
  cursor: pointer;
  padding: ${p => p.theme.paddingS} ${p => p.theme.paddingM};
  border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.flexCenter};
  font-size: ${p => p.theme.textM};
  font-weight: ${p => p.theme.fontBold};

  &:after {
    border: solid ${p => lighten(0.1, p.theme.colorText)};
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: ${p => p.theme.paddingXS};
    content: "";
    transform: ${props => (props.open ? "rotate(225deg)" : "rotate(45deg)")};
    width: 0;
    height: 0;
    margin-left: ${p => p.theme.paddingM};
    margin-top: ${props => (props.open ? p => p.theme.paddingS : 0)};
  }
`

const StyledDropdownMenu = styled.div<{ open: boolean }>`
  visibility: ${props => (props.open ? "visible" : "hidden")};
  position: absolute;
  top: ${p => p.theme.paddingXL};
  left: -${p => p.theme.paddingM};
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: ${p => p.theme.borderRadiusL};
  background-color: white;
  width: 350px;
  max-height: 350px;
  overflow-y: auto;
  z-index: 100;
`

const StyledNewElement = styled.div`
  color: white;
  padding: ${p => p.theme.paddingL};
  border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.flexBetween};
  margin-right: ${p => p.theme.paddingM};
`

const StyledAdd = styled.div<{ newElement: string }>`
  cursor: pointer;
  font-size: ${p => p.theme.textL};
  color: ${p => p.theme.colorBlue};
  font-weight: ${p => p.theme.fontBlack};
  visibility: ${props => (props.newElement ? "visible" : "hidden")};

  &:hover {
    transform: scale(1.1);
  }
`

const StyledPickerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  overflow: scroll;
  ${p => p.theme.flexCenter};
  background-color: ${p => p.theme.colorOverlay};
  z-index: 1001;
`
