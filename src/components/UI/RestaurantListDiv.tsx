import * as stylex from "@stylexjs/stylex"
import oysterData from "../../data/oysterData.json"
import { colors } from "../../assets/styles/tokens.stylex"
import { Restaurant } from "../Restaurant"

export const RestaurantListDiv = () => {
  return (
    <div {...stylex.props(restaurantListDivStyles.scrollSide)}>
      <div>Let's go for $1 Oyster around Boston</div>
      {oysterData.map((each, index) => {
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
    backgroundColor: colors.green,
    marginLeft: "45%",
    marginTop: "3rem",
    width: "55%",
    flex: "0",
  },
})
