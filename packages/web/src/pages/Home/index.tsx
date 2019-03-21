import React from "react"
import { RouteComponentProps } from "@reach/router"

import styled from "../../application/theme"
import Page from "../../components/Page"
import Button from "../../components/Button"

function Home(props: RouteComponentProps) {
  return (
    <Page>
      <div>
        <StyledHeader>Welcome to the Fullstack Boilerplate!</StyledHeader>
        <Button color="pink" onClick={() => props.navigate!("/login")}>
          Login
        </Button>
      </div>
    </Page>
  )
}

export default Home

const StyledHeader = styled.h2`
  font-size: ${p => p.theme.textL};
  margin-bottom: ${p => p.theme.paddingL};
`
