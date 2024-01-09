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
      <div {...stylex.props(restaurantStyles.name)}>{data.name}</div>
      <div {...stylex.props(restaurantStyles.address)}> {data.address} </div>
      <div>{data.notes}</div>
    </div>
  )
}

const restaurantStyles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
    backgroundColor: colors.offwhite,
    border: ".2rem solid black",
    borderRadius: "1rem",
    padding: ".5rem",
  },
  name: {
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  address: {
    cursor: "pointer",
  },
})
