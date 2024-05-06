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
  }),
});

export const { useSendQuestionsMutation } = questionnaireApiSlice;
