import { apiSlice } from './apiSlice';
const APPOINTMENT_URL = '/api/appointments';

export const appointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointment: builder.query({
      query: (id) => ({
        url: `${APPOINTMENT_URL}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: false,
    }),
    addAppointment: builder.mutation({
      query: (data) => ({
        url: `${APPOINTMENT_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetAppointmentQuery, useAddAppointmentMutation } =
  appointmentApiSlice;
