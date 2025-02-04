import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = ({ lat, lng }) => {
  if (!lat || !lng) {
    return <p className="text-center text-red-500">🌍 Invalid location data.</p>;
  }

  return (
    <MapContainer center={[lat, lng]} zoom={10} className="h-64 w-full rounded-lg">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>Shipment Current Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
