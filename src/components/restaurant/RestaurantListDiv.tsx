import * as stylex from "@stylexjs/stylex"
import { useQuery } from "@tanstack/react-query"

import { colors } from "../../assets/styles/tokens.stylex"
import { Restaurant } from "./Restaurant"
import { getPlaces } from "../../api/databaseFunc"
import { restaurantDataType } from "../map/MapMarker"
import { CustomText } from "../UI/CustomText"

export const RestaurantListDiv = () => {
  const getPlacesQuery = useQuery({ queryKey: ["places"], queryFn: getPlaces })

  if (getPlacesQuery.isSuccess) {
    console.log("GET PLACES QUERY DATA: ", getPlacesQuery.data)
  }

  return (
    <div {...stylex.props(restaurantListDivStyles.scrollSide)}>
      <CustomText
        text={"Let's go for $1 Oyster around Boston"}
        color={colors.darkblue}
        fontWeight={600}
        bgColor={colors.offwhite}
        fontSize="2rem"
      />

      <CustomText
        text={"Small subtext Small subtext Small subtext"}
        color={colors.darkblue}
        fontWeight={200}
        bgColor={colors.offwhite}
        fontSize="1.3rem"
      />
      {getPlacesQuery.isError && <div> Error </div>}

      {getPlacesQuery.isSuccess && getPlacesQuery.data.data.length == 0 && (
        <div> No Dollar Oyster Places </div>
      )}

      {getPlacesQuery.isSuccess &&
        getPlacesQuery.data.data.length > 0 &&
        getPlacesQuery.data.data.map(
          (place: restaurantDataType, index: number) => {
            return <Restaurant data={place} key={index} />
          }
        )}
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
    backgroundColor: colors.green2,
    marginLeft: "45%",
    marginTop: "5rem",
    width: "55%",
    flex: "0",
  },
})
