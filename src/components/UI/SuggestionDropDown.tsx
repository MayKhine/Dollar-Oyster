type SuggestionDropDownProps = {
  data: Array<object>
  onSelectFn: (selection: string) => void
}

export const SuggestionDropDown = ({
  data,
  onSelectFn,
}: SuggestionDropDownProps) => {
  return (
    <div>
      {data.map((option, index) => {
        return (
          <div
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
