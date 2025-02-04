import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MapView from "./Mapview";
import { Loader2, AlertCircle } from "lucide-react";

const ShipmentDetails = () => {
  const { id } = useParams();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/shipment/${id}`);
        setShipment(response.data);
      } catch (err) {
        console.error("Error fetching shipment details:", err);
        setError("Failed to load shipment details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-blue-500">
        <Loader2 className="animate-spin h-6 w-6" />
        <p className="mt-2">Loading shipment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-red-500">
        <AlertCircle className="h-6 w-6" />
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="text-center mt-20 text-red-500">
        🚨 Shipment not found
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Shipment Details
      </h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-gray-800 dark:text-gray-200">
          <strong>Shipment ID:</strong> {shipment.shipmentId}
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <strong>Container ID:</strong> {shipment.containerId}
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <strong>Current Location:</strong> {shipment.currentLocation}
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-white ${
              shipment.status === "Pending"
                ? "bg-yellow-500"
                : shipment.status === "In Transit"
                ? "bg-blue-500"
                : "bg-green-500"
            }`}
          >
            {shipment.status}
          </span>
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <strong>ETA:</strong>{" "}
          {shipment.currentETA
            ? new Date(shipment.currentETA).toLocaleString()
            : "N/A"}
        </p>
      </div>

      {shipment.latitude && shipment.longitude ? (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Current Location on Map
          </h3>
          <MapView lat={shipment.latitude} lng={shipment.longitude} />
        </div>
      ) : (
        <div className="text-gray-500 dark:text-gray-400 mt-6">
          🌍 Location data not available for this shipment.
        </div>
      )}
    </div>
  );
};

export default ShipmentDetails;
