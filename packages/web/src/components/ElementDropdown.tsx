import React, { createRef, FC, useEffect, useState } from "react"
import { TwitterPicker } from "react-color"
import styled, { media } from "../application/theme"
import {
  useCreateElement,
  useUpdateElement,
} from "../lib/graphql/element/hooks"
import { ElementFragment } from "../lib/graphql/types"
import useOnClickOutside from "../lib/hooks/useOnOutsideClick"
import ElementDropdownOption from "./ElementDropdownOption"
import Input from "./Input"
import { lighten } from "@noquarter/ui"
import { useTimelineContext } from "./providers/TimelineProvider"

interface ElementDropdownProps {
  selectedElementId?: string
  elements: ElementFragment[] | undefined | null
  placeholder: string
  handleSelectElement: (element: ElementFragment) => void
  filteredElements?: string[]
  toggleAll?: () => void
}
const ElementDropdown: FC<ElementDropdownProps> = ({
  handleSelectElement,
  selectedElementId,
  elements,
  placeholder,
  filteredElements,
  toggleAll,
}) => {
  const { selectedUserId } = useTimelineContext()
  const createElement = useCreateElement(selectedUserId)
  const updateElement = useUpdateElement()
  const [dropdownOpen, openDropdown] = useState(false)
  const [pickerOpen, openColorPicker] = useState(false)
  const [newElement, setNewElement] = useState("")
  const [newChildElement, setNewChildElement] = useState("")
  const [showChildren, setShowChildren] = useState("")
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
      setAddingChild("")
    }
  }

  const createNewChildElement = async (parent: ElementFragment) => {
    if (newChildElement !== "") {
      let letters = "0123456789ABCDEF"
      let generatedColor = ""
      for (var i = 0; i < 6; i++) {
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

  useOnClickOutside(dropdownRef, () => openDropdown(false))
  useOnClickOutside(pickerRef, () => openColorPicker(false))

  const handleChangeComplete = (color: any) => {
    setAddingChild("")

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
      <StyledDropdownPlaceholder
        open={dropdownOpen}
        onClick={() => openDropdown(!dropdownOpen)}
        color={selectedElement && selectedElement.color}
      >
        {selectedElement ? selectedElement.name : placeholder}
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
      <StyledDropdownMenu
        open={dropdownOpen}
        filter={filteredElements ? "true" : "false"}
      >
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
  color: ${p => lighten(0.1, p.theme.colorText)};
  background-color: ${props =>
    props.color ? lighten(0.2, props.color) : p => p.theme.colorPlaceholder};
  cursor: pointer;
  padding: ${p => p.theme.paddingS} ${p => p.theme.paddingM};
  border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.flexCenter};
  font-weight: ${p => p.theme.fontBold};
  white-space: nowrap;

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
    margin-top: ${props => (props.open ? p => p.theme.paddingS : "-3px")};
  }
`

const StyledDropdownMenu = styled.div<{ open: boolean; filter: string }>`
  visibility: ${props => (props.open ? "visible" : "hidden")};
  position: fixed;
  padding-top: ${p => p.theme.paddingM};
  box-shadow: ${props => props.theme.boxShadowBold};
  border-radius: ${p => p.theme.borderRadiusL};
  background-color: white;
  min-width: 350px;
  overflow-y: auto;
  z-index: 100;
  width: 100vw;
  left: 0;
  top: ${p => (p.filter === "true" ? "50px" : "auto")};
  bottom: ${p => (p.filter === "true" ? "auto" : "0")};

  ${media.greaterThan("md")`
    position: absolute; 
    left: -${(p: any) => p.theme.paddingXL};
    bottom: auto;
    width: fit-content;
    top: ${(p: any) => p.theme.paddingXL};
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
