import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShipment } from "../redux/shipmentSlice";
import { Loader2 } from "lucide-react";

const AddShipment = () => {
  const [formData, setFormData] = useState({
    containerId: "",
    currentLocation: "",
    route: "",
  });
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.shipments);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null); // Reset success message

    const { containerId, currentLocation, route } = formData;
    if (!containerId || !currentLocation || !route) return;

    const newShipment = {
      containerId,
      currentLocation,
      route: [route], // Backend expects an array
    };

    try {
      await dispatch(addShipment(newShipment)).unwrap();
      setFormData({ containerId: "", currentLocation: "", route: "" });
      setSuccess("Shipment added successfully!");
    } catch (err) {
      console.error("Error adding shipment:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Add Shipment
      </h3>

      <input
        type="text"
        name="containerId"
        placeholder="Container ID"
        value={formData.containerId}
        onChange={handleChange}
        className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg w-full dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="text"
        name="route"
        placeholder="Initial Route Location"
        value={formData.route}
        onChange={handleChange}
        className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg w-full mt-3 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="text"
        name="currentLocation"
        placeholder="Current Location"
        value={formData.currentLocation}
        onChange={handleChange}
        className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg w-full mt-3 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-400"
        required
      />

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-lg mt-4 w-full flex items-center justify-center disabled:opacity-50 transition-all duration-300"
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Add Shipment"}
      </button>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      {success && <p className="text-green-500 mt-2 text-sm">{success}</p>}
    </form>
  );
};

export default AddShipment;
