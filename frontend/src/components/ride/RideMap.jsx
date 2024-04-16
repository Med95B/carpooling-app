/* eslint-disable react/prop-types */
import 'leaflet/dist/leaflet.css'

import { MapContainer, TileLayer } from "react-leaflet";
import LeafletGeocoder from "../map/LeafletGeoCoder";
import LeafletRoutingMachine from "../map/LeafletRoutingMachine";

function RideMap({ onRoutesFound, onWaypointsSelect }) {
  const position = [34.020882, -6.841650];

  return (
    <div className="RideMap">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '600px', margin: '35px' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletGeocoder />
        <LeafletRoutingMachine onRoutesFound={onRoutesFound} onWaypointsSelect={onWaypointsSelect} />
      </MapContainer>
    </div>
  );
}

export default RideMap;
