import { enterdFormDataType } from "../components/form/NewPlaceForm"

export const getPlaces = async () => {
  const result = await fetch("http://localhost:3300/getplaces")
  const response = await result.json()
  // console.log("RESPONSE : ", response)
  return response
}

export const addPlace = async (data: enterdFormDataType) => {
  const formData = JSON.stringify(data)
  console.log("sending fomr data: ", formData)

  const result = await fetch("http://localhost:3300/addplace", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: formData,
  })
  const response = await result.json()
  // console.log("RESPONSE : ", response)
  return response
}
