import {
  APIProvider,
  Map,
  // AdvancedMarker,
  // Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps"
// import * as stylex from "@stylexjs/stylex"
import { googleMapApiKey } from "../../googleMapConfig"
import { useState } from "react"
import { MapMarker, positionType } from "./MapMarker"
import oysterData from "../../data/oysterData.json"

export const GoogleMap = () => {
  const boston = { lat: 42.36, lng: -71.1 }
  // const oyster1 = { lat: 42.3940718, lng: -71.0789321 }

  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<positionType>()
  const [text, setText] = useState("")

  const clickHandler = (position: positionType, text: string) => {
    setOpen(true)
    setPosition(position)
    setText(text)
  }

  return (
    <APIProvider apiKey={googleMapApiKey}>
      <div style={{ height: "50vh", width: "50vw" }}>
        Google Map
        <Map zoom={12} center={boston}>
          {oysterData.map((each, index) => {
            console.log("")
            return (
              <MapMarker
                key={index}
                position={each.position}
                text={each.name}
                onClickFn={() => {
                  clickHandler(each.position, each.name)
                }}
              ></MapMarker>
            )
          })}
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
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

// const googleMapStyles = stylex.create({
//   base: { background: "pink" },
//   div: { color: "white" },
// })
