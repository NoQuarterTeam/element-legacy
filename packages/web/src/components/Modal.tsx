import React, { FC, useEffect } from "react"
import styled from "styled-components"
import Tile from "./styled/Tile"
import Center from "./styled/Center"
import useEventListener from "../lib/hooks/useEventListener"
import { media } from "../lib/mediaQueries"
import { Close } from "styled-icons/material/Close"

interface ModalProps {
  onClose: () => void
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  useEventListener("keydown", (e: any) => {
    if (e.key === "Escape") onClose()
  })
  useEffect(() => {
    if (window.screen.width > 805) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.position = "fixed"
    }
    return () => {
      if (window.screen.width > 805) {
        document.body.style.overflowY = "scroll"
      } else {
        document.body.style.position = "relative"
      }
    }
  }, [])
  return (
    <StyledModal tabIndex={-1}>
      <StyledOverlay onClick={onClose} />
      <StyledTile>
        <StyledClose onClick={onClose}>
          <Close size={30} color="lightgrey" />
        </StyledClose>
        {children}
      </StyledTile>
    </StyledModal>
  )
}

export default Modal

const StyledModal = styled(Center)`
  position: fixed;
  z-index: 99;
  background-color: ${p => p.theme.colorOverlay};
  overflow: scroll;

  ${media.greaterThan("md")`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `}
`

const StyledOverlay = styled.div`
  z-index: 100;
  height: 100%;
  width: 100%;
  position: absolute;
`

const StyledTile = styled(Tile)`
  z-index: 101;
  padding: 55px ${p => p.theme.paddingXL} ${p => p.theme.paddingXL};
  margin: 0;
  height: 100vh;
  width: 100vw;
  color: black;
  background-color: white;
  border: ${p => p.theme.border};
  border-radius: 0;

  ${media.greaterThan("md")`
    position: relative;
    padding: ${p => p.theme.paddingXL} ${p => p.theme.paddingXL};
    margin: ${(p: any) => p.theme.paddingXL};
    height: max-content;
    max-width: 500px;
  `};
`

const StyledClose = styled.button`
  position: absolute;
  right: ${p => p.theme.paddingM};
  top: ${p => p.theme.paddingM};
  cursor: pointer;
  font-size: 20px;

  ${media.greaterThan("md")`
    display: none;
  `};
`
