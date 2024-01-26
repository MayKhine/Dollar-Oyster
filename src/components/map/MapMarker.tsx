import { AdvancedMarker } from "@vis.gl/react-google-maps"
// import { colors } from "../../assets/styles/tokens.stylex"
import * as stylex from "@stylexjs/stylex"
import oyster from "../../assets/images/oysterMarker2.png"

export type MapMarkerProps = {
  onClickFn: () => void
  data: restaurantDataType
}

export type restaurantDataType = {
  id: string
  date: string
  name: string
  link: string
  lat: number
  lng: number
  address: string
  notes: string
  days: Array<number>
  // from: DateTime
  // to: DateTime
  from: string
  to: string
  love: number
  unlove: number
}

export type positionType = {
  lat: number
  lng: number
}

export const MapMarker = ({ onClickFn, data }: MapMarkerProps) => {
  const latlng = { lat: data.lat, lng: data.lng }
  return (
    <AdvancedMarker position={latlng} title={"Oyster"} onClick={onClickFn}>
      <img {...stylex.props(mapMarkerStyles.marker)} src={oyster}></img>
    </AdvancedMarker>
  )
}

const mapMarkerStyles = stylex.create({
  base: { backgroundColor: "pink" },
  marker: { width: "1.7rem" },
})
