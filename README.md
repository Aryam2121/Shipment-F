# Shipment-F (Frontend)

Shipment-F is the frontend of the Cargo Shipment Tracker application, built using React and Redux. It provides a modern, responsive UI for tracking shipments, filtering data, and viewing shipment details on an interactive map.

## 🚀 Features
- 📦 **Shipment Dashboard** – View all shipments in a clean and modern UI.
- 🔍 **Search & Filter** – Easily find shipments using search and filtering options.
- 🗺️ **Map Integration** – Track shipments on a map using `react-leaflet` or `google-maps-react`.
- 🎨 **Dark Mode** – Toggle between light and dark themes.
- ⚡ **Framer Motion Animations** – Smooth and modern UI transitions.

## 🛠️ Tech Stack
- **React.js** – Frontend framework
- **Redux Toolkit** – State management
- **Tailwind CSS v4** – Styling
- **Framer Motion** – Animations
- **React Router** – Navigation
- **Axios** – API calls
- **React-Leaflet / Google Maps API** – Shipment tracking on maps

## 📥 Installation

Clone the repository:
```sh
git clone https://github.com/yourusername/shipment-f.git
cd shipment-f
```

Install dependencies:
```sh
npm install
```

I am attaching readme.md on backend repository to see that also
```sh
backend URL=http://localhost:5000/api
```
```
https://github.com/Aryam2121/Shipment-B
```
Go on backend repository clone that and run to start backend Then You do all operations You want
```
npm run dev 
```

Run the Frontend or its on the vercel also :
```sh
npm run dev
```

## 🚀 Deployment
### **Vercel Deployment**
```sh
npm install -g vercel
vercel
```

### **Netlify Deployment**
```sh
npm install -g netlify-cli
netlify deploy
```

## 📜 API Endpoints (Used in Frontend)
Ensure the backend (Shipment-B) is running properly. The frontend interacts with these endpoints:

- `GET /api/shipments` – Fetch all shipments
- `GET /api/shipments/:id` – Get a single shipment
- `POST /api/shipments` – Create a new shipment
- `PUT /api/shipments/:id` – Update shipment details
- `DELETE /api/shipments/:id` – Delete a shipment



---

## 📌 TODO (Future Enhancements)
- ✅ Add sorting options for shipments
- ✅ Improve shipment tracking with real-time updates
- ✅ Implement user authentication for admin features

## 🤝 Contributing
Contributions are welcome! Feel free to submit a pull request.

## 📄 License
This project is licensed under the MIT License.
