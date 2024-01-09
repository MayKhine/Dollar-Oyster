import { restaurantDataType } from "./map/MapMarker"
import * as stylex from "@stylexjs/stylex"
import { colors } from "../assets/styles/tokens.stylex"

type RestaurantProps = {
  data: restaurantDataType
}

export const Restaurant = ({ data }: RestaurantProps) => {
  console.log("RESTAURANT: ", data)
  return (
    <div {...stylex.props(restaurantStyles.base)}>
      {data.name}
      <div>Address: {data.address} </div>
      <div>Notes: {data.notes}</div>
    </div>
  )
}

const restaurantStyles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    // paddingBottom: "1rem",
    // flexGrow: "1",
    // width: "100%",
    // width: "50vw",
    margin: "0",
    marginBottom: "1rem",

    backgroundColor: colors.pink,
  },
})
