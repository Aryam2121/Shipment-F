import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // API Base URL

// Fetch All Shipments
export const fetchShipments = createAsyncThunk(
  "shipments/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/shipments`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch shipments");
    }
  }
);

// Fetch Shipment by ID
export const fetchShipmentById = createAsyncThunk(
  "shipments/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/shipment/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Shipment not found");
    }
  }
);

// Add New Shipment
export const addShipment = createAsyncThunk(
  "shipments/add",
  async (shipment, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/shipment`, shipment);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add shipment");
    }
  }
);

// Update Shipment Location
export const updateShipmentLocation = createAsyncThunk(
  "shipments/updateLocation",
  async ({ id, currentLocation }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/shipment/${id}`, { currentLocation });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update location");
    }
  }
);

// Get Estimated Arrival Time (ETA)
export const getETA = createAsyncThunk(
  "shipments/getETA",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/shipment/${id}/eta`);
      return response.data.eta;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch ETA");
    }
  }
);

const shipmentSlice = createSlice({
  name: "shipments",
  initialState: { data: [], selectedShipment: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Shipments
      .addCase(fetchShipments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch Shipment by ID
      .addCase(fetchShipmentById.pending, (state) => {
        state.selectedShipment = null;
        state.status = "loading";
      })
      .addCase(fetchShipmentById.fulfilled, (state, action) => {
        state.selectedShipment = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchShipmentById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add Shipment
      .addCase(addShipment.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addShipment.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update Shipment Location
      .addCase(updateShipmentLocation.fulfilled, (state, action) => {
        const index = state.data.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(updateShipmentLocation.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Get ETA
      .addCase(getETA.fulfilled, (state, action) => {
        if (state.selectedShipment) {
          state.selectedShipment.currentETA = action.payload;
        }
      })
      .addCase(getETA.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default shipmentSlice.reducer;
