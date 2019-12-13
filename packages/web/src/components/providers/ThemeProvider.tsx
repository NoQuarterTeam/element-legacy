import React, { FC, Fragment } from "react"

import emotionStyled, { CreateStyled } from "@emotion/styled"
import { ThemeProvider as CThemeProvider, DefaultTheme } from "@chakra-ui/core"
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

export const styled = emotionStyled as CreateStyled<DefaultTheme>
