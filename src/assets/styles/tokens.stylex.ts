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

// export const colorsObj = {
//   yellow: "#FDFD96",
//   green: "#BAFCA2",
//   blue: "#8EE4FF",
//   pink: "#FFA5D2",
//   orange: "#FFC875",
//   red: "#FF8989",
//   purple: "#E6A0FF",
//   offwhite: "#FAF7F0",
// } as const

export const colorsObj = {
  green2: "#b3c9ad",
  green: "#c1e3b8",
  blue: "#b8cde3",
  red: "#e3b8b8",
  purple: "#e3deb8",
  orange: "#e3d2b8",
  pink: "#e3b8d9",
  yellow: "#e3dcb8",
  lightblue: "#caeffa",
  offwhite: "#FAF7F0",
  darkgreen: "#455245",
  darkblue: "#31303d",
} as const

export type ColorsKey = keyof typeof colorsObj

export const colors = stylex.defineVars(colorsObj)
