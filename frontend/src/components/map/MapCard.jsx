import 'leaflet/dist/leaflet.css';
import{MapContainer,TileLayer,Popup} from 'react-leaflet'
import LocationMarker from './CurrentLocation';


function MapCard() {

  const center=[31.792306, -7.080168]
  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={false}
    style={{height:'400px',margin:'35px'}}
    >
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
   <Popup position={[31.792306, -7.080168]} closeButton={false} autoClose={false}>
        <div>
          <p>Cliquez sur la carte pour voir votre position actuelle!</p>
        </div>
      </Popup>
  <LocationMarker/>
</MapContainer>
  )
}

export default MapCard