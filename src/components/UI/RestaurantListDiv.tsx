import * as stylex from "@stylexjs/stylex"
import oysterData from "../../data/oysterData.json"
// import { extractLatAndLng } from "../../utils/geoHelper"
import { colors } from "../../assets/styles/tokens.stylex"
import { Restaurant } from "../Restaurant"

export const RestaurantListDiv = () => {
  return (
    <div {...stylex.props(restaurantListDivStyles.base)}>
      Restaurant List Div List
      {oysterData.map((each, index) => {
        // const latLng = extractLatAndLng(each.googleMapLink)
        return (
          // <div
          //   key={index}
          //   {...stylex.props(restaurantListDivStyles.listItem)}
          // ></div>
          <Restaurant data={each} key={index} />
        )
      })}
    </div>
  )
}

const restaurantListDivStyles = stylex.create({
  base: {
    backgroundColor: colors.offwhite,
    width: "100%",
    height: "100%",
    // flex: "1",
    // overflowY: "scroll",
  },
})
