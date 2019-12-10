import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"

import { useLogout } from "../lib/graphql/user/hooks"

import styled from "../application/theme"
import Page from "../components/Page"
import Button from "../components/Button"
import { useMe } from "../components/providers/MeProvider"

const Dashboard: FC<RouteComponentProps> = () => {
  const user = useMe()
  const logout = useLogout()
  return (
    <Page>
      <div>
        <StyledHeader>
          Hello there, {user.firstName} {user.lastName}
        </StyledHeader>
        <Button onClick={logout}>Logout</Button>
      </div>
    </Page>
  )
}

export default Dashboard

const StyledHeader = styled.h2`
  margin: ${p => p.theme.paddingXL} auto;
  color: ${p => p.theme.colorText};
`
