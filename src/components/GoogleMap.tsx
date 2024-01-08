import {
  APIProvider,
  Map,
  AdvancedMarker,
  Marker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps"

import { googleMapApiKey } from "../googleMapConfig"
import { useState } from "react"

export const GoogleMap = () => {
  const boston = { lat: 42.36, lng: -71.1 }
  const oyster1 = { lat: 42.3940718, lng: -71.0789321 }
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<google.maps.LatLng>()
  const [text, setText] = useState("")
  const clickHandler = (position: google.maps.LatLng, text: string) => {
    setOpen(!open)
    setPosition(position)
    setText(text)
  }

  return (
    <APIProvider apiKey={googleMapApiKey}>
      <div style={{ height: "50vh", width: "50vw" }}>
        Google Map
        <Map zoom={12} center={boston}>
          <Marker
            position={oyster1}
            title={"Salt + Stone"}
            onClick={() => {
              clickHandler(oyster1, "oyster")
            }}
          ></Marker>

          <Marker
            position={boston}
            title={"Salt + Stone"}
            onClick={() => {
              clickHandler(boston, "boston")
            }}
          ></Marker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(!open)}>
              <p> {text}</p>
            </InfoWindow>
          )}

          {/* <AdvancedMarker
            position={{ lat: 42.3940718, lng: -71.0789321 }}
            title={"Oyster"}
          >
            <Pin
              background={"red"}
              borderColor={"green"}
              glyphColor={"purple"}
            ></Pin>
          </AdvancedMarker> */}
        </Map>
      </div>
    </APIProvider>
  )
}

export { Map }
