export const getPlaces = async () => {
  const result = await fetch("http://localhost:3300/getplaces")
  const response = await result.json()
  console.log("RESPONSE : ", response)
  return response
}
