import { apiSlice } from './apiSlice';
const RATING_TREATMENT_URL = '/api/rating-treatment';

export const ratingTreatmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRatingTreatment: builder.mutation({
      query: (data) => ({
        url: `${RATING_TREATMENT_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    getRatingLengthTreatment: builder.query({
        query: (id) => ({
            url: `${RATING_TREATMENT_URL}/length/${id}`,
            method: 'GET'
        }),
        keepUnusedDataFor: false
    })
  }),
});

export const { useAddRatingTreatmentMutation, useGetRatingLengthTreatmentQuery } = ratingTreatmentApiSlice;
