/* eslint-disable no-return-await */
/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppointmentApi } from '../../actions/appointmentAction';

export const fetchAppointmentByClient = createAsyncThunk('appointment/fetchAppointment', async (clientId) => {
  try {
    const result = await AppointmentApi.getAppointmentsByClient(clientId);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
});
export const fetchAppointmentByNutritionist = createAsyncThunk('appointment/fetchAppointmentN', async (nutId) => {
  try {
    const result = await AppointmentApi.getAppointmentsByNutritionist(nutId);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
});

const initialState = {
  appointments: [],
  error: null,
  loading: false,
};
const appointmentSlice = createSlice(
  {
    name: 'appointment',
    initialState,
    reducers: {
      createAppointmentList: (state, action) => {
        state.appointments.push(action.payload);
      },

      updateAppointmentFromList: (state, action) => {
        state.appointments = state.appointments.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
      },
      removeAppointmentFromList: (state, action) => {
        state.appointments = state.appointments.filter((item) => item._id !== action.payload._id);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAppointmentByClient.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAppointmentByClient.fulfilled, (state, action) => {
          state.appointments = action.payload;
          state.loading = false;
        })
        .addCase(fetchAppointmentByClient.rejected, (state, action) => {
          state.error = action.error.message;
        })
        .addCase(fetchAppointmentByNutritionist.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAppointmentByNutritionist.fulfilled, (state, action) => {
          state.appointments = action.payload;
          state.loading = false;
        })
        .addCase(fetchAppointmentByNutritionist.rejected, (state, action) => {
          state.error = action.error.message;
        });
    },
  },
  { immer: true }
);

export const { createAppointmentList, updateAppointmentFromList, removeAppointmentFromList } = appointmentSlice.actions;
export default appointmentSlice.reducer;
