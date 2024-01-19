import { useMutation, useQueryClient } from "@tanstack/react-query"

import { restaurantDataType } from "../map/MapMarker"
import * as stylex from "@stylexjs/stylex"
import { colors } from "../../assets/styles/tokens.stylex"
import heart from "../../assets/images/heart.svg"
import { useEffect, useState } from "react"
import { useMap } from "@vis.gl/react-google-maps"
import { lovePlace } from "../../api/databaseFunc"

type RestaurantProps = {
  data: restaurantDataType
  // setZoom: (val: number) => void
}

export const Restaurant = ({ data }: RestaurantProps) => {
  const boston = { lat: 42.36, lng: -71.1 }
  const [position, setPosition] = useState(boston)
  const [zoom, setZoom] = useState(12)

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

  console.log("Restaurant data: ", data)
  return (
    <div {...stylex.props(restaurantStyles.base)} onMouseOver={handleOnHover}>
      <div {...stylex.props(restaurantStyles.nameAndSvg)}>
        <div
          {...stylex.props(restaurantStyles.name)}
          onClick={handleOnClickName}
        >
          {data.name}
        </div>
        <div {...stylex.props(restaurantStyles.heartDiv)}>
          <img
            src={heart}
            {...stylex.props(restaurantStyles.heartSvg)}
            onClick={handleLoveClick}
          ></img>
        </div>
      </div>
      {/* <div {...stylex.props(restaurantStyles.name)}>{data.name}</div> */}
      <div {...stylex.props(restaurantStyles.address)}> {data.address} </div>
      <div {...stylex.props(restaurantStyles.notes)}>{data.notes}</div>
    </div>
  )
}

const restaurantStyles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: colors.green,
    // backgroundColor: "rgba(177, 226, 188, .2)",
    // border: `.2rem solid ${colors.green}`,
    // borderRadius: "1rem",

    borderBottom: `.1rem solid ${colors.darkBlue}`,
    padding: "2rem",
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    // margin: "1rem",
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
    fontSize: "1rem",
    fontWeight: "400",
  },
  heartDiv: {
    height: "1.2rem",
    alignSelf: "flex-end",
    paddingRight: ".5rem",
  },
  heartSvg: {
    height: "100%",
    cursor: "pointer",
  },
  nameAndSvg: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
