import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

// Geolocation Promise wrapper
function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Async thunk for fetching user's address
export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    try {
      // 1. Get user's geolocation
      const positionObj = await getPosition();
      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };

      // 2. Use reverse geocoding to get address
      const addressObj = await getAddress(position);
      const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

      // Return position and address as payload
      return { position, address };
    } catch (error) {
      throw new Error('Unable to get your location');
    }
  },
);

const initialState = {
  username: '',
  status: 'idle', // 'idle' | 'loading' | 'error'
  position: {},
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
        state.error = '';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = 'Failed to get your address. Please fill in manually.';
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
