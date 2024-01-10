import { stat } from "fs"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import Dropdown from "../components/UI/DropDown"
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

  // console.log("WHAT IS STATUS AND DATA", status, data)

  return (
    <div>
      <form onSubmit={submitHandle}>
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
          ></input>

          {status === "OK" && data.length > 0 && (
            <SuggestionDropDown
              data={data}
              onSelectFn={(option: string) => {
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
