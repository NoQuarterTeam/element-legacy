import React, { FC } from "react"
import styled from "../application/theme"

interface ModalProps {}
const Modal: FC<ModalProps> = ({ children }) => {
  return <StyledModal>{children}</StyledModal>
}

export default Modal

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  padding: ${props => props.theme.paddingLarge};
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 10px;
  background-color: white;
  z-index: 1000;
`
