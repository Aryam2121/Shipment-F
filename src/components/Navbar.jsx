import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Cargo Shipment Tracker</h1>

        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `mx-2 hover:underline ${isActive ? "font-semibold underline" : ""}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/shipments"
            className={({ isActive }) =>
              `mx-2 hover:underline ${isActive ? "font-semibold underline" : ""}`
            }
          >
            Shipments
          </NavLink>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
