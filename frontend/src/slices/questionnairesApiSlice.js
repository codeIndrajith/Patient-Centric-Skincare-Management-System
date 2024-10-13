import { apiSlice } from './apiSlice';
const QUESTIONS_URL = '/api/questionnaire';

export const questionnaireApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendQuestions: builder.mutation({
      query: (data) => ({
        url: `${QUESTIONS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    getData: builder.query({
      query: () => ({
        url: `${QUESTIONS_URL}/tre`,
        method: 'GET',
      }),
      keepUnusedDataFor: false,
    }),
    getDataOne: builder.query({
      query: (id) => ({
        url: `${QUESTIONS_URL}/tre/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: false,
    }),
  }),
});

export const { useSendQuestionsMutation, useGetDataQuery, useGetDataOneQuery } =
  questionnaireApiSlice;
