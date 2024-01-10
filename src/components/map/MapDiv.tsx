import * as stylex from "@stylexjs/stylex"
import { colors } from "../../assets/styles/tokens.stylex"
import { GoogleMap } from "./GoogleMap"
import { CustomButton } from "../UI/CustomButton"
import { useState } from "react"
import { NewPlaceForm } from "../form/NewPlaceForm"

export const MapDiv = () => {
  const [addNewPlace, setAddNewPlace] = useState(false)
  return (
    <div {...stylex.props(MapDivStyles.fixedSide)}>
      {!addNewPlace && (
        <CustomButton
          text={"Add a new location"}
          bgColor={colors.pink}
          fontSize="1.3rem"
          padding=".5rem"
          onClickFn={() => {
            console.log("WORK ON ADDING A NEW LOCATION")
            setAddNewPlace(!addNewPlace)
          }}
        />
      )}
      {addNewPlace && (
        <NewPlaceForm
          cancelFn={() => {
            setAddNewPlace(!addNewPlace)
          }}
        />
      )}

      {!addNewPlace && (
        <div {...stylex.props(MapDivStyles.map)}>
          <GoogleMap />
        </div>
      )}
    </div>
  )
}

const MapDivStyles = stylex.create({
  fixedSide: {
    width: "45%",
    height: "100%",
    position: "fixed",
    top: "5rem",
    flex: "0",
  },

  map: {
    padding: "2rem",
    // backgroundColor: "red",
  },
})
