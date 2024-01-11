import * as stylex from "@stylexjs/stylex"
import { colors } from "../../assets/styles/tokens.stylex"
import { GoogleMap } from "./GoogleMap"
import { CustomButton } from "../UI/CustomButton"
import { useState } from "react"
import { NewPlaceForm } from "../form/NewPlaceForm"

// import { googleMapApiKey } from "../../googleMapConfig"
// import { useLoadScript } from "@react-google-maps/api"

export const MapDiv = () => {
  const [addNewPlace, setAddNewPlace] = useState(false)
  const cancelHandler = () => {
    setAddNewPlace(!addNewPlace)
  }
  return (
    <div {...stylex.props(MapDivStyles.fixedSide)}>
      {!addNewPlace && (
        <div {...stylex.props(MapDivStyles.centerDiv)}>
          <CustomButton
            text={"Add a new location"}
            bgColor={colors.darkBlue}
            color={colors.offwhite}
            fontSize="1rem"
            padding=".5rem"
            onClickFn={() => {
              console.log("WORK ON ADDING A NEW LOCATION")
              setAddNewPlace(!addNewPlace)
            }}
          />
        </div>
      )}
      {addNewPlace && (
        <NewPlaceForm cancelFn={cancelHandler} />
        // <GoogleMapLibLoadForm cancleFn={cancelHandler} />
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
    top: "7rem",
    flex: "0",
  },

  map: {
    padding: "2rem",
    paddingLeft: "3rem",
    paddingRight: "3rem",
  },
  centerDiv: {
    display: "flex",
    justifyContent: "center",
  },
})
