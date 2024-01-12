import * as stylex from "@stylexjs/stylex"
import { colors } from "../../assets/styles/tokens.stylex"
import { GoogleMap } from "./GoogleMap"
import { CustomButton } from "../UI/CustomButton"
import { useState } from "react"
import { NewPlaceForm } from "../form/NewPlaceForm"

// import { googleMapApiKey } from "../../googleMapConfig"
// import { useLoadScript } from "@react-google-maps/api"

export const MapDiv = () => {
  return (
    // <div {...stylex.props(MapDivStyles.fixedSide)}>
    <div {...stylex.props(MapDivStyles.base)}>
      <div {...stylex.props(MapDivStyles.map)}>
        <GoogleMap />
      </div>
    </div>
  )
}

const MapDivStyles = stylex.create({
  base: {
    width: "45vw",
    // height: "40rem",
    // backgroundColor: "pink",
    marginTop: "5rem",
    flex: "1",
    position: "fixed",
  },

  // fixedSide: {
  //   width: "45%",
  //   height: "100%",
  //   position: "fixed",
  //   top: "7rem",
  //   flex: "0",
  // },

  map: {
    // backgroundColor: "red",
    height: "70vh",
    padding: "2rem",
    paddingLeft: "3rem",
    paddingRight: "3rem",
  },
  centerDiv: {
    display: "flex",
    justifyContent: "center",
  },

  dynamicOption: (addNewPlace) => ({
    position: addNewPlace == false ? "fixed" : null,
  }),
})
