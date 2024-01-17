import * as stylex from "@stylexjs/stylex"
import { useQuery } from "@tanstack/react-query"
import { DateTime } from "luxon"
import { colors } from "../../assets/styles/tokens.stylex"
import { Restaurant } from "./Restaurant"
import { getPlaces } from "../../api/databaseFunc"
import { positionType, restaurantDataType } from "../map/MapMarker"
import { CustomText } from "../UI/CustomText"
import { useState } from "react"
import { CustomButton } from "../UI/CustomButton"
import { NewPlaceForm } from "../form/NewPlaceForm"

type RestaurantListDivProps = {
  mapPosition: positionType
  setMapPosition: (position: positionType) => void
  setZoom: (zoom: number) => void
}
export const RestaurantListDiv = ({
  mapPosition,
  setMapPosition,
  setZoom,
}: RestaurantListDivProps) => {
  const getPlacesQuery = useQuery({ queryKey: ["places"], queryFn: getPlaces })
  const [addNewPlace, setAddNewPlace] = useState(false)
  const [addNewPlaceSuccess, setAddNewPlaceSuccess] = useState({
    success: false,
    name: "",
  })
  const cancelHandler = () => {
    setAddNewPlace(!addNewPlace)
  }

  const sortTheList = (a, b) => {
    const dateA = DateTime.fromISO(a.date)
    const dateB = DateTime.fromISO(b.date)

    return dateB.toMillis() - dateA.toMillis()
    // return dateA.toMillis() - dateB.toMillis()
  }

  if (getPlacesQuery.isSuccess && getPlacesQuery.data.data?.length) {
    const sortedList = getPlacesQuery.data.data?.sort(sortTheList)
    // console.log("NOT SORTED list: ", getPlacesQuery.data.data)
    // console.log("Sorted list: ", sortedList)
  }

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
      <div>
        {!addNewPlace && (
          <div {...stylex.props(restaurantListDivStyles.addNewLocationDiv)}>
            <CustomButton
              text={"Add a new location"}
              bgColor={colors.darkBlue}
              color={colors.offwhite}
              fontSize="1rem"
              padding=".5rem"
              onClickFn={() => {
                setAddNewPlace(!addNewPlace)
                setAddNewPlaceSuccess({ success: false, name: "" })
              }}
            />
          </div>
        )}
        {!addNewPlace && addNewPlaceSuccess.success && (
          <div {...stylex.props(restaurantListDivStyles.addNewLocationText)}>
            Thank you for adding {addNewPlaceSuccess.name}, a new Dollar Oyster
            place!
          </div>
        )}

        {addNewPlace && (
          <NewPlaceForm
            setAddNewPlaceSuccess={setAddNewPlaceSuccess}
            cancelFn={cancelHandler}
            mapPosition={mapPosition}
            setMapPosition={setMapPosition}
            setZoom={setZoom}
          />
          // <GoogleMapLibLoadForm cancleFn={cancelHandler} />
        )}
      </div>

      {getPlacesQuery.isError && <div> Error </div>}

      {getPlacesQuery.isSuccess && getPlacesQuery.data.data?.length == 0 && (
        <div> No Dollar Oyster Places </div>
      )}

      {getPlacesQuery.isSuccess && getPlacesQuery.data.data?.length > 0 && (
        <div {...stylex.props(restaurantListDivStyles.listDiv)}>
          {getPlacesQuery.data.data
            ?.sort(sortTheList)
            .map((place: restaurantDataType, index: number) => {
              return <Restaurant data={place} key={index} />
            })}
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
  addNewLocationDiv: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "2rem",
    marginTop: "1rem",
  },
  addNewLocationText: {
    paddingLeft: "2rem",
    paddingRight: "2rem",
    color: colors.darkBlue,
    fontSize: "1rem",
    fontWeight: 800,
  },
})
