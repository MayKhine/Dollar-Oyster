import * as stylex from "@stylexjs/stylex"
import { colors } from "../../assets/styles/tokens.stylex"

type SuggestionDropDownProps = {
  // data: Array<google.maps.places.AutocompletePrediction | string>
  data: Array<string>
  onSelectFn: (selection: string) => void
  width?: string
  fontSize?: string
}

export const SuggestionDropDown = ({
  data,
  onSelectFn,
  width,
  fontSize,
}: SuggestionDropDownProps) => {
  return (
    <div
      {...stylex.props(
        suggestionDropDownStyles.base,
        suggestionDropDownStyles.dynamicOptions(width, fontSize)
      )}
    >
      {data.map((option, index) => {
        return (
          <div
            {...stylex.props(suggestionDropDownStyles.option)}
            key={index}
            onClick={() => {
              onSelectFn(option)
            }}
          >
            {option}
          </div>
        )
      })}
    </div>
  )
}

const suggestionDropDownStyles = stylex.create({
  base: {
    color: colors.darkBlue,
    backgroundColor: "pink",
    border: ".1rem solid black",
    overflowY: "scroll",
    flexDirection: "column",
    fontSize: "1.1rem",
    maxHeight: "10rem",
    // position: "relative",
    position: "absolute",
    zIndex: "1",
    // width: "10rem",
    // width: "100%",
    // maxHeight: "15rem",
    // marginTop: "4.3rem",
  },
  option: {
    backgroundColor: {
      default: "white",
      ":hover": "lightgray",
    },
    padding: ".2rem",
  },
  dynamicOptions: (width, fontSize) => ({
    width: width ? width : "100%",
    // width: "10rem",

    fontSize: fontSize ? fontSize : "1.1rem",
  }),
})
