import axios from "axios"
import { googleMapApiKey } from "../googleMapConfig"

export const extractLatAndLng = (googleMapsLink: string) => {
  const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/
  const match = googleMapsLink.match(regex)

  if (match) {
    const latitude = parseFloat(match[1])
    const longitude = parseFloat(match[2])
    return [latitude, longitude]
  } else {
    return [0]
  }
}

export const getReverseGeocode = async (lat: number, lng: number) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapApiKey}`
    )

    if (response.data.status === "OK" && response.data.results.length > 0) {
      return response.data.results[0].formatted_address
    } else {
      throw new Error("No results found")
    }
  } catch (error) {
    console.error("Error fetching reverse geocode:")
    return null
  }
}
