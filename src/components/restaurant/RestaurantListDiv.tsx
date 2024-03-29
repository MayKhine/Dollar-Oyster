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
import { SuggestionDropDown } from "../UI/SuggestionDropDown"
import down from "../../assets/images/down.png"

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

  const [clickHandle, setClickHandle] = useState("")
  const [filter, setFilter] = useState("Anytime")
  const [sorting, setSorting] = useState("Name")

  const currentDayOfTheWeek =
    DateTime.now().setZone("America/New_York").weekday - 1 // get the current weekday .weekday 1 Monday - 7 Sunday

  const cancelHandler = () => {
    setAddNewPlace(!addNewPlace)
  }

  // const sortTheList = (a: restaurantDataType, b: restaurantDataType) => {
  //   const dateA = DateTime.fromISO(a.date)
  //   const dateB = DateTime.fromISO(b.date)

  //   return dateB.toMillis() - dateA.toMillis()
  // }

  const sortingTheList = (a: restaurantDataType, b: restaurantDataType) => {
    if (sorting == "New") {
      const dateA = DateTime.fromISO(a.date)
      const dateB = DateTime.fromISO(b.date)

      return dateB.toMillis() - dateA.toMillis()
    }
    if (sorting == "Name") {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
    }

    if (sorting == "Love") {
      const loveA = a.love
      const loveB = b.love

      return loveB - loveA
      // return loveA - loveB
    }

    if (sorting == "Unlove") {
      const unloveA = a.unlove
      const unloveB = b.unlove

      return unloveB - unloveA
    }
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
          // bgColor={colors.offwhite}
          fontSize="1rem"
        />
      </div>

      {!addNewPlace && (
        <div {...stylex.props(restaurantListDivStyles.actionsDiv)}>
          <div>
            <CustomButton
              text={filter}
              img={down}
              // onClickFn={filterButtonHandler}
              onClickFn={() => {
                if (clickHandle == "") {
                  setClickHandle("filter")
                } else {
                  setClickHandle("")
                }
              }}
              bgColor={colors.darkBlue}
              color={colors.offwhite}
              fontSize="1rem"
              padding=".5rem"
              width="9rem"
            />
            {/* {filterClik && ( */}
            {clickHandle == "filter" && (
              <SuggestionDropDown
                data={["Anytime", "Open Today", "Open Now"]}
                fontSize="1rem"
                width="9rem"
                onSelectFn={(event) => {
                  console.log("Filter: ", event)
                  setClickHandle("")
                  setFilter(event)
                }}
              />
            )}
          </div>
          <div>
            <CustomButton
              text={sorting}
              img={down}
              onClickFn={() => {
                if (clickHandle == "") {
                  setClickHandle("sort")
                } else {
                  setClickHandle("")
                }
              }}
              bgColor={colors.darkBlue}
              color={colors.offwhite}
              fontSize="1rem"
              padding=".5rem"
              width="7rem"
            />
            {clickHandle == "sort" && (
              <SuggestionDropDown
                data={["Name", "New", "Love", "Unlove"]}
                fontSize="1rem"
                width="7rem"
                onSelectFn={(event) => {
                  console.log("Sort: ", event)
                  setClickHandle("")
                  setSorting(event)
                }}
              />
            )}
          </div>
          <div>
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
        </div>
      )}

      <div>
        {/* {!addNewPlace && (
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
        )} */}
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
        )}
      </div>

      {getPlacesQuery.isError && <div> Error </div>}

      {getPlacesQuery.isSuccess && getPlacesQuery.data.data?.length == 0 && (
        <div> No Dollar Oyster Places </div>
      )}

      {getPlacesQuery.isSuccess &&
        getPlacesQuery.data.data?.length > 0 &&
        !addNewPlace && (
          <div>
            {getPlacesQuery.data.data
              ?.sort(sortingTheList)
              .map((place: restaurantDataType, index: number) => {
                return (
                  <Restaurant
                    currentDayOfTheWeek={currentDayOfTheWeek}
                    data={place}
                    key={index}
                    filter={filter}
                  />
                )
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
    // width: "100%",
    width: "max-content",
    flex: "1",
    // height: "80vh",
  },

  textDiv: {
    marginTop: "1.5rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },

  addNewLocationDiv: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "2rem",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  addNewLocationText: {
    marginTop: "1rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    color: colors.darkBlue,
    fontSize: "1rem",
    fontWeight: 800,
  },
  filterDiv: {
    paddingLeft: "2rem",
    width: "8rem",
    color: colors.darkBlue,
    // background: "lightpink",
  },
  actionsDiv: {
    display: "flex",
    paddingTop: "1rem",
    paddingLeft: "2rem",
    gap: "1rem",
    paddingBottom: "1rem",
  },
})
