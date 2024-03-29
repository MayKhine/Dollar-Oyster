import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DateTime } from "luxon"
import { CustomButton } from "../UI/CustomButton"
import { colors } from "../../assets/styles/tokens.stylex"
import * as stylex from "@stylexjs/stylex"
import { useEffect, useState } from "react"
import { FormInput } from "../UI/FormInput"
import { CustomText } from "../UI/CustomText"

import { SuggestionDropDown } from "../UI/SuggestionDropDown"
import { positionType } from "../map/MapMarker"
import { ErrorText } from "../UI/ErrorText"
import { addPlace } from "../../api/databaseFunc"
import { useMap } from "@vis.gl/react-google-maps"
// import { OverlayModal } from "../UI/OverlayModal"

type setAddNewPlaceSuccessProps = {
  success: boolean
  name: string
}
type NewPlaceFormProps = {
  cancelFn: () => void
  mapPosition: positionType
  setMapPosition: (position: positionType) => void
  setZoom: (zoom: number) => void
  setAddNewPlaceSuccess: ({ success, name }: setAddNewPlaceSuccessProps) => void
}

export type enterdFormDataType = {
  name: string
  link: string
  lat: number
  lng: number
  address: string
  notes: string
  days: Array<number>
  from: string
  to: string
}

// type dollarDealType = {
//   days: Array<number>
//   from: string
//   to: string
// }

export const NewPlaceForm = ({
  cancelFn,
  // mapPosition,
  // setMapPosition,
  // setZoom,
  setAddNewPlaceSuccess,
}: NewPlaceFormProps) => {
  const boston = { lat: 42.36, lng: -71.1 }
  const [position, setPosition] = useState(boston)
  const [zoom, setZoom] = useState(12)

  const queryClient = useQueryClient()

  const addPlaceMutation = useMutation({
    mutationFn: addPlace,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["places"] })
      console.log("What is data: ", data)
      if (data.success === false) {
        setEnteredFormError((prevVal) => ({
          ...prevVal,
          ["name"]: "Restaurant already exists in the list.",
        }))
      } else {
        setAddNewPlaceSuccess({ success: true, name: enteredFormData.name })
        handleCancel()
      }
    },
  })

  // const checkIfPlaceExists = useMutation({
  //   mutationFn: checkPlace,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["places"] })
  //   },
  // })

  const [timeSelect, setTimeSelect] = useState("")
  const [enteredFormError, setEnteredFormError] = useState({
    name: "",
    days: "",
    from: "",
    to: "",
  })
  // const [overlay, setOverlay] = useState(false)
  const [enteredFormData, setEnteredFormData] = useState<enterdFormDataType>({
    name: "",
    link: "",
    lat: 0,
    lng: 0,
    // googleMapLink: "",
    address: "",
    notes: "",
    days: [0, 0, 0, 0, 0, 0, 0],
    from: "",
    to: "",
  })

  const handleInputChange = (
    value: string | number,
    id: string,
    index?: number
  ) => {
    // console.log("Handle Input Change value: ", value, "id: ", id)

    // deal: days
    if (id == "days" && index != undefined) {
      // const currentDeal = enteredFormData["deal"]
      const currentDays = enteredFormData["days"]

      if (currentDays[index] == 1) {
        currentDays[index] = 0
        setEnteredFormData((prevData) => ({
          ...prevData,
          ["days"]: currentDays,
        }))
      } else {
        currentDays[index] = 1
        setEnteredFormData((prevData) => ({
          ...prevData,
          ["days"]: currentDays,
        }))
      }
    } else {
      setEnteredFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }))
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    //check name is not empty and address is not empty
    // days are not empty and date is not empty
    let totalDealDays = 0
    enteredFormData.days.map((day) => {
      totalDealDays += day
    })

    if (
      enteredFormData.name.length == 0 ||
      enteredFormData.address.length == 0
    ) {
      setEnteredFormError((prevVal) => ({
        ...prevVal,
        ["name"]: "Restaurant name cannot be empty.",
      }))
    }

    // checkIfPlaceExists.mutate({
    //   name: enteredFormData.name,
    //   address: enteredFormData.address,
    // })

    //check deal days are selected
    if (totalDealDays == 0) {
      setEnteredFormError((prevVal) => ({
        ...prevVal,
        ["days"]: "Deal days need to be selected.",
      }))
    }

    //check tiimes are selected
    if (enteredFormData.from.length == 0) {
      setEnteredFormError((prevVal) => ({
        ...prevVal,
        ["from"]: "Starting time needs to be selected",
      }))
    }

    if (enteredFormData.to.length == 0) {
      setEnteredFormError((prevVal) => ({
        ...prevVal,
        ["to"]: "Ending time needs to be selected",
      }))
    }

    // const fromTime: DateTime | string = enteredFormData.from
    // const toTime: DateTime | string = enteredFormData.to
    // if (
    //   enteredFormData.from.length != 0 &&
    //   enteredFormData.to.length != 0 &&
    //   toTime <= fromTime
    // ) {
    //   setEnteredFormError((prevVal) => ({
    //     ...prevVal,
    //     ["to"]: "Ending time needs to be after the starting time",
    //   }))
    // }

    //if there's not error and eveyrhting is good
    if (
      enteredFormError.name.length == 0 &&
      enteredFormError.days.length == 0 &&
      enteredFormError.from.length == 0 &&
      enteredFormError.to.length == 0 &&
      //check name, total deal days, from and to
      enteredFormData.name.length > 0 &&
      totalDealDays > 0 &&
      enteredFormData.from.length > 0 &&
      enteredFormData.to.length > 0
      // fromTime < toTime
    ) {
      console.log("PROCEED with data submission", enteredFormData)
      //send data to backend
      //pop up a notification and disapear it
      addPlaceMutation.mutate(enteredFormData)
      // console.log("Mutation info ", addPlaceMutation)

      // setOverlay(true)
    }
  }

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelectRestaurant = async (value: string) => {
    const name = value.split(",")[0]

    setValue(name, false)
    clearSuggestions()
    const results = await getGeocode({ address: value })

    //change the address when you pick the restaurant
    handleInputChange(name, "name")
    handleInputChange(results[0].formatted_address, "address")

    const { lat, lng } = getLatLng(results[0])
    // handleInputChange(lat.toString(), "lat")
    // handleInputChange(lng.toString(), "lng")
    handleInputChange(lat, "lat")
    handleInputChange(lng, "lng")
    setPosition({ lat: lat, lng: lng })
    setZoom(18)
  }

  // const generateTimeOptions = () => {
  //   const start = DateTime.local().set({ hour: 9, minute: 0 })
  //   const end = DateTime.local().set({ hour: 23, minute: 59 })
  //   const afterMidNight = DateTime.local().set({ hour: 3, minute: 0 })
  //   const timeOptions = []

  //   let current = start

  //   while (current <= end) {
  //     timeOptions.push(current.toFormat("hh:mm a"))

  //     current = current.plus({ minutes: 30 })
  //   }

  //   // console.log("CXurrent timeoptiosn: ", current, timeOptions)
  //   //reset current
  //   current = DateTime.local().set({ hour: 0, minute: 0 })
  //   while (current <= afterMidNight) {
  //     timeOptions.push(current.toFormat("hh:mm a"))

  //     current = current.plus({ minutes: 15 })
  //   }

  //   return timeOptions
  // }

  const generateTimeOptions = () => {
    const start = DateTime.local().set({ hour: 9, minute: 0 })
    const end = DateTime.local().set({ hour: 23, minute: 59 })
    const afterMidNight = DateTime.local().set({ hour: 3, minute: 0 })
    const timeOptions = []

    let current = start

    while (current <= end) {
      timeOptions.push(current.toFormat("hh:mm a"))

      current = current.plus({ minutes: 30 })
    }

    // console.log("CXurrent timeoptiosn: ", current, timeOptions)
    //reset current
    current = DateTime.local().set({ hour: 0, minute: 0 })
    while (current <= afterMidNight) {
      timeOptions.push(current.toFormat("hh:mm a"))

      current = current.plus({ minutes: 30 })
    }

    return timeOptions
  }

  const timeOptions = generateTimeOptions()
  const restaurantData = data.map((e) => e.description)

  const map = useMap()
  useEffect(() => {
    if (!map) return
    map.panTo(position)
    map.setZoom(zoom)
  }, [map, position, zoom])

  const handleCancel = () => {
    map?.panTo(boston)
    map?.setZoom(12)
    cancelFn()
  }
  return (
    <div {...stylex.props(newPlaceFormStyles.base)}>
      <div {...stylex.props(newPlaceFormStyles.title)}>
        <CustomText
          text="New Dollar Oyster Deal"
          fontSize="1.4rem"
          fontWeight={900}
          color={colors.darkBlue}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div {...stylex.props(newPlaceFormStyles.inputDiv)}>
          <label {...stylex.props(newPlaceFormStyles.label)}>Name</label>

          <div>
            <input
              {...stylex.props(newPlaceFormStyles.input)}
              value={value}
              id="name"
              onChange={(event) => {
                setValue(event.target.value)
                handleInputChange("", "name")

                handleInputChange("", "address")
                setEnteredFormError((prevVal) => ({
                  ...prevVal,
                  ["name"]: "",
                }))
              }}
              disabled={!ready}
              placeholder="Restaurant Name"
              autoComplete="off"
            ></input>
            {status === "OK" && data.length > 0 && (
              <SuggestionDropDown
                data={restaurantData}
                onSelectFn={(option: string) => {
                  handleSelectRestaurant(option)
                }}
              />
            )}
          </div>
          {enteredFormError.name.length > 0 && (
            <ErrorText text={enteredFormError.name} />
          )}
        </div>

        <div {...stylex.props(newPlaceFormStyles.inputDiv)}>
          <label {...stylex.props(newPlaceFormStyles.label)}>Address</label>
          <div {...stylex.props(newPlaceFormStyles.inputGray)}>
            {enteredFormData.address}
          </div>
        </div>
        <FormInput
          label="Restaurant Link"
          type="text"
          value={enteredFormData.link}
          handleInputChangeFn={(event) => {
            handleInputChange(event.target.value, "link")
          }}
          id="link"
          placeholder="www.restaurant.com ...."
        />

        <div {...stylex.props(newPlaceFormStyles.inputDiv)}>
          <label {...stylex.props(newPlaceFormStyles.label)}>Dollar Deal</label>
          <div
            {...stylex.props(newPlaceFormStyles.dealdays)}
            onClick={() => {
              setEnteredFormError((prevVal) => ({
                ...prevVal,
                ["days"]: "",
              }))
            }}
          >
            <div
              {...stylex.props(
                newPlaceFormStyles.day,
                newPlaceFormStyles.dynamicBg(enteredFormData["days"][0])
              )}
              onClick={() => {
                handleInputChange("deal", "days", 0)
              }}
            >
              Mon
            </div>

            <div
              {...stylex.props(
                newPlaceFormStyles.day,
                newPlaceFormStyles.dynamicBg(enteredFormData["days"][1])
              )}
              onClick={() => {
                handleInputChange("deal", "days", 1)
              }}
            >
              Tue
            </div>
            <div
              {...stylex.props(
                newPlaceFormStyles.day,
                newPlaceFormStyles.dynamicBg(enteredFormData["days"][2])
              )}
              onClick={() => {
                handleInputChange("deal", "days", 2)
              }}
            >
              Wed
            </div>
            <div
              {...stylex.props(
                newPlaceFormStyles.day,
                newPlaceFormStyles.dynamicBg(enteredFormData["days"][3])
              )}
              onClick={() => {
                handleInputChange("deal", "days", 3)
              }}
            >
              Thu
            </div>
            <div
              {...stylex.props(
                newPlaceFormStyles.day,
                newPlaceFormStyles.dynamicBg(enteredFormData["days"][4])
              )}
              onClick={() => {
                handleInputChange("deal", "days", 4)
              }}
            >
              Fri
            </div>
            <div
              {...stylex.props(
                newPlaceFormStyles.day,
                newPlaceFormStyles.dynamicBg(enteredFormData["days"][5])
              )}
              onClick={() => {
                handleInputChange("deal", "days", 5)
              }}
            >
              Sat
            </div>
            <div
              {...stylex.props(
                newPlaceFormStyles.day,
                newPlaceFormStyles.dynamicBg(enteredFormData["days"][6])
              )}
              onClick={() => {
                handleInputChange("deal", "days", 6)
              }}
            >
              Sun
            </div>
          </div>
          {enteredFormError.days.length > 0 && (
            <ErrorText text={enteredFormError.days} />
          )}
          <div {...stylex.props(newPlaceFormStyles.dealdays)}>
            <div {...stylex.props(newPlaceFormStyles.label)}>
              <label>From</label>

              <div>
                <input
                  {...stylex.props(
                    newPlaceFormStyles.input,
                    newPlaceFormStyles.selectTime
                  )}
                  onClick={() => {
                    setTimeSelect("from")
                  }}
                  value={enteredFormData.from}
                  type="text"
                  placeholder="5:00pm"
                  onChange={() => {
                    console.log("On Change")
                  }}
                ></input>
                {timeSelect == "from" && (
                  <SuggestionDropDown
                    data={timeOptions}
                    onSelectFn={(event) => {
                      handleInputChange(event, "from")
                      setEnteredFormError((prevVal) => ({
                        ...prevVal,
                        ["from"]: "",
                      }))

                      setTimeSelect("")
                    }}
                    width="8rem"
                  />
                )}

                {enteredFormError.from.length > 0 && (
                  <ErrorText text={enteredFormError.from} />
                )}
              </div>
            </div>
            <div
              {...stylex.props(
                newPlaceFormStyles.label,
                newPlaceFormStyles.timeLabel
              )}
            >
              <label>To</label>

              <div>
                <input
                  {...stylex.props(
                    newPlaceFormStyles.input,
                    newPlaceFormStyles.selectTime
                  )}
                  onClick={() => {
                    console.log("what is time select", timeSelect)
                    setTimeSelect("to")
                  }}
                  value={enteredFormData.to}
                  type="text"
                  placeholder="5:00pm"
                  onChange={() => {
                    console.log("On Change")
                  }}
                ></input>
                {timeSelect == "to" && enteredFormData.from.length > 0 && (
                  <SuggestionDropDown
                    data={timeOptions.slice(
                      timeOptions.indexOf(enteredFormData.from) + 1
                    )}
                    onSelectFn={(event) => {
                      handleInputChange(event, "to")

                      setEnteredFormError((prevVal) => ({
                        ...prevVal,
                        ["to"]: "",
                      }))
                      setTimeSelect("")
                    }}
                    width="8rem"
                  />
                )}
                {enteredFormError.to.length > 0 && (
                  <ErrorText text={enteredFormError.to} />
                )}
              </div>
            </div>
          </div>
        </div>

        <FormInput
          label="Notes"
          type="text"
          value={enteredFormData.notes}
          handleInputChangeFn={(event) => {
            handleInputChange(event.target.value, "notes")
          }}
          id="notes"
          placeholder="This is my new fav place to go for oyster and wine ..."
        />
      </form>
      <div {...stylex.props(newPlaceFormStyles.buttonsDiv)}>
        <CustomButton
          text="Cancel"
          bgColor={colors.darkBlue}
          color={colors.offwhite}
          fontSize="1rem"
          padding=".5rem"
          onClickFn={handleCancel}
        />
        <CustomButton
          text="Add"
          bgColor={colors.darkBlue}
          color={colors.offwhite}
          fontSize="1rem"
          padding=".5rem"
          type="submit"
          onClickWithEventFn={handleSubmit}
        />
      </div>
    </div>
  )
}

const newPlaceFormStyles = stylex.create({
  base: {
    backgroundColor: colors.lightBlue,
    // margin: "2rem",
    margin: "5%",
    // padding: "1rem",
    padding: "5%",
    border: `.2rem ${colors.darkBlue} solid`,
    borderRadius: "1rem",
    boxShadow: "1rem",
    height: "60%",
  },
  title: { display: "flex", justifyContent: "center", marginBottom: "1rem" },

  buttonsDiv: {
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-end",
    paddingRight: "1rem",
  },

  inputDiv: {
    // backgroundColor: colors.offwhite,
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingBottom: "1rem",
    // padding: ".5rem",
    display: "flex",
    flexDirection: "column",
    marginBottom: ".5rem",
  },
  label: {
    fontWeight: "500",
    fontSize: "1rem",
    color: colors.darkBlue,
    // backgroundColor: colors.blue,
  },
  input: {
    height: "1..5rem",
    fontWeight: 300,
    fontSize: "1.1rem",
    marginTop: ".5rem",
    padding: ".5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    // color: "gray",
    "::placeholder": { color: "lightgray" },
    border: "0px",
    backgroundColor: colors.offwhite,
    borderRadius: ".5rem",
  },
  inputGray: {
    height: "1.5rem",
    fontWeight: 300,
    fontSize: "1.1rem",
    marginTop: ".5rem",
    padding: ".5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    // color: "gray",
    "::placeholder": { color: "lightgray" },
    border: "0px",
    backgroundColor: "#DFDFDF",
    borderRadius: ".5rem",
  },
  dealdays: { display: "flex", marginTop: ".5rem" },
  dayLabel: {
    width: "3rem",
    marginLeft: "3.1rem",
  },
  day: {
    width: "3rem",
    fontSize: "1.1rem",

    padding: ".5rem",
    margin: ".1rem",
    height: "1.5rem",
    display: "flex",
    justifyContent: "center",
    marginRight: ".7rem",
    borderRadius: ".3rem",
    cursor: "pointer",
  },
  timeLabel: { marginLeft: "3rem" },
  selectTime: {
    width: "7rem",
    height: "1.5rem",
    fontSize: "1.1rem",
    borderRadius: ".3rem",
    // padding: ".2rem",
    // fontWeight: 300,
    // fontSize: "1.1rem",
    // marginTop: ".5rem",
    padding: ".5rem",
  },
  dynamicBg: (selected) => ({
    backgroundColor: selected == 0 ? colors.offwhite : colors.darkBlue,
    color: selected == 0 ? colors.darkBlue : colors.offwhite,

    // border: selected == 0 ? "1px white solid" : "1px gray solid",
  }),
})
