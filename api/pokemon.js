import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiKey } from '../config';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://cardmarket-api-tcg.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', apiKey);
      headers.set('x-rapidapi-host', 'cardmarket-api-tcg.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLatestCards: builder.query({
      query: (page = 1) => `pokemon/cards?sort=episode_newest&page=${page}`,
      transformResponse: (response) => ({
        cards: response.data,
        paging: response.paging,
      }),
    }),
    searchCards: builder.query({
      query: ({ name, page = 1 }) => `pokemon/cards/search?search=${name}&page=${page}`,
      transformResponse: (response) => ({
        cards: response.data,
        paging: response.paging,
      }),
    }),
    getCardById: builder.query({
      query: (id) => `pokemon/cards/${id}`,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { 
  useGetLatestCardsQuery, 
  useSearchCardsQuery, 
  useGetCardByIdQuery
} = pokemonApi;
