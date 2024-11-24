import { apiSlice } from './apiSlice';
const RATING_DOCTOR_URL = '/api/rating-doctor';

export const ratingDoctorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRatingDoctor: builder.mutation({
      query: (data) => ({
        url: `${RATING_DOCTOR_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    getRatingLengthDoctor: builder.query({
        query: (id) => ({
            url: `${RATING_DOCTOR_URL}/length/${id}`,
            method: 'GET'
        }),
        keepUnusedDataFor: false
    })
  }),
});

export const { useAddRatingDoctorMutation, useGetRatingLengthDoctorQuery } = ratingDoctorApiSlice;
