import * as stylex from "@stylexjs/stylex"
import oysterData from "../../data/oysterData.json"
// import { extractLatAndLng } from "../../utils/geoHelper"
import { colors } from "../../assets/styles/tokens.stylex"
import { Restaurant } from "../Restaurant"

export const RestaurantListDiv = () => {
  return (
    <div {...stylex.props(restaurantListDivStyles.scrollSide)}>
      <div>
        Restaurant List Div List Restaurant List Div List Restaurant List Div
        List Restaurant List Div List
      </div>
      {oysterData.map((each, index) => {
        // const latLng = extractLatAndLng(each.googleMapLink)
        return <Restaurant data={each} key={index} />
      })}
    </div>
  )
}

const restaurantListDivStyles = stylex.create({
  base: {
    backgroundColor: colors.offwhite,
    width: "100%",
    // height: "100%",
    // flex: "1",
    // overflowY: "scroll",
  },
  scrollSide: {
    backgroundColor: colors.red,
    marginLeft: "45%",
    marginTop: "3rem",
    width: "55%",
    flex: "0",
  },
})
