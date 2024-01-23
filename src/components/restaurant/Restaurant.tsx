import { useMutation, useQueryClient } from "@tanstack/react-query"

import { restaurantDataType } from "../map/MapMarker"
import * as stylex from "@stylexjs/stylex"
import { colors } from "../../assets/styles/tokens.stylex"
import love from "../../assets/images/love.png"
import unlove from "../../assets/images/unlove.png"

import comment from "../../assets/images/comment.png"

import { useEffect, useState } from "react"
import { useMap } from "@vis.gl/react-google-maps"
import { commentPlace, lovePlace, unlovePlace } from "../../api/databaseFunc"
import { DateTime } from "luxon"

type RestaurantProps = {
  data: restaurantDataType
  currentDayOfTheWeek: number
  filter: string
  // setZoom: (val: number) => void
}

export const Restaurant = ({
  data,
  currentDayOfTheWeek,
  filter,
}: RestaurantProps) => {
  const boston = { lat: 42.36, lng: -71.1 }
  const [position, setPosition] = useState(boston)
  const [zoom, setZoom] = useState(12)

  // console.log("Now: ", now)

  const isOpenNow = () => {
    const now = DateTime.now().setZone("America/New_York")

    const fromDT = DateTime.fromFormat(data.from, "hh:mm a")
    let toDT = DateTime.fromFormat(data.to, "hh:mm a")
    if (toDT <= DateTime.local().set({ hour: 9, minute: 0 })) {
      //increase the date
      toDT = toDT.plus({ day: 1 })
    }

    if (fromDT <= now && now <= toDT) {
      return true
    }

    return false
  }

  const isOpenToday = () => {
    if (data.days[currentDayOfTheWeek] == 1) {
      return true
    }
    return false
  }

  const map = useMap()
  useEffect(() => {
    if (!map) return
    map.panTo(position)
    map.setZoom(zoom)
  }, [map, position, zoom])

  const queryClient = useQueryClient()
  const lovePlaceMutation = useMutation({
    mutationFn: lovePlace,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["places"] })
      console.log("ON SUCCESS at loveplace MUtation: ", data)
    },
  })

  const unlovePlaceMutation = useMutation({
    mutationFn: unlovePlace,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["places"] })
      console.log("ON SUCCESS at Unloveplace MUtation: ", data)
    },
  })

  const commentPlaceMutation = useMutation({
    mutationFn: commentPlace,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["places"] })
      console.log("ON SUCCESS at Comment MUtation: ", data)
    },
  })

  const handleOnHover = () => {
    setPosition({ lat: data.lat, lng: data.lng })
    setZoom(15)
  }

  const handleOnClickName = () => {
    setPosition({ lat: data.lat, lng: data.lng })
    setZoom(18)
  }

  const handleLoveClick = () => {
    console.log("handle love click ", data.id)
    lovePlaceMutation.mutate(data.id)
  }

  const handleUnloveClick = () => {
    console.log("handle UNLOVE click ", data.id)
    unlovePlaceMutation.mutate(data.id)
  }

  const handleCommentPlaceClick = () => {
    console.log("handle comment place click ", data.id)
    commentPlaceMutation.mutate({
      id: data.id,
      comment: "comment",
      user: "username",
    })
  }

  const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const daysNumArrToDays = () => {
    let result = ""
    for (let i = 0; i <= 6; i++) {
      if (data.days[i] == 1) {
        // result.push(daysOfTheWeek[i] + ",")
        result += daysOfTheWeek[i] + ", "
      }
    }
    return result.slice(0, -2)
  }

  const days = daysNumArrToDays()

  const returnDiv = (
    <div {...stylex.props(restaurantStyles.base)} onMouseOver={handleOnHover}>
      <div {...stylex.props(restaurantStyles.nameAndSvg)}>
        <div
          {...stylex.props(restaurantStyles.name)}
          onClick={handleOnClickName}
        >
          {data.name}
          {/* {data.id} */}
        </div>
      </div>
      <div {...stylex.props(restaurantStyles.address)}> {data.address} </div>
      <div {...stylex.props(restaurantStyles.hoursDiv)}>
        <div>Days: {days}</div>
        <div>
          From {data.from} to {data.to}
        </div>
      </div>
      {data.notes.length > 0 && (
        <div {...stylex.props(restaurantStyles.notes)}>{data.notes}</div>
      )}
      <div {...stylex.props(restaurantStyles.svgDiv)}>
        <div {...stylex.props(restaurantStyles.svgDiv)}>
          <img
            src={love}
            {...stylex.props(restaurantStyles.svg)}
            onClick={handleLoveClick}
          ></img>

          {data.love > 0 && (
            <div {...stylex.props(restaurantStyles.svgText)}>{data.love}</div>
          )}
        </div>
        <div {...stylex.props(restaurantStyles.svgDiv)}>
          <img
            src={unlove}
            {...stylex.props(restaurantStyles.svg)}
            onClick={handleUnloveClick}
          ></img>
          {data.unlove > 0 && (
            <div {...stylex.props(restaurantStyles.svgText)}>{data.unlove}</div>
          )}
        </div>
        <div {...stylex.props(restaurantStyles.svgDiv)}>
          <img
            src={comment}
            {...stylex.props(restaurantStyles.svg)}
            onClick={handleCommentPlaceClick}
          ></img>
          <div {...stylex.props(restaurantStyles.svgText)}>{data.love}</div>
        </div>
      </div>
    </div>
  )

  if (filter == "Open Today" && isOpenToday()) {
    return returnDiv
  } else if (filter == "Open Now" && isOpenToday() && isOpenNow()) {
    return returnDiv
  } else if (filter == "Anytime") {
    return returnDiv
  }
}

const restaurantStyles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    // width: "100%",
    borderBottom: `.1rem solid ${colors.darkBlue}`,
    padding: "2rem",
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    color: colors.darkBlue,
    backgroundColor: {
      default: colors.green,
      ":hover": colors.lightGreen,
    },
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  address: {
    fontSize: "1rem",
    fontWeight: "600",
  },
  notes: {
    paddingTop: "1rem",
    fontSize: "1rem",
    fontWeight: "400",
  },

  svgDiv: {
    marginTop: ".5rem",
    display: "flex",
    marginRight: ".5rem",
  },
  svgText: { alignSelf: "center" },
  svg: {
    height: "1.5rem",
    cursor: "pointer",
    marginRight: ".2rem",
  },
  nameAndSvg: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  hoursDiv: {
    fontSize: "1rem",
    fontWeight: "600",
  },
})
