import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"

import { CustomButton } from "../UI/CustomButton"
import { colors } from "../../assets/styles/tokens.stylex"
import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { FormInput } from "../UI/FormInput"
import { CustomText } from "../UI/CustomText"

import { SuggestionDropDown } from "../UI/SuggestionDropDown"

type NewPlaceFormProps = {
  cancelFn: () => void
}

export type enterdFormDataType = {
  name: string
  restaurantLink: string
  googleMapLink: string
  phone: string
  address: string
  // deal: string
  note: string
}

export const NewPlaceForm = ({ cancelFn }: NewPlaceFormProps) => {
  const [enteredFormData, setEnteredFormData] = useState<enterdFormDataType>({
    name: "",
    restaurantLink: "",
    googleMapLink: "",
    phone: "",
    address: "",
    // deal: "",
    note: "",
  })

  // const handleInputChange = (element: React.ChangeEvent<HTMLInputElement>) => {
  const handleInputChange = (value: string, id: string) => {
    console.log("IN THE HANDLE INPUT CHANGE: ", value, enteredFormData)

    setEnteredFormData({
      ...enteredFormData,
      [id]: value,
    })

    console.log("IN THE HANDLE INPUT CHANGE AFTER: ", value, enteredFormData)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
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
    // handleInputChange(restaurantName, "name")
    setEnteredFormData({ ...enteredFormData, name: restaurantName })
    console.log("Entered from data 1 : ", enteredFormData)

    setValue(value, false)
    clearSuggestions()
    const results = await getGeocode({ address: value })

    //change the address when you pick the restaurant
    handleInputChange(results[0].formatted_address, "address")

    const { lat, lng } = await getLatLng(results[0])

    console.log("WHat is results: ", results, lat, lng)
    console.log("Entered from data 2 : ", enteredFormData)

    // const placeID = results[0].place_id
    // const parameter = {
    //   placeId: placeID,
    //   fields: ["name"],
    // }
    // const detailResults = await getDetails(parameter)
    // console.log("Detail requests: ", detailResults)
  }

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
              enteredFormData.name.length == 0 ? value : enteredFormData.name
            }
            id="name"
            onChange={(event) => {
              setValue(event.target.value)
              // handleInputChange(event.target.value, "name")
            }}
            disabled={!ready}
            placeholder="Restaurant Name"
            autoComplete="off"
          ></input>

          {status === "OK" && data.length > 0 && (
            <SuggestionDropDown
              data={data}
              onSelectFn={(option: string) => {
                handleSelectRestaurant(option)
              }}
            />
          )}
        </div>

        <div {...stylex.props(newPlaceFormStyles.inputDiv)}>
          <label {...stylex.props(newPlaceFormStyles.label)}>Address</label>
          <input
            {...stylex.props(newPlaceFormStyles.input)}
            value={enteredFormData.address}
            id="address"
            onChange={(event) => {
              handleInputChange(event.target.value, "address")
            }}
            placeholder="Address"
            autoComplete="off"
          ></input>
        </div>

        {/* <FormInput
          label="Dollar Deal"
          type="text"
          value={enteredFormData.note}
          handleInputChangeFn={handleInputChange}
          id="note"
          placeholder="Dollar Oyster weekdays from 5pm to 11pm"
        />

        <FormInput
          label="Google Map Link"
          type="text"
          value={enteredFormData.googleMapLink}
          handleInputChangeFn={handleInputChange}
          id="googleMapLink"
          placeholder="www.googlemap.com ...."
        />
        <FormInput
          label="Restaurant Link"
          type="text"
          value={enteredFormData.restaurantLink}
          handleInputChangeFn={handleInputChange}
          id="restaurantLink"
          placeholder="www.restaurant.com ...."
        />
        <FormInput
          label="Phone"
          type="text"
          value={enteredFormData.phone}
          handleInputChangeFn={handleInputChange}
          id="phone"
          placeholder="617..."
        />
        <FormInput
          label="Address"
          type="text"
          value={enteredFormData.address}
          handleInputChangeFn={handleInputChange}
          id="address"
          placeholder="99 Harvard st ... "
        /> */}
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
    backgroundColor: colors.green,
    marginLeft: "2.5rem",
    marginRight: "2.5rem",
    padding: "1.5rem",
    // border: "1px black solid",
    borderRadius: "1rem",
    boxShadow: "1rem",
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
})
