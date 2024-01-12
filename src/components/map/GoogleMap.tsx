import { APIProvider, Map, InfoWindow } from "@vis.gl/react-google-maps"
import * as stylex from "@stylexjs/stylex"
import { googleMapApiKey, googleMapID } from "../../googleMapConfig"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { MapMarker, positionType, restaurantDataType } from "./MapMarker"
import { getPlaces } from "../../api/databaseFunc"
import { colors } from "../../assets/styles/tokens.stylex"

export const GoogleMap = () => {
  const getPlacesQuery = useQuery({ queryKey: ["places"], queryFn: getPlaces })

  // if (getPlacesQuery.isSuccess) {
  //   console.log("GET PLACES QUERY DATA in MAP: ", getPlacesQuery.data)
  // }

  const boston = { lat: 42.36, lng: -71.1 }
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<positionType>()
  const [text, setText] = useState("")

  const clickHandler = (position: positionType, text: string) => {
    setOpen(true)
    setPosition(position)
    setText(text)
  }

  return (
    <div {...stylex.props(googleMapStyles.base)}>
      <APIProvider apiKey={googleMapApiKey}>
        <Map
          {...stylex.props(googleMapStyles.map)}
          zoom={12}
          center={boston}
          mapId={googleMapID}
        >
          {getPlacesQuery.isSuccess &&
            getPlacesQuery.data.data.map(
              (place: restaurantDataType, index: number) => {
                return (
                  <MapMarker
                    key={index}
                    data={place}
                    onClickFn={() => {
                      const position = { lat: place.lat, lng: place.lng }
                      clickHandler(position, place.name)
                    }}
                  ></MapMarker>
                )
              }
            )}

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <div>{text}</div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  )
}

const googleMapStyles = stylex.create({
  base: {
    background: "pink",
    width: "100%",
    // height: "70vh",
    height: "100%",
    border: `.2rem  ${colors.darkBlue} solid`,
    borderRadius: "1rem",
    flex: "1",
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: "1rem",
  },
})
