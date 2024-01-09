import * as stylex from "@stylexjs/stylex"
import oysterData from "../../data/oysterData.json"
import { extractLatAndLng } from "../../utils/geoHelper"

export const RestaurantListDiv = () => {
  return (
    <div {...stylex.props(restaurantListDivStyles.base)}>
      Restaurant List Div List
      {oysterData.map((each, index) => {
        const latLng = extractLatAndLng(each.googleMapLink)
        return (
          <div key={index} {...stylex.props(restaurantListDivStyles.listItem)}>
            {each.name}
            <div>Address: </div>
            <div>LatLng: {latLng}</div>
          </div>
        )
      })}
    </div>
  )
}

const restaurantListDivStyles = stylex.create({
  base: { backgroundColor: "white", width: "100%", height: "100%" },
  listItem: {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
    width: "400px",
  },
})
