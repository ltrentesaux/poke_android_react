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
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg: page }) => {
        if (page === 1) {
          return newItems;
        }
        currentCache.cards.push(...newItems.cards);
        currentCache.paging = newItems.paging;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      transformResponse: (response) => ({
        cards: response.data,
        paging: response.paging,
      }),
    }),
    searchCards: builder.query({
      query: ({ name, page = 1 }) => `pokemon/cards/search?search=${name}&page=${page}`,
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        const { name } = queryArgs;
        return `${endpointName}-${name}`;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          return newItems;
        }
        if (newItems.cards) {
            currentCache.cards.push(...newItems.cards);
        }
        currentCache.paging = newItems.paging;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page || currentArg?.name !== previousArg?.name;
      },
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