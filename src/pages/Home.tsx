import * as stylex from "@stylexjs/stylex"

import { MapDiv } from "../components/map/MapDiv"

import { RestaurantListDiv } from "../components/restaurant/RestaurantListDiv"
import { LogoDiv } from "../components/UI/LogoDiv"
import { getPlaces } from "../api/databaseFunc"
import { colors } from "../assets/styles/tokens.stylex"
import { useLoadScript } from "@react-google-maps/api"
import { googleMapApiKey } from "../googleMapConfig"

export const Home = () => {
  getPlaces()

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapApiKey,
    libraries: ["places"],
  })
  if (!isLoaded) return <div> Loading </div>

  return (
    <div {...stylex.props(appStyles.base)}>
      <LogoDiv />
      {/* <MapDiv />
      <RestaurantListDiv /> */}
      <div {...stylex.props(appStyles.main)}>
        <MapDiv />
        <RestaurantListDiv />
      </div>
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
  main: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "gray",
    width: "100%",
  },
})
