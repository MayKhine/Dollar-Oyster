import * as stylex from "@stylexjs/stylex"
import { useQuery } from "@tanstack/react-query"

import { colors } from "../../assets/styles/tokens.stylex"
import { Restaurant } from "./Restaurant"
import { getPlaces } from "../../api/databaseFunc"
import { restaurantDataType } from "../map/MapMarker"
import { CustomText } from "../UI/CustomText"

export const RestaurantListDiv = () => {
  const getPlacesQuery = useQuery({ queryKey: ["places"], queryFn: getPlaces })

  return (
    <div {...stylex.props(restaurantListDivStyles.scrollSide)}>
      <div {...stylex.props(restaurantListDivStyles.textDiv)}>
        <CustomText
          text={"Everyday is an oyster!"}
          color={colors.darkBlue}
          fontWeight={600}
          fontSize="2rem"
        />
        <CustomText
          text={
            "Have fun and discover one dollar oyster at a time! Cheers to the simple joys that make life delicious!"
          }
          color={colors.darkBlue}
          fontWeight={400}
          bgColor={colors.offwhite}
          fontSize="1rem"
        />
      </div>

      {getPlacesQuery.isError && <div> Error </div>}

      {getPlacesQuery.isSuccess && getPlacesQuery.data.data.length == 0 && (
        <div> No Dollar Oyster Places </div>
      )}

      {getPlacesQuery.isSuccess && getPlacesQuery.data.data.length > 0 && (
        <div {...stylex.props(restaurantListDivStyles.listDiv)}>
          {getPlacesQuery.data.data.map(
            (place: restaurantDataType, index: number) => {
              return <Restaurant data={place} key={index} />
            }
          )}
        </div>
      )}
    </div>
  )
}

const restaurantListDivStyles = stylex.create({
  scrollSide: {
    backgroundColor: colors.green,
    marginLeft: "45%",
    marginTop: "5rem",
    // width: "55%",

    flex: "1",
    // flex: "0",
  },
  textDiv: {
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
  listDiv: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
})
