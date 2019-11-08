import React, { FC } from "react"
import { RouteComponentProps, navigate } from "@reach/router"

import logo from "../public/logo.png"

import styled from "../application/theme"
import Page from "../components/Page"
import Button from "../components/Button"
import Spacer from "../components/styled/Spacer"

const Home: FC<RouteComponentProps> = () => {
  return (
    <StyledWrapper>
      <StyledLogo>element</StyledLogo>
      <StyledLogoText>life planner</StyledLogoText>
      <StyledCenter>
        <StyledImage src={logo} />
        <StyledHeader>Balance your life.</StyledHeader>
        <StyledSubHeader>Be in your element.</StyledSubHeader>
        <Button color="white" onClick={() => navigate("/register")}>
          begin
        </Button>
        <Spacer margin={120} />
        <StyledHeader>Four tools in one.</StyledHeader>
        <StyledSubHeader>
          Planner | Time tracker | Calender| Habit tracker
        </StyledSubHeader>
      </StyledCenter>
    </StyledWrapper>
  )
}

export default Home

const StyledWrapper = styled.div`
  width: 100vw;
  height: fit-content;
  padding: ${p => p.theme.paddingL};
  overflow: auto;
`

const StyledLogo = styled.h1``

const StyledLogoText = styled.h4``

const StyledCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledImage = styled.img`
  margin-top: 60px;
  height: 600px;
  margin-bottom: -220px;
`

const StyledHeader = styled.h1`
  font-family: "Open Sans";
  font-weight: 900;
  font-size: 60px;
  margin-bottom: ${p => p.theme.paddingL};
  color: black;
`

const StyledSubHeader = styled.h1`
  margin-bottom: ${p => p.theme.paddingL};
  color: black;
`
