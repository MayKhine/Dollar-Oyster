import * as stylex from "@stylexjs/stylex"

import { MapDiv } from "../components/map/MapDiv"

import { RestaurantListDiv } from "../components/restaurant/RestaurantListDiv"
import { LogoDiv } from "../components/UI/LogoDiv"
import { getPlaces } from "../api/databaseFunc"
import { colors } from "../assets/styles/tokens.stylex"

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
    backgroundColor: colors.offwhite,
    display: "flex",
    flexDirection: "column",
  },
})
