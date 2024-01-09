import * as stylex from "@stylexjs/stylex"

import { MapDiv } from "../components/UI/MapDiv"

import { RestaurantListDiv } from "../components/UI/RestaurantListDiv"
import { LogoDiv } from "../components/UI/LogoDiv"

export const Home = () => {
  return (
    <div {...stylex.props(appStyles.base)}>
      <LogoDiv />
      <div {...stylex.props(appStyles.layout)}>
        <MapDiv />
        <RestaurantListDiv />
      </div>
    </div>
  )
}

const appStyles = stylex.create({
  base: {
    position: "relative",
    backgroundColor: "lightgray",
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  layout: {
    // width: "100vw",
    display: "flex",
    backgroundColor: "lightgreen",
    // height: "50vh",
    // height: "70%",
    height: "100%",
  },
})
