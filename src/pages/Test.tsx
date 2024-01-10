import * as stylex from "@stylexjs/stylex"
import { useLoadScript } from "@react-google-maps/api"
import { googleMapApiKey } from "../googleMapConfig"
import { TestForm } from "./TestForm"

export const Test = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapApiKey,
    libraries: ["places"],
  })

  if (!isLoaded) return <div> LOading </div>

  return (
    // <div>
    //   Google Map
    //   <div {...stylex.props(testStyles.font1)}>Boston Dollar Oyster</div>
    //   <div {...stylex.props(testStyles.font2)}>Boston Dollar Oyster</div>
    //   <div {...stylex.props(testStyles.font3)}>Boston Dollar Oyster</div>
    //   <div {...stylex.props(testStyles.font4)}>Boston Dollar Oyster</div>
    //   <div {...stylex.props(testStyles.font5)}>Boston Dollar Oyster</div>
    //   <div {...stylex.props(testStyles.font6)}>Boston Dollar Oyster</div>
    // </div>

    <TestForm></TestForm>
  )
}

const testStyles = stylex.create({
  font1: {
    fontWeight: 200,
    fontStyle: "italic",
  },
  font2: {
    fontWeight: 300,
  },
  font3: {
    fontWeight: 400,
  },
  font4: {
    fontWeight: 600,
    // fontStyle: "italic",
  },
  font5: {
    fontWeight: 700,
  },
  font6: {
    fontWeight: 900,
  },
})
