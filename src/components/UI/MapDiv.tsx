import * as stylex from "@stylexjs/stylex"

import { GoogleMap } from "../map/GoogleMap"

export const MapDiv = () => {
  return (
    <div {...stylex.props(MapDivStyles.base)}>
      <GoogleMap />
    </div>
  )
}

const MapDivStyles = stylex.create({
  base: {
    backgroundColor: "pink",
    width: "100%",
    //  height: "100%"
    height: "60%",
  },
})
