import * as stylex from "@stylexjs/stylex"

type SuggestionDropDownProps = {
  // data: Array<google.maps.places.AutocompletePrediction | string>
  data: Array<string>
  onSelectFn: (selection: string) => void
  type?: string
}

export const SuggestionDropDown = ({
  data,
  onSelectFn,
  type,
}: SuggestionDropDownProps) => {
  return (
    <div
      {...stylex.props(
        suggestionDropDownStyles.base,
        suggestionDropDownStyles.dynamicOptions(type)
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
    backgroundColor: "pink",
    border: ".1rem solid black",
    overflowY: "scroll",
    // height: "100%",
    maxHeight: "15rem",
    flexDirection: "column",
    position: "relative",
  },
  option: {
    backgroundColor: {
      default: "white",
      ":hover": "lightgray",
    },
    padding: ".2rem",
  },
  dynamicOptions: (type) => ({
    width: type == "time" ? "8rem" : "100%",
  }),
})
