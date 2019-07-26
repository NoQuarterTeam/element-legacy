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
  handleShowChildren,
  ...props
}) => {
  return (
    <>
      <StyledOptionContainer
        {...props}
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

        <StyledAdd color={element.color} onClick={() => addChild(element)}>
          +
        </StyledAdd>
        <StyledColorCircle
          id={element.id}
          onClick={() => togglePicker(element)}
          color={element.color}
          // ref={buttonRef}
        />
        {element.children &&
        element.children.filter(e => !e.archived).length > 0 ? (
          <StyledArrow
            onClick={handleShowChildren}
            open={open}
            color={element.color}
          />
        ) : (
          <StyledDelete
            color={element.color}
            onClick={() => archiveElement(element)}
          >
            x
          </StyledDelete>
        )}
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

const StyledArrow = styled.div<{ open?: boolean; color: string }>`
  border: solid ${props => lighten(0.1, props.theme.colorText)};
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: ${p => p.theme.paddingXS};
  content: "";
  transform: ${props => (props.open ? "rotate(225deg)" : "rotate(45deg)")};
  width: 0;
  height: 0;
  margin-left: ${props => props.theme.paddingM};
  margin-top: ${props => (props.open ? p => p.theme.paddingS : "-3px")};

  &:hover {
    transform: ${props =>
      props.open ? "rotate(225deg) scale(1.1)" : "rotate(45deg) scale(1.1)"};
  }
`

const StyledColorCircle = styled.div`
  border-radius: 50%;
  min-height: 16px;
  visibility: hidden;
  min-width: 16px;
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
  padding: ${p => p.theme.paddingS} ${p => p.theme.paddingL}
    ${p => p.theme.paddingS} ${p => p.theme.paddingM};
  margin: ${p => p.theme.paddingS};
  border-radius: ${p => p.theme.borderRadius};
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

  &:hover ${StyledArrow} {
    border: solid ${props => darken(0.2, props.color)};
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: ${p => p.theme.paddingXS};
    content: "";
    transform: ${props => (props.open ? "rotate(225deg)" : "rotate(45deg)")};
    width: 0;
    height: 0;
    margin-left: ${props => props.theme.paddingM};
    margin-top: ${props => (props.open ? p => p.theme.paddingS : "-3px")};
  }

  &:hover ${StyledOption} {
    color: ${p => darken(0.2, p.color)};
  }
`
