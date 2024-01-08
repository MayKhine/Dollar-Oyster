import { Marker } from "@vis.gl/react-google-maps"
// import * as stylex from "@stylexjs/stylex"

export type MapMarkerProps = {
  onClickFn: () => void
  text: string
  position: positionType
}

export type positionType = {
  lat: number
  lng: number
}

export const MapMarker = ({ onClickFn, text, position }: MapMarkerProps) => {
  return <Marker position={position} title={text} onClick={onClickFn}></Marker>
}

// const mapMarkerStyles = stylex.create({ base: { backgroundColor: "pink" } })
