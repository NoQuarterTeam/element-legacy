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

const theme: (small: boolean, isDark: boolean) => ThemeInterface = (
  small,
  isDark,
) => ({
  colorPage: isDark ? "#2f3335" : "white",
  colorBackground: isDark ? "#373c3f" : "#fff",
  colorPlaceholder: isDark ? "#6f7172" : "#d3d3d3",
  colorShadow: isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(200, 200, 200, 0.1)",
  colorOverlay: isDark ? "rgba(200, 200, 200, 0.1)" : "rgba(0, 0, 0, 0.1);",
  colorLabel: isDark ? "#81878a" : "#b1bbc4",
  colorText: isDark ? "#ebecec" : "#484848",
  colorWarning: isDark ? "#ebecec" : "rgba(221, 0, 129)",
  colorRed: "#FF9292",
  colorPrimary: "#F4CA87",
  colorPurple: "#A836FF",
  colorYellow: "#FFD336",
  colorPink: "#ed60d3",
  colorBlue: "#D2ECFC",
  colorLightBlue: "rgba(210,236,252,0.4)",
  colorLightGrey: "#EEE",
  fontBold: 900,
  fontSemiBold: 900,
  fontNormal: 400,
  fontThin: 200,
  paddingL: "20px",
  paddingML: "15px",
  paddingM: "10px",
  paddingSM: "7px",
  paddingS: "5px",
  paddingXL: "40px",
  paddingXS: "3px",
  borderRadius: "8px",
  borderRadiusL: "16px",
  borderRadiusS: "4px",
  border: "2px solid black",
  boxShadow: "1px 1px 4px 1px rgba(200, 200, 200, 0.2)",
  boxShadowBold: "1px 1px 4px 1px rgba(200, 200, 200, 0.3)",
  textXL: small ? "2.25rem" : "2.75rem",
  textL: small ? "1.5rem" : "1.75rem",
  textM: small ? "1rem" : "1.125rem",
  textS: small ? "0.75rem" : "0.8125rem",
  textXS: "0.72rem",
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
})

export interface ThemeInterface {
  colorPage: string
  borderRadius: string
  border: string
  colorBackground: string
  colorText: string
  colorLabel: string
  colorShadow: string
  colorPlaceholder: string
  colorWarning: string
  colorRed: string
  colorPink: string
  colorBlue: string
  colorLightBlue: string
  colorLightGrey: string
  fontThin: number
  fontBold: number
  fontSemiBold: number
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
