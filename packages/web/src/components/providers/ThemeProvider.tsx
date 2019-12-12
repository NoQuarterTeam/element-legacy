import React, { FC, Fragment } from "react"

import { ThemeProvider as CThemeProvider } from "@chakra-ui/core"
import {
  theme,
  ThemeProvider as SCThemeProvider,
} from "../../application/theme"

export const ThemeProvider: FC = ({ children }) => {
  return (
    <SCThemeProvider theme={theme(false, false)}>
      <CThemeProvider>
        <Fragment>{children}</Fragment>
      </CThemeProvider>
    </SCThemeProvider>
  )
}
