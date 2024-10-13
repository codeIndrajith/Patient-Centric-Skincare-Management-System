import { apiSlice } from './apiSlice';
const DOCTOR_URL = '/api/doctor';

export const doctorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctor: builder.query({
      query: (id) => ({
        url: `${DOCTOR_URL}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: false,
    }),
    getOneDoctor: builder.query({
      query: (id) => ({
        url: `${DOCTOR_URL}/doc/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: false,
    }),
  }),
});

export const { useGetDoctorQuery, useGetOneDoctorQuery } = doctorApiSlice;
