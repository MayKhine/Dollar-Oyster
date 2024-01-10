import * as stylex from "@stylexjs/stylex"

export const tokens = stylex.defineVars({
  primaryText: "black",
  secondaryText: "#333",
  accent: "blue",
  borderRadius: "4px",
  fontSize: "16px",
})

export const colorsObj = {
  offwhite: "#FFFBF2",
  offwhite2: "#E9E0CB",
  darkBlue: "#16337D",
  orange: "#F15E51",
  lightBlue: "#A6D4F7",
  green: "#B1E2BC",
} as const

export const semanticColorsObj = {
  red: "#DC4040",
  greeen: "#36BF6A",
  orange: "#E48D4A",
  blue: "#4FA7D6",
  white: "#FFF5F2",
}

export type ColorsKey = keyof typeof colorsObj
export const colors = stylex.defineVars(colorsObj)
export const semanticColors = stylex.defineVars(semanticColorsObj)
