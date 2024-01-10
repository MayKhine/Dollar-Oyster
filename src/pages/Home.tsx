import * as stylex from "@stylexjs/stylex"

import { MapDiv } from "../components/map/MapDiv"

import { RestaurantListDiv } from "../components/restaurant/RestaurantListDiv"
import { LogoDiv } from "../components/UI/LogoDiv"
import { getPlaces } from "../api/databaseFunc"

export const Home = () => {
  getPlaces()
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
