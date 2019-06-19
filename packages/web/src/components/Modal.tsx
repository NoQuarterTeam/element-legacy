import React, { FC, useEffect } from "react"
import styled from "../application/theme"
import Tile from "./styled/Tile"
import Center from "./styled/Center"
import useEventListener from "../lib/hooks/useEventListener"

interface ModalProps {
  onClose: () => void
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  useEventListener("keydown", (e: any) => {
    if (e.key === "Escape") onClose()
  })
  useEffect(() => {
    document.body.style.overflowY = "hidden"
    return () => {
      document.body.style.overflowY = "scroll"
    }
  }, [])
  return (
    <StyledModal tabIndex={-1}>
      <StyledOverlay onClick={onClose} />
      <StyledTile>{children}</StyledTile>
    </StyledModal>
  )
}

export default Modal

const StyledModal = styled(Center)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  overflow: scroll;
  background-color: ${p => p.theme.colorOverlay};
`

const StyledOverlay = styled.div`
  z-index: 100;
  height: 100%;
  width: 100%;
  position: absolute;
`

const StyledTile = styled(Tile)`
  z-index: 101;
  margin: ${p => p.theme.paddingXL};
  padding: ${p => p.theme.paddingL} ${p => p.theme.paddingXL};
  height: max-content;
  max-width: 600px;
`
