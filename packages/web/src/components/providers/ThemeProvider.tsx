import React, { FC, Fragment } from "react"
import useMedia from "use-media"
import { ThemeProvider as CThemeProvider } from "@chakra-ui/core"
import {
  theme,
  ThemeProvider as SCThemeProvider,
} from "../../application/theme"

const ThemeProvider: FC = ({ children }) => {
  const isSmall = useMedia({ maxWidth: 450 })

  return (
    <CThemeProvider>
      <SCThemeProvider theme={theme(isSmall, false)}>
        <Fragment>{children}</Fragment>
      </SCThemeProvider>
    </CThemeProvider>
  )
}

export default ThemeProvider
