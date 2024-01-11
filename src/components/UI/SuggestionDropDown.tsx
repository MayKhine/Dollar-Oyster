import * as stylex from "@stylexjs/stylex"

type SuggestionDropDownProps = {
  data: Array<google.maps.places.AutocompletePrediction>
  onSelectFn: (selection: string) => void
}

export const SuggestionDropDown = ({
  data,
  onSelectFn,
}: SuggestionDropDownProps) => {
  return (
    <div {...stylex.props(suggestionDropDownStyles.base)}>
      {data.map((option, index) => {
        return (
          <div
            {...stylex.props(suggestionDropDownStyles.option)}
            key={index}
            onClick={() => {
              onSelectFn(option.description)
            }}
          >
            {option.description}
          </div>
        )
      })}
    </div>
  )
}

const suggestionDropDownStyles = stylex.create({
  base: { backgroundColor: "lightgray", border: ".1rem solid black" },
  option: {
    backgroundColor: {
      default: "white",
      ":hover": "lightgray",
    },
    padding: ".2rem",
  },
})
