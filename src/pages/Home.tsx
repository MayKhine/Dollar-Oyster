import * as stylex from "@stylexjs/stylex"

import { MapDiv } from "../components/map/MapDiv"

import { RestaurantListDiv } from "../components/restaurant/RestaurantListDiv"
import { LogoDiv } from "../components/UI/LogoDiv"
import { getPlaces } from "../api/databaseFunc"
import { colors } from "../assets/styles/tokens.stylex"
import { Libraries, useLoadScript } from "@react-google-maps/api"
import { googleMapApiKey } from "../googleMapConfig"
import { useState } from "react"
import { positionType } from "../components/map/MapMarker"
import { APIProvider } from "@vis.gl/react-google-maps"

export const Home = () => {
  const boston = { lat: 42.36, lng: -71.1 }

  const [mapPosition, setMapPosition] = useState(boston)
  const [zoom, setZoom] = useState(12)

  //get data
  getPlaces()

  //loading google map libs
  const libraries: Libraries = ["places"]
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapApiKey,
    libraries,
  })
  if (!isLoaded) return <div> Loading </div>

  return (
    <div {...stylex.props(appStyles.base)}>
      <LogoDiv />

      <div {...stylex.props(appStyles.main)}>
        <APIProvider apiKey={googleMapApiKey}>
          <MapDiv
            mapPosition={mapPosition}
            setMapPosition={(position: positionType) => {
              setMapPosition(position)
            }}
            zoom={zoom}
          />
          <RestaurantListDiv
            mapPosition={mapPosition}
            setMapPosition={(position: positionType) => {
              setMapPosition(position)
            }}
            setZoom={(zoom) => {
              setZoom(zoom)
            }}
          />
        </APIProvider>
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
    // backgroundColor: "gray",
    width: "100%",
  },
})
