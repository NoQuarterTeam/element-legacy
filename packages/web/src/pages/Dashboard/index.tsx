import React, { memo, FC } from "react"
import { RouteComponentProps } from "@reach/router"

import useAppContext from "../../lib/hooks/useAppContext"
import { useLogout } from "../../lib/graphql/user/hooks"

import styled from "../../application/theme"
import Page from "../../components/Page"
import Button from "../../components/Button"

const Dashboard: FC<RouteComponentProps> = () => {
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

export default memo(Dashboard)

const StyledHeader = styled.h2`
  margin: ${p => p.theme.paddingXL} auto;
`
