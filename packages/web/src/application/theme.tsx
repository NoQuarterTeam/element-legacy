import * as styledComponents from "styled-components"
import { ThemedStyledComponentsModule } from "styled-components"
import { generateMedia } from "styled-media-query"
import { darken, lighten } from "polished"

const media = generateMedia({
  xl: "1440px",
  lg: "1170px",
  md: "768px",
  sm: "450px",
})

const theme: ThemeInterface = {
  colorBackground: "#f8f9fd",
  colorPlaceholder: "#d3d3d3",
  colorLabel: "#b1bbc4",
  colorHeader: "#1b2d41",
  colorPink: "#ed60d3",
  colorBlue: "#4586ff",
  fontBlack: 900,
  fontBold: 400,
  fontNormal: 200,
  paddingL: "20px",
  paddingM: "10px",
  paddingS: "5px",
  paddingXL: "40px",
  paddingXS: "3px",
  borderRadius: "5px",
  textL: "1.75rem",
  textM: "1.125rem",
  textS: "0.875rem",
  textXL: "2.25rem",
  textXS: "0.625rem",
  flexCenter: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  flexBetween: `
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  flexAround: `
    display: flex;
    align-items: center;
    justify-content: space-around;
  `,
}

export interface ThemeInterface {
  borderRadius: string
  colorBackground: string
  colorHeader: string
  colorLabel: string
  colorPlaceholder: string
  colorPink: string
  colorBlue: string
  fontBlack: number
  fontBold: number
  fontNormal: number
  paddingL: string
  paddingM: string
  paddingS: string
  paddingXL: string
  paddingXS: string
  textL: string
  textM: string
  textS: string
  textXL: string
  textXS: string
  flexCenter: string
  flexBetween: string
  flexAround: string
  [key: string]: any
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>

export {
  theme,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  media,
  darken,
  lighten,
}
export default styled
