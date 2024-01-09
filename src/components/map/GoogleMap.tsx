import {
  APIProvider,
  Map,
  // AdvancedMarker,
  // Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps"
import * as stylex from "@stylexjs/stylex"
import { googleMapApiKey, googleMapID } from "../../googleMapConfig"
import { useState } from "react"

import { MapMarker, positionType } from "./MapMarker"
import oysterData from "../../data/oysterData.json"
// import { extractLatAndLng } from "../../utils/geoHelper"

export const GoogleMap = () => {
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
          {oysterData.map((each, index) => {
            // const latLng = extractLatAndLng(each.googleMapLink)
            // const markerPosition = { lat: latLng[0], lng: latLng[1] }
            return (
              <MapMarker
                key={index}
                data={each}
                onClickFn={() => {
                  clickHandler(each.position, each.name)
                }}
              ></MapMarker>
            )
          })}
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
    width: "95%",
    height: "70%",
    border: ".2rem black solid",
    borderRadius: "3rem",
    flex: "1",
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: "3rem",
  },
})
