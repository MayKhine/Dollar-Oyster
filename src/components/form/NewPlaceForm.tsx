import { CustomButton } from "../UI/CustomButton"
import { colors } from "../../assets/styles/tokens.stylex"
import * as styex from "@stylexjs/stylex"
import { useState } from "react"
import { FormInput } from "../UI/FormInput"
import { CustomText } from "../UI/CustomText"

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

  const handleInputChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = element.target

    setEnteredFormData({
      ...enteredFormData,
      [id]: value,
    })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Handle Form Submit: what is in form data", enteredFormData)
  }

  return (
    <div {...styex.props(newPlaceFormStyles.base)}>
      <div {...styex.props(newPlaceFormStyles.title)}>
        <CustomText
          text="New Dollar Oyster Deal"
          fontSize="1.4rem"
          fontWeight={900}
          color={colors.darkBlue}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          value={enteredFormData.name}
          handleInputChangeFn={handleInputChange}
          id="name"
          placeholder="Restaurant name ...."
        />
        <FormInput
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
        />
      </form>
      <div {...styex.props(newPlaceFormStyles.buttonsDiv)}>
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

const newPlaceFormStyles = styex.create({
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
})
