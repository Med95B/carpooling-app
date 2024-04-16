import  { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

const LeafletGeoCoder = () => {
  const map = useMap();

  useEffect(() => {
    L.Control.geocoder({
      defaultMarkGeocode: false,
      autocomplete: true,
    })
      .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
        map.fitBounds(e.geocode.bbox);
        
      })
      .addTo(map);
  }, [map]);
  return null;
};

export default LeafletGeoCoder;