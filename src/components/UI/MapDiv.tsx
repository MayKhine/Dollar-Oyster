import * as stylex from "@stylexjs/stylex"
import { colors } from "../../assets/styles/tokens.stylex"
import { GoogleMap } from "../map/GoogleMap"

export const MapDiv = () => {
  return (
    <div {...stylex.props(MapDivStyles.base)}>
      <div>Google Map </div>
      <div>Add a new place</div>
      <div>FILTER FEATURE</div>
      <GoogleMap />
    </div>
  )
}

const MapDivStyles = stylex.create({
  base: {
    backgroundColor: colors.orange,
    width: "100%",
    //  height: "100%"
    // height: "60%",
    display: "flex",
    flexDirection: "column",
    // flex: "1",
    // height: "100vh",
  },
})
