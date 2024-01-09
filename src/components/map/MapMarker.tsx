import { Marker, AdvancedMarker, Pin } from "@vis.gl/react-google-maps"
// import * as stylex from "@stylexjs/stylex"
import { colors } from "../../assets/styles/tokens.stylex"

export type MapMarkerProps = {
  onClickFn: () => void
  data: restaurantDataType
}

export type restaurantDataType = {
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
  return (
    // <Marker
    //   position={data.position}
    //   title={data.name}
    //   onClick={onClickFn}
    // ></Marker>

    <AdvancedMarker
      position={data.position}
      title={"Oyster"}
      onClick={onClickFn}
    >
      <Pin
        background={"red"}
        borderColor={colors.offwhite}
        glyphColor={colors.pink}
      ></Pin>
    </AdvancedMarker>
  )
}

// const mapMarkerStyles = stylex.create({ base: { backgroundColor: "pink" } })
