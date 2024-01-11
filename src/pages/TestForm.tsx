import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"

import { SuggestionDropDown } from "../components/UI/SuggestionDropDown"

export const TestForm = () => {
  const submitHandle = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Submit Handle")
  }

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const selectHandle = async (value: string) => {
    setValue(value, false)
    clearSuggestions()
    const results = await getGeocode({ address: value })
    const { lat, lng } = await getLatLng(results[0])
    console.log("WHat is results: ", results, lat, lng)
  }

  // console.log("WHAT IS STATUS AND DATA", status, data)

  return (
    <div>
      <form onSubmit={submitHandle} autoComplete="off">
        <div>
          <label>Restaurant Name</label>
          <input
            value={value}
            id="restaurantInput"
            onChange={(event) => {
              setValue(event.target.value)
            }}
            disabled={!ready}
            placeholder="Restaurant Name"
            autoComplete="off"
          ></input>

          {status === "OK" && data.length > 0 && (
            <SuggestionDropDown
              data={data}
              onSelectFn={(option: string) => {
                selectHandle(option)
                console.log("This ", option, " is selected")
              }}
            />
          )}
        </div>

        <button type="reset">cancel</button>

        <button type="submit">submit</button>
      </form>
    </div>
  )
}
