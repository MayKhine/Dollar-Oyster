import { useLoadScript } from "@react-google-maps/api"
import { googleMapApiKey } from "../../googleMapConfig"

type GoogleMapLibLoadFormProps = {
  cancleFn: () => void
}
export const GoogleMapLibLoadForm = ({
  cancleFn,
}: GoogleMapLibLoadFormProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapApiKey,
    libraries: ["places"],
  })
  if (!isLoaded) return <div> Loading </div>

  return (
    <div>
      <button onClick={cancleFn}> TEST CANCEL </button>
    </div>
  )
}
