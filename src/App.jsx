import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";

// Lazy-loaded components for better performance
const Dashboard = lazy(() => import("./components/Dashboard"));
const AddShipment = lazy(() => import("./components/AddShipment"));
const ShipmentDetails = lazy(() => import("./components/ShipmentDetails"));
const Shipments = lazy(() => import("./pages/Shipments"));

function App() {
  return (
    <Router>
      <Navbar /> {/* Navigation Bar */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-shipment" element={<AddShipment />} />
            <Route path="/shipment/:id" element={<ShipmentDetails />} />
            <Route path="/shipments" element={<Shipments />} />

       
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
