import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"

import { DateTime } from "luxon"
import { CustomButton } from "../UI/CustomButton"
import { colors } from "../../assets/styles/tokens.stylex"
import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { FormInput } from "../UI/FormInput"
import { CustomText } from "../UI/CustomText"

import { SuggestionDropDown } from "../UI/SuggestionDropDown"
import { positionType } from "../map/MapMarker"

type NewPlaceFormProps = {
  cancelFn: () => void
  mapPosition: positionType
  setMapPosition: (position: positionType) => void
  setZoom: (zoom: number) => void
}

export type enterdFormDataType = {
  restaurantName: string
  restaurantLink: string
  googleMapLink: string
  address: string
  note: string
  deal: dollarDealType
}

type dollarDealType = {
  days: Array<string>
  from?: DateTime
  to?: DateTime
}
export const NewPlaceForm = ({
  cancelFn,
  mapPosition,
  setMapPosition,
  setZoom,
}: NewPlaceFormProps) => {
  const [timeSelect, setTimeSelect] = useState("")
  const [dealTimes, setDealTimes] = useState({ from: "", to: "" })

  const [enteredFormData, setEnteredFormData] = useState<enterdFormDataType>({
    restaurantName: "",
    restaurantLink: "",
    googleMapLink: "",
    address: "",
    note: "",
    deal: { days: [""] },
  })

  const handleInputChange = (value: string, id: string) => {
    setEnteredFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const boston = { lat: 42.36, lng: -71.1 }
    setMapPosition(boston)

    console.log("Handle Form Submit: what is in form data", enteredFormData)
  }

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelectRestaurant = async (value: string) => {
    const restaurantName = value.split(",")[0]

    setValue(restaurantName, false)
    clearSuggestions()
    const results = await getGeocode({ address: value })

    //change the address when you pick the restaurant
    handleInputChange(restaurantName, "restaurantName")
    handleInputChange(results[0].formatted_address, "address")

    const { lat, lng } = await getLatLng(results[0])
    setMapPosition({ lat: lat, lng: lng })
    setZoom(20)
  }

  const generateTimeOptions = () => {
    const start = DateTime.local().set({ hour: 7, minute: 0 })
    const end = DateTime.local().set({ hour: 12, minute: 59 })
    const afterMidNight = DateTime.local().set({ hour: 3, minute: 0 })
    const timeOptions = []

    let current = start

    while (current <= end) {
      timeOptions.push(current.toFormat("hh:mm a"))

      current = current.plus({ minutes: 30 })
    }

    //reset current
    current = DateTime.local().set({ hour: 0, minute: 0 })
    while (current <= afterMidNight) {
      timeOptions.push(current.toFormat("hh:mm a"))

      current = current.plus({ minutes: 15 })
    }

    return timeOptions
  }

  const timeOptions = generateTimeOptions()
  const restaurantData = data.map((e) => e.description)
  return (
    <div {...stylex.props(newPlaceFormStyles.base)}>
      <div {...stylex.props(newPlaceFormStyles.title)}>
        <CustomText
          text="New Dollar Oyster Deal"
          fontSize="1.4rem"
          fontWeight={900}
          color={colors.darkBlue}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div {...stylex.props(newPlaceFormStyles.inputDiv)}>
          <label {...stylex.props(newPlaceFormStyles.label)}>Name</label>
          <input
            {...stylex.props(newPlaceFormStyles.input)}
            value={
              // enteredFormData.restaurantName.length == 0
              //   ? value
              //   : enteredFormData.restaurantName
              value
            }
            id="name"
            onChange={(event) => {
              setValue(event.target.value)
              handleInputChange("", "restaurantName")

              handleInputChange("", "address")
            }}
            disabled={!ready}
            placeholder="Restaurant Name"
            autoComplete="off"
          ></input>

          {status === "OK" && data.length > 0 && (
            <SuggestionDropDown
              data={restaurantData}
              onSelectFn={(option: string) => {
                handleSelectRestaurant(option)
              }}
            />
          )}
        </div>

        <div {...stylex.props(newPlaceFormStyles.inputDiv)}>
          <label {...stylex.props(newPlaceFormStyles.label)}>Address</label>
          <div {...stylex.props(newPlaceFormStyles.inputGray)}>
            {enteredFormData.address}
          </div>
        </div>
        <FormInput
          label="Restaurant Link"
          type="text"
          value={enteredFormData.restaurantLink}
          handleInputChangeFn={(event) => {
            handleInputChange(event.target.value, "restaurantLink")
          }}
          id="restaurantLink"
          placeholder="www.restaurant.com ...."
        />

        <div {...stylex.props(newPlaceFormStyles.inputDiv)}>
          <label {...stylex.props(newPlaceFormStyles.label)}>Dollar Deal</label>
          <div {...stylex.props(newPlaceFormStyles.deals)}>
            <div {...stylex.props(newPlaceFormStyles.day)}> Mon </div>
            <div {...stylex.props(newPlaceFormStyles.day)}> Tue </div>
            <div {...stylex.props(newPlaceFormStyles.day)}> Wed </div>
            <div {...stylex.props(newPlaceFormStyles.day)}>Thu </div>
            <div {...stylex.props(newPlaceFormStyles.day)}> Fri </div>
            <div {...stylex.props(newPlaceFormStyles.day)}> Sat </div>
            <div {...stylex.props(newPlaceFormStyles.day)}> Sun </div>
          </div>
          <div>
            <label>From</label>
            {/* <select
              {...stylex.props(newPlaceFormStyles.select)}
              value="test"
              onClick={() => {
                console.log("what is time select", timeSelect)
                setTimeSelect("from")
              }}
            >
              <option value="0">Time</option>
            </select> */}

            <input
              {...stylex.props(newPlaceFormStyles.select)}
              onClick={() => {
                console.log("what is time select", timeSelect)
                setTimeSelect("from")
              }}
              value={dealTimes.from}
              type="text"
              placeholder="5:00pm"
              onChange={() => {
                console.log("On Change")
              }}
            ></input>
            {timeSelect == "from" && (
              <SuggestionDropDown
                data={timeOptions}
                onSelectFn={(event) => {
                  console.log("select: ", event)
                  setDealTimes((prevVal) => ({
                    ...prevVal,
                    ["from"]: event,
                  }))
                  setTimeSelect("")
                }}
                type="time"
              />
            )}
          </div>
        </div>
      </form>
      <div {...stylex.props(newPlaceFormStyles.buttonsDiv)}>
        <CustomButton
          text="Cancel"
          bgColor={colors.darkBlue}
          color={colors.offwhite}
          fontSize="1rem"
          padding=".5rem"
          onClickFn={cancelFn}
        />
        <CustomButton
          text="Add"
          bgColor={colors.darkBlue}
          color={colors.offwhite}
          fontSize="1rem"
          padding=".5rem"
          type="submit"
          onClickWithEventFn={handleSubmit}
        />
      </div>
    </div>
  )
}

const newPlaceFormStyles = stylex.create({
  base: {
    // backgroundColor: colors.offwhite2,
    backgroundColor: colors.lightBlue,
    marginLeft: "2.5rem",
    marginRight: "2.5rem",
    padding: "1.5rem",
    // border: "1px black solid",
    // borderRadius: "1rem",
    boxShadow: "1rem",
    height: "60%",
  },
  title: { display: "flex", justifyContent: "center", marginBottom: "1rem" },

  buttonsDiv: {
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-end",
    paddingRight: "1rem",
  },

  inputDiv: {
    // backgroundColor: colors.offwhite,
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingBottom: "1rem",
    // padding: ".5rem",
    display: "flex",
    flexDirection: "column",
    marginBottom: ".5rem",
  },
  label: {
    fontWeight: "500",
    fontSize: "1rem",
    color: colors.darkBlue,
    // backgroundColor: colors.blue,
  },
  input: {
    height: "1..5rem",
    fontWeight: 300,
    fontSize: "1.1rem",
    marginTop: ".5rem",
    padding: ".5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    // color: "gray",
    "::placeholder": { color: "lightgray" },
    border: "0px",
    backgroundColor: colors.offwhite,
    borderRadius: ".5rem",
  },
  inputGray: {
    height: "1.5rem",
    fontWeight: 300,
    fontSize: "1.1rem",
    marginTop: ".5rem",
    padding: ".5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    // color: "gray",
    "::placeholder": { color: "lightgray" },
    border: "0px",
    backgroundColor: "#DFDFDF",
    borderRadius: ".5rem",
  },
  deals: { display: "flex" },

  day: {
    backgroundColor: colors.offwhite,
    width: "3rem",
    margin: ".1rem",
  },
  select: {
    width: "6rem",
    height: "1.5rem",
    fontSize: "1rem",
  },
})
