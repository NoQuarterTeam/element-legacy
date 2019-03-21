import React, { memo } from "react"
import { RouteComponentProps } from "@reach/router"

import useAppContext from "../../lib/hooks/useAppContext"
import { useLogout } from "../../lib/graphql/user/hooks"

import styled from "../../application/theme"
import Page from "../../components/Page"
import Button from "../../components/Button"

function Profile(_: RouteComponentProps) {
  const { user } = useAppContext()
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

export default memo(Profile)

const StyledHeader = styled.h2`
  margin: ${p => p.theme.paddingXL} auto;
`
