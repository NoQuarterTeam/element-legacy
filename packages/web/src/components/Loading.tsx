import React from "react"
import styled from "../application/theme"

import logo from "../public/logo.png"

interface Props {
  loading: boolean
}

export const Loading: React.FC<Props> = ({ loading, children }) => {
  return (
    <>
      <StyledContainer isLoading={loading}>
        <StyledLogo src={logo} />
      </StyledContainer>
      {!loading && children}
    </>
  )
}

const StyledContainer = styled.div<{ isLoading: boolean }>`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  transition: opacity 2s, visibility -0.3s linear 2s;

  background-color: ${p => p.theme.colorPage};
  visibility: ${p => (p.isLoading ? "visible" : "hidden")};
  opacity: ${p => (p.isLoading ? 1 : 0)};

  ${p => p.theme.flexCenter};
`

const StyledLogo = styled.img`
  height: 200px;
`
