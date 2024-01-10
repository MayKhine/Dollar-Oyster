import * as stylex from "@stylexjs/stylex"
// import { colors } from "../../assets/styles/tokens.stylex"
import { GoogleMap } from "./GoogleMap"

export const MapDiv = () => {
  return (
    <div {...stylex.props(MapDivStyles.fixedSide)}>
      <div>Google Map</div>

      <div {...stylex.props(MapDivStyles.map)}>
        <GoogleMap />
      </div>
    </div>
  )
}

const MapDivStyles = stylex.create({
  fixedSide: {
    width: "45%",
    height: "100%",
    position: "fixed",
    top: "5rem",
    flex: "0",
  },

  map: {
    padding: "2rem",
    // backgroundColor: "red",
  },
})
