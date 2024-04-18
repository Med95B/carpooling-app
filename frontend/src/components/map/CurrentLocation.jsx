import { useState } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"
import { OpenStreetMapProvider } from "leaflet-geosearch"

function CurrentLocation() {
  const [position, setPosition] = useState(null)
  const [locationName, setLocationName] = useState("")

  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {

      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())

         // Utilisation de leaflet-geosearch pour obtenir le nom de la position
      const provider = new OpenStreetMapProvider()
      provider
        .search({ query: `${e.latlng.lat},${e.latlng.lng}` })
        .then(results => {
          if (results.length > 0) {
            setLocationName(results[0].label)
          } else {
            setLocationName("Location not found")
          }
        })
        .catch(error => {
          console.error("Error fetching location name:", error)
          setLocationName("Location not found")
        })
    },
  })

  return position === null ?    <Popup position={[34.020882, -6.841650]} closeButton={false} autoClose={false}>
  <div>
    <p>Cliquez sur la carte pour voir votre position actuelle!</p>
  </div>
</Popup> : (
    <Marker position={position}>
      <Popup>{locationName}</Popup>
    </Marker>
  )
}

export default CurrentLocation
