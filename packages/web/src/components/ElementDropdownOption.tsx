import React, { FC } from "react"

import { ElementFragment } from "../lib/graphql/types"
import { darken, lighten } from "polished"
import styled from "styled-components"
import { DeleteOutline } from "styled-icons/material/DeleteOutline"
import { Add } from "styled-icons/material/Add"
import { GroupAdd } from "styled-icons/material/GroupAdd"
import { useMe } from "./providers/MeProvider"
import ShareModal from "./ShareModal"
import { useDisclosure, Tooltip } from "@chakra-ui/core"

interface ElementDropdownOptionProps {
  element: ElementFragment
  selected: any
  child?: boolean
  togglePicker: any
  hiddenElement?: boolean
  handleSelectElement: () => void
  addChild: (element: ElementFragment) => void
  archiveElement: (element: ElementFragment) => void
  open?: boolean
  handleShowChildren: () => void
}
const ElementDropdownOption: FC<ElementDropdownOptionProps> = ({
  element,
  selected,
  togglePicker,
  handleSelectElement,
  archiveElement,
  hiddenElement,
  addChild,
  open,
  child,
  handleShowChildren,
  ...props
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const user = useMe()

  return (
    <>
      <StyledOptionContainer
        {...props}
        child={child}
        hiddenElement={hiddenElement}
        color={element.color}
        open={open}
      >
        <StyledOption
          selectedId={selected && selected.id}
          onClick={handleSelectElement}
          id={element.id}
          hiddenElement={hiddenElement}
        >
          {element.name}
        </StyledOption>

        {/* TODO: Remove aria-label prop when bug is solved */}
        <StyledShare color={element.color} onClick={onOpen}>
          <Tooltip
            aria-label=""
            hasArrow
            label="Share"
            placement="top"
            zIndex={9000}
            bg="black"
          >
            <GroupAdd color={element.color} width="20" />
          </Tooltip>
        </StyledShare>

        {element.children && user.id === element.creatorId && (
          <StyledDelete>
            <Tooltip
              aria-label=""
              hasArrow
              label="Delete"
              placement="top"
              zIndex={9000}
              bg="black"
            >
              <DeleteOutline
                color={element.color}
                onClick={() => archiveElement(element)}
                width="24px"
                cursor="pointer"
              />
            </Tooltip>
          </StyledDelete>
        )}
        {!child && (
          <StyledAdd color={element.color} onClick={() => addChild(element)}>
            <Tooltip
              aria-label=""
              hasArrow
              label="Add child element"
              placement="top"
              zIndex={9000}
              bg="black"
            >
              <Add color={element.color} width="24px" cursor="pointer" />
            </Tooltip>
          </StyledAdd>
        )}
        {user.id === element.creatorId && (
          <Tooltip
            aria-label=""
            hasArrow
            label="Choose color"
            placement="top"
            zIndex={9000}
            bg="black"
          >
            <StyledColorCircle
              id={element.id}
              onClick={() => togglePicker(element)}
              color={element.color}
              // ref={buttonRef}
            />
          </Tooltip>
        )}
        {element.children &&
          element.children.filter(e => !e.archived).length > 0 && (
            <StyledArrowContainer open={open} onClick={handleShowChildren}>
              <StyledArrow
                open={open}
                color={element.color}
                hiddenElement={hiddenElement}
              />
            </StyledArrowContainer>
          )}
      </StyledOptionContainer>
      {isOpen && (
        <ShareModal element={element} isOpen={isOpen} onClose={onClose} />
      )}
    </>
  )
}

export default ElementDropdownOption

const StyledDelete = styled.p`
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
  color: ${p => (p.hiddenElement ? p.theme.colorLabel : p.theme.colorText)};
`

const StyledArrowContainer = styled.div<{ open?: boolean }>`
  padding: 0 ${props => props.theme.paddingS} 0 ${props => props.theme.paddingM};
`

const StyledArrow = styled.div<{
  open?: boolean
  color: string
  hiddenElement?: boolean
}>`
  border: solid
    ${props =>
      props.hiddenElement
        ? props.theme.colorLabel
        : lighten(0.1, props.theme.colorText)};
  border-width: 0 3px 3px 0;
  display: inline-block;
  content: "";
  transform: ${props =>
    props.open ? "rotate(45deg) scale(-1, -1)" : "rotate(45deg)"};
  width: 0;
  height: 0;
  margin-left: 0;
  margin-top: ${props => props.open && props.theme.paddingS};
  margin-bottom: ${props => !props.open && props.theme.paddingXS};
  padding: ${p => p.theme.paddingXS};

  &:hover {
    transform: ${props =>
      props.open ? "rotate(45deg) scale(-1,-1)" : "rotate(45deg) scale(1.1)"};
  }
`

const StyledColorCircle = styled.div`
  border-radius: 50%;
  min-height: 16px;
  visibility: hidden;
  min-width: 16px;
  padding: 4px;
  margin: 0 ${p => p.theme.paddingS};
  cursor: pointer;
  background-color: ${props => props.color};

  &:hover {
    transform: scale(1.1);
  }
`

const StyledAdd = styled.p<{ color: string }>`
  color: ${p => darken(0.2, p.color)};
  font-size: ${p => p.theme.textL};
  line-height: 1rem;
  visibility: hidden;

  &:hover {
    transform: scale(1.1);
  }
`

const StyledShare = styled.p<{ color: string }>`
  color: ${p => darken(0.2, p.color)};
  font-size: ${p => p.theme.textL};
  line-height: 1rem;
  visibility: hidden;
  margin: 0 ${p => p.theme.paddingS};

  &:hover {
    transform: scale(1.1);
  }
`

const StyledOptionContainer = styled.div<{
  color: string
  child?: boolean
  hiddenElement?: boolean
  open?: boolean
}>`
  position: relative;
  ${p => p.theme.flexCenter};
  padding: ${p => p.theme.paddingS} ${p => p.theme.paddingM}
    ${p => p.theme.paddingS} ${p => p.theme.paddingM};
  margin: ${p => p.theme.paddingS};
  cursor: pointer;
  margin-left: ${p => (p.child ? p.theme.paddingL : p.theme.paddingS)};

  &:hover {
    background-color: ${p => lighten(0.2, p.color)};
  }

  &:hover ${StyledColorCircle} {
    visibility: visible;
  }

  &:hover ${StyledDelete} {
    visibility: visible;
  }

  &:hover ${StyledAdd} {
    visibility: visible;
  }

  &:hover ${StyledShare} {
    visibility: visible;
  }

  &:hover ${StyledArrow} {
    border: solid ${props => darken(0.2, props.color)};
    border-width: 0 3px 3px 0;
    display: inline-block;
    content: "";
    transform: ${props =>
      props.open ? "rotate(45deg) scale(-1,-1)" : "rotate(45deg)"};
    width: 0;
    height: 0;
    transition: transform 0.2s;
  }

  &:hover ${StyledOption} {
    color: ${p => darken(0.2, p.color)};
  }
`
