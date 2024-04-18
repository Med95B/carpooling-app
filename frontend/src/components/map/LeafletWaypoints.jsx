/* eslint-disable react/prop-types */
import  { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletWaypoints = ({ onWaypointsSelect }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    const handleMapClick = (e) => {
      if (!routingControlRef.current) {
        routingControlRef.current = L.Routing.control({
          waypoints: [
            L.latLng(e.latlng.lat, e.latlng.lng),
          ],
          lineOptions: {
            styles: [
              {
                color: "blue",
                weight: 4,
                opacity: 0.7,
              },
            ],
          },
          routeWhileDragging: true,
          geocoder: L.Control.Geocoder.nominatim(),
          addWaypoints: true,
          draggableWaypoints: true,
          fitSelectedRoutes: true,
          showAlternatives: true,
        }).addTo(map);

        routingControlRef.current.on("waypointschanged", (e) => {
          const waypoints = e.waypoints
          // Envoyer les waypoints au parent
          onWaypointsSelect(waypoints);
        });
      } else {
        routingControlRef.current.spliceWaypoints(-1, 1, e.latlng);
      }
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [map, onWaypointsSelect]);

  return null;
};

export default LeafletWaypoints;
