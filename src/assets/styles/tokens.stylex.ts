import * as stylex from "@stylexjs/stylex"

export const tokens = stylex.defineVars({
  primaryText: "black",
  secondaryText: "#333",
  accent: "blue",
  background: "white",
  lineColor: "gray",
  borderRadius: "4px",
  fontFamily: "system-ui, sans-serif",
  fontSize: "16px",
})

export const colorsObj = {
  yellow: "#FDFD96",
  green: "#BAFCA2",
  blue: "#8EE4FF",
  pink: "#FFA5D2",
  orange: "#FFC875",
  red: "#FF8989",
  purple: "#E6A0FF",
  offwhite: "#FAF7F0",
} as const

export type ColorsKey = keyof typeof colorsObj

export const colors = stylex.defineVars(colorsObj)
