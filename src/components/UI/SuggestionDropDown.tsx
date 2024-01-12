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
    border: ".1rem solid black",
    overFlowY: "scroll",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  option: {
    backgroundColor: {
      default: "white",
      ":hover": "lightgray",
    },
    padding: ".2rem",
  },
  dynamicOptions: (type) => ({
    width: type == "time" ? "5rem" : "100%",
  }),
})
