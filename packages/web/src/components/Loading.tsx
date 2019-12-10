import React from "react"
import styled from "../application/theme"
import useDebounce from "../lib/hooks/useDebounce"

import logo from "../public/logo.png"

interface Props {
  loading: boolean
}

export const Loading: React.FC<Props> = ({ loading, children }) => {
  const isLoading = useDebounce(loading, 200)
  return (
    <>
      <StyledContainer loading={isLoading}>
        <StyledLogo src={logo} />
      </StyledContainer>
      {!isLoading && children}
    </>
  )
}

const StyledContainer = styled.div<{ loading: boolean }>`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  transition: opacity 2s, visibility -0.3s linear 2s;

  background-color: ${p => p.theme.colorPage};
  visibility: ${p => (p.loading ? "visible" : "hidden")};
  opacity: ${p => (p.loading ? 1 : 0)};

  ${p => p.theme.flexCenter};
`

const StyledLogo = styled.img`
  height: 200px;
`
