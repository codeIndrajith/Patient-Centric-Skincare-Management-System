import { apiSlice } from './apiSlice';
const TREATMENT_URL = '/api/treatments';

export const treatmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    treatments: builder.query({
      query: (id) => ({
        url: `${TREATMENT_URL}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: false,
    }),
  }),
});

export const { useTreatmentsQuery } = treatmentApiSlice;
