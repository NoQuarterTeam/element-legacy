import React, { createRef, FC, useEffect, useState } from "react"
import { TwitterPicker } from "react-color"
import styled, { media } from "../application/theme"
import {
  useCreateElement,
  useUpdateElement,
} from "../lib/graphql/element/hooks"
import { isMobileDevice } from "../lib/helpers"
import { ElementFragment } from "../lib/graphql/types"
import useOnClickOutside from "../lib/hooks/useOnOutsideClick"
import ElementDropdownOption from "./ElementDropdownOption"
import Input from "./Input"
import { Close } from "styled-icons/material/Close"

import { useTimelineContext } from "./providers/TimelineProvider"
import { readableColor, darken, lighten } from "polished"

interface ElementDropdownProps {
  selectedElementId?: string
  elements: ElementFragment[] | undefined | null
  placeholder: string
  handleSelectElement: (element: ElementFragment) => void
  filteredElements?: string[]
  toggleAll?: () => void
  open?: boolean
  onClose?: () => void
}
const ElementDropdown: FC<ElementDropdownProps> = ({
  handleSelectElement,
  selectedElementId,
  elements,
  placeholder,
  filteredElements,
  toggleAll,
  open,
  onClose,
}) => {
  const { selectedUserId } = useTimelineContext()

  const createElement = useCreateElement(selectedUserId)
  const updateElement = useUpdateElement()
  const [dropdownOpen, openDropdown] = useState(false || open)
  const [pickerOpen, openColorPicker] = useState(false)
  const [newElement, setNewElement] = useState("")
  const [newChildElement, setNewChildElement] = useState("")
  const [showChildren, setShowChildren] = useState("")
  const [updatedColor, setUpdatedColor] = useState(null)

  const [pickerElement, setPickerElement] = useState<ElementFragment>()
  const [selectedElement, selectSelectedElement] = useState<ElementFragment>()
  const [addingChild, setAddingChild] = useState()
  const pickerRef = createRef<HTMLDivElement>()
  const dropdownRef = createRef<HTMLDivElement>()

  useEffect(() => {
    if (elements) {
      const el = elements.find(e => e.id === selectedElementId)
      // if (!el) return
      selectSelectedElement(el)
    }
  }, [elements, selectedElementId])

  useEffect(() => {
    openDropdown(open)
  }, [open])

  const createNewElement = async () => {
    if (newElement !== "") {
      const letters = "0123456789ABCDEF"
      let generatedColor = ""
      for (let i = 0; i < 6; i++) {
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
      setAddingChild("")
    }
  }

  const createNewChildElement = async (parent: ElementFragment) => {
    if (newChildElement !== "") {
      const letters = "0123456789ABCDEF"
      let generatedColor = ""
      for (let i = 0; i < 6; i++) {
        generatedColor += letters[Math.floor(Math.random() * 16)]
      }
      const elementData = {
        name: newChildElement,
        color: "#" + generatedColor,
        parentId: parent.id,
      }
      await createElement({
        variables: {
          data: elementData,
        },
      })
      setNewChildElement("")
      setAddingChild("")
    }
  }

  const selectElement = (element: ElementFragment) => {
    handleSelectElement(element)
    if (!filteredElements) {
      openDropdown(false)
    }
    setAddingChild("")
  }

  const handleClose = () => {
    openDropdown(false)

    if (filteredElements && onClose) {
      onClose()
    }
  }

  useOnClickOutside(dropdownRef, () => handleClose())
  useOnClickOutside(pickerRef, () => openColorPicker(false))

  const handleChangeComplete = (color: any) => {
    setAddingChild("")
    setUpdatedColor(color.hex)
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
    setAddingChild("")

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

  const addChild = (element: ElementFragment) => {
    setAddingChild(element.id)
  }

  const handleToggleAll = () => {
    toggleAll && toggleAll()
    setAddingChild("")
  }

  const handleShowChildren = (elementId: string) => {
    setAddingChild("")
    setShowChildren(showChildren && showChildren === elementId ? "" : elementId)
  }

  return (
    <StyledDropdownContainer ref={dropdownRef}>
      {!filteredElements && (
        <StyledDropdownPlaceholder
          open={dropdownOpen}
          onClick={() => openDropdown(!dropdownOpen)}
          color={selectedElement && selectedElement.color}
        >
          {selectedElement ? selectedElement.name : placeholder}
        </StyledDropdownPlaceholder>
      )}

      {pickerOpen && (
        <StyledPickerContainer>
          <div ref={pickerRef}>
            <TwitterPicker
              color={
                pickerElement && updatedColor
                  ? updatedColor
                  : pickerElement.color
              }
              onChangeComplete={handleChangeComplete}
              triangle={"hide"}
            />
          </div>
        </StyledPickerContainer>
      )}
      <StyledDropdownOpenBlur
        open={dropdownOpen}
        filter={filteredElements ? "true" : "false"}
        onClick={() => openDropdown(!dropdownOpen)}
      />
      <StyledDropdownMenu
        open={dropdownOpen}
        filter={filteredElements ? "true" : "false"}
      >
        <StyledClose onClick={() => openDropdown(!dropdownOpen)}>
          <Close size={30} color="lightgrey" />
        </StyledClose>

        {elements &&
          elements
            .filter(e => e.archived === false)
            .sort((a, b) => {
              return a.name.localeCompare(b.name)
            })
            .map((element, index) => (
              <div key={element.id}>
                {!element.parentId && (
                  <>
                    <ElementDropdownOption
                      key={index}
                      element={element}
                      selected={selectedElement && selectedElement}
                      handleSelectElement={() => selectElement(element)}
                      togglePicker={() => selectedPicker(element)}
                      archiveElement={handleArchiveElement}
                      hiddenElement={
                        filteredElements &&
                        filteredElements.includes(element.id)
                      }
                      addChild={addChild}
                      handleShowChildren={() => handleShowChildren(element.id)}
                      open={
                        showChildren && showChildren === element.id
                          ? true
                          : false
                      }
                    />
                    {addingChild === element.id && (
                      <StyledNewElement child={true}>
                        <Input
                          placeholder="New child element..."
                          onChange={e => setNewChildElement(e.target.value)}
                          value={newChildElement}
                          style={{ fontSize: "16px", padding: 0 }}
                          autoFocus
                        />
                        <StyledAdd
                          newElement={newChildElement}
                          onClick={() => createNewChildElement(element)}
                        >
                          +
                        </StyledAdd>
                      </StyledNewElement>
                    )}
                  </>
                )}
                {showChildren === element.id &&
                  elements
                    .filter(
                      e => e.parentId === element.id && e.archived === false,
                    )
                    .map(el => (
                      <div key={el.id}>
                        <ElementDropdownOption
                          key={el.id}
                          element={el}
                          selected={selectedElement && selectedElement}
                          handleSelectElement={() => selectElement(el)}
                          togglePicker={() => selectedPicker(el)}
                          archiveElement={handleArchiveElement}
                          child={true}
                          hiddenElement={
                            filteredElements && filteredElements.includes(el.id)
                          }
                          addChild={addChild}
                          handleShowChildren={() => handleShowChildren(el.id)}
                          open={
                            showChildren && showChildren === element.id
                              ? true
                              : false
                          }
                        />
                        {addingChild === el.id && (
                          <StyledNewElement child={true}>
                            <Input
                              placeholder="New child element..."
                              onChange={e => setNewChildElement(e.target.value)}
                              value={newChildElement}
                              style={{ fontSize: "16px", padding: 0 }}
                              autoFocus
                            />
                            <StyledAdd
                              newElement={newChildElement}
                              onClick={() => createNewChildElement(el)}
                            >
                              +
                            </StyledAdd>
                          </StyledNewElement>
                        )}
                      </div>
                    ))}
              </div>
            ))}
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
        {filteredElements && filteredElements.length > 0 && (
          <StyledToggle onClick={handleToggleAll}>Show all</StyledToggle>
        )}
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
  color: black;
  background-color: white;
  border: ${p => p.theme.border};
  cursor: pointer;
  padding: ${p => p.theme.paddingS} ${p => p.theme.paddingM};
  // border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.flexStart};
  white-space: nowrap;
  min-width: 150px;
  color: ${p =>
    p.color &&
    readableColor(p.color, darken(0.5, p.color), lighten(0.5, p.color))};
  background: ${p => p.color && p.color};
  // border-color: ${p => p.color && p.color};


  // &:after {
  //   border: solid black;
  //   border-width: 0 3px 3px 0;
  //   display: inline-block;
  //   padding: ${p => p.theme.paddingXS};
  //   content: "";
  //   transform: ${props => (props.open ? "rotate(225deg)" : "rotate(45deg)")};
  //   width: 0;
  //   height: 0;
  //   margin-left: ${p => p.theme.paddingM};
  //   margin-top: ${props => (props.open ? p => p.theme.paddingS : "-3px")};
  // }
`

const StyledDropdownOpenBlur = styled.div<{ open: boolean; filter: string }>`
  /* visibility: ${props =>
    props.open && !props.filter ? "visible" : "hidden"}; */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${p => p.theme.colorOverlay};
  position: fixed;
  display: ${props => (props.open ? "block" : "none")};
`

const StyledDropdownMenu = styled.div<{ open: boolean; filter: string }>`
  visibility: ${props => (props.open ? "visible" : "hidden")};
  position: fixed;
  padding-top: ${p => p.theme.paddingXL};
  /* border-radius: ${p => p.theme.borderRadiusL}; */
  background-color: white;
  min-width: 350px;
  overflow-y: auto;
  z-index: 100;
  width: 100vw;
  right: 0;
  top: 0;
  bottom: 0;
  /* top: ${p => (p.filter === "true" ? "50px" : "auto")}; */
  /* bottom: ${p => (p.filter === "true" ? "auto" : "0")}; */
  color: black;
  background-color: white;
  border:2px solid black;
 
  ${media.greaterThan("md")`
    position: fixed; 
    bottom: 0;
    width: fit-content;
    top: 0
    border: none;
    border-left: 2px solid black;
    padding-top: ${p => p.theme.paddingM};
  `};
`

const StyledNewElement = styled.div<{ child?: boolean }>`
  color: white;
  padding-left: ${p => (p.child ? p.theme.paddingM : p.theme.paddingML)};
  margin-left: ${p => (p.child ? p.theme.paddingL : 0)};
  border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.flexBetween};
  margin-right: ${p => p.theme.paddingM};
`

const StyledAdd = styled.div<{ newElement: string }>`
  cursor: pointer;
  font-size: ${p => p.theme.textL};
  color: ${p => p.theme.colorPurple};
  font-weight: ${p => p.theme.fontBlack};
  margin-right: ${p => p.theme.paddingM};
  visibility: ${props => (props.newElement ? "visible" : "hidden")};

  &:hover {
    transform: scale(1.1);
  }
`

const StyledToggle = styled.div`
  position: relative;
  ${p => p.theme.flexCenter};
  padding: ${p => p.theme.paddingS} ${p => p.theme.paddingL}
    ${p => p.theme.paddingS} ${p => p.theme.paddingM};
  margin: ${p => p.theme.paddingS};
  border-radius: ${p => p.theme.borderRadius};
  cursor: pointer;
  text-align: left;
  margin-left: ${p => p.theme.paddingS};

  &:hover {
    background-color: ${p => p.theme.colorLabel};
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

const StyledClose = styled.button`
  position: absolute;
  right: ${p => p.theme.paddingS};
  top: ${p => p.theme.paddingS};
  cursor: pointer;
  font-size: 20px;
  z-index: 101;

  ${media.greaterThan("md")`
    display: none;
  `};
`
