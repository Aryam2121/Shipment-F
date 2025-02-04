import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShipments } from "../redux/shipmentSlice";
import { Link } from "react-router-dom";

const Shipments = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.shipments);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  // 🚀 Optimized filtering using useMemo (prevents unnecessary recalculations)
  const filteredShipments = useMemo(() => {
    return data.filter(
      (shipment) =>
        (filterStatus === "" || shipment.status === filterStatus) &&
        (shipment.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shipment.containerId.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [data, searchTerm, filterStatus]);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">All Shipments</h2>

      {/* 🚀 Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Shipment ID or Container ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3 dark:bg-gray-800 dark:text-white"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4 dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* 🚀 Loading & Error Handling */}
      {status === "loading" && <p className="text-blue-500">Loading shipments...</p>}
      {status === "failed" && <p className="text-red-500">Error: {error}</p>}

      {/* 🚀 No Data Message */}
      {status === "succeeded" && filteredShipments.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">No shipments found.</p>
      )}

      {/* 🚀 Shipments Table */}
      {status === "succeeded" && filteredShipments.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Container</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((shipment) => (
                <tr key={shipment._id} className="border-t dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{shipment.shipmentId}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{shipment.containerId}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{shipment.currentLocation}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-sm font-semibold rounded-lg ${
                        shipment.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : shipment.status === "In Transit"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {shipment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/shipment/${shipment._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Shipments;
