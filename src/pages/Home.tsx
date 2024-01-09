import * as stylex from "@stylexjs/stylex"

import { MapDiv } from "../components/UI/MapDiv"

import { RestaurantListDiv } from "../components/UI/RestaurantListDiv"
import { LogoDiv } from "../components/UI/LogoDiv"

export const Home = () => {
  return (
    <div {...stylex.props(appStyles.base)}>
      <LogoDiv />
      <MapDiv />
      <RestaurantListDiv />
    </div>
  )
}

const appStyles = stylex.create({
  base: {
    position: "relative",
    backgroundColor: "lightgray",
    // width: "100vw",
    // height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
})
