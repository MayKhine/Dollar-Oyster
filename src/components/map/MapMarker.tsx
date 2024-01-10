import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps"
import { colors } from "../../assets/styles/tokens.stylex"
import * as stylex from "@stylexjs/stylex"
import oyster from "../../assets/images/oysterMarker.png"

export type MapMarkerProps = {
  onClickFn: () => void
  data: restaurantDataType
}

export type restaurantDataType = {
  id: string
  name: string
  lat: number
  lng: number
  position: {
    lat: number
    lng: number
  }
  address: string
  notes: string
  googleMapLink: string
  googleMapLink2?: string
}

export type positionType = {
  lat: number
  lng: number
}

export const MapMarker = ({ onClickFn, data }: MapMarkerProps) => {
  const latlng = { lat: data.lat, lng: data.lng }
  return (
    <AdvancedMarker position={latlng} title={"Oyster"} onClick={onClickFn}>
      {/* <Pin
        background={"red"}
        borderColor={colors.offwhite}
        glyphColor={colors.pink}
      ></Pin> */}
      <img {...stylex.props(mapMarkerStyles.marker)} src={oyster}></img>
    </AdvancedMarker>
  )
}

const mapMarkerStyles = stylex.create({
  base: { backgroundColor: "pink" },
  marker: { width: "1.7rem" },
})
