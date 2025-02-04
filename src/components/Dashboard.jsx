import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShipments } from "../redux/shipmentSlice";
import AddShipment from "./AddShipment";
import { RefreshCw } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.shipments);

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);
  

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Cargo Shipment Tracker
        </h2>
        <button
          onClick={() => dispatch(fetchShipments())}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-all"
        >
          <RefreshCw className="h-5 w-5 animate-spin-once" /> Refresh
        </button>
      </div>

      <AddShipment />

      {/* Loading State */}
      {status === "loading" && (
        <div className="flex items-center justify-center mt-6">
          <span className="animate-spin h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full"></span>
          <p className="text-blue-500 ml-2">Fetching shipments...</p>
        </div>
      )}

      {/* Error State */}
      {error && <p className="text-red-500 mt-4 text-center">🚨 {error}</p>}

      {/* Shipment Data */}
      {data.length > 0 ? (
        <div className="overflow-x-auto mt-6">
          <table className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg border-collapse">
            <thead>
              <tr className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Container</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">ETA</th>
                <th className="py-3 px-4 text-left">Route</th>

              </tr>
            </thead>
            <tbody>
              {data.map((shipment) => (
                <tr key={shipment._id} className="border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                  <td className="py-3 px-4">{shipment.shipmentId}</td>
                  <td className="py-3 px-4">{shipment.containerId}</td>
                  <td className="py-3 px-4">{shipment.currentLocation}</td>
                  <td className="py-3 px-4">{shipment.currentETA ? new Date(shipment.currentETA).toLocaleString() : "N/A"}</td>
                  <td className="py-3 px-4">{shipment.route.join(" → ")}</td>

                  <td className="py-3 px-4">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-6 text-gray-500">
          <p>No shipments available.</p>
          <button
            onClick={() => dispatch(fetchShipments())}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-3"
          >
            Fetch Shipments
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
