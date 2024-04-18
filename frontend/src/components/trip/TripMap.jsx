/* eslint-disable react/prop-types */


import { MapContainer, TileLayer } from "react-leaflet";
import LeafletGeocoder from "../map/LeafletGeoCoder";
import LeafletWaypoints from "../map/LeafletWaypoints";
//import CurrentLocation from '../map/CurrentLocation';

function TripMap({onWaypointsSelect}) {
  const position = [ 34.020882, -6.841650];

  return (
    <div className="TripMap">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '600px', margin: '35px' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*
       
         <CurrentLocation/>
        
        */}
        
        <LeafletGeocoder />
        <LeafletWaypoints onWaypointsSelect={onWaypointsSelect}/>

      </MapContainer>
    </div>
  );
}

export default TripMap;
