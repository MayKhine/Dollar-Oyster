import { Map, InfoWindow } from "@vis.gl/react-google-maps"
import * as stylex from "@stylexjs/stylex"
import { googleMapID } from "../../googleMapConfig"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { MapMarker, positionType, restaurantDataType } from "./MapMarker"
import { getPlaces } from "../../api/databaseFunc"
import { colors } from "../../assets/styles/tokens.stylex"

type GoogleMapComponentProps = {
  mapPosition: positionType
  setMapPosition?: (position: positionType) => void
  zoom: number
}
export const GoogleMapComponent = ({
  // mapPosition,
  zoom,
}: GoogleMapComponentProps) => {
  const getPlacesQuery = useQuery({ queryKey: ["places"], queryFn: getPlaces })
  // console.log("What is map Position in Map : ", mapPosition)

  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<positionType>()
  const [text, setText] = useState({ name: "", address: "" })

  const clickHandler = (
    position: positionType,
    name: string,
    address: string
  ) => {
    setOpen(true)
    setPosition(position)
    setText({ name: name, address: address })
  }

  // const mapRef = useRef()
  // const onLoad = useCallback((map: Map) => (mapRef.current = map), [])
  // const map = useMap()
  // useEffect(() => {
  //   if (!map) return

  //   // do something with the map instance
  //   map.panTo(mapPosition)
  // }, [map, mapPosition])
  const boston = { lat: 42.36, lng: -71.1 }

  return (
    <div
      {...stylex.props(googleMapStyles.base)}
      onClick={() => {
        setOpen(false)
      }}
    >
      {/* <APIProvider apiKey={googleMapApiKey}> */}
      <Map
        {...stylex.props(googleMapStyles.map)}
        zoom={zoom}
        // center={mapPosition}
        center={boston}
        mapId={googleMapID}
        // onCenterChanged={onLoad}

        // onProjectionChanged={(event) => console.log("event: ", event)}
        // onCenterChanged={(event) => console.log("event", event)}
      >
        {getPlacesQuery.isSuccess &&
          getPlacesQuery.data.data?.map(
            (place: restaurantDataType, index: number) => {
              return (
                <MapMarker
                  key={index}
                  data={place}
                  onClickFn={() => {
                    const position = { lat: place.lat, lng: place.lng }
                    clickHandler(position, place.name, place.address)
                  }}
                ></MapMarker>
              )
            }
          )}

        {open && (
          <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
            <div>
              <div {...stylex.props(googleMapStyles.title)}>{text.name}</div>
              <div> {text.address}</div>
            </div>
          </InfoWindow>
        )}
      </Map>
      {/* </APIProvider> */}
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
  title: { fontSize: ".9rem", fontWeight: "400" },
})
