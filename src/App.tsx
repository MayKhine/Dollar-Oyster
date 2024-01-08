import { GoogleMap } from "./components/map/GoogleMap"

import * as stylex from "@stylexjs/stylex"

const appStyles = stylex.create({
  base: {
    position: "relative",
    backgroundColor: "lightgray",
    width: "100%",
  },
})

export const App = () => {
  return (
    <div>
      <div>Menu</div>
      <div {...stylex.props(appStyles.base)}>HELLOOOO</div>
      <GoogleMap />
      <div>
        List <div> place 1 </div>
        <div> place 2</div>
      </div>

      <div> Button : add a new place </div>
    </div>
  )
}
