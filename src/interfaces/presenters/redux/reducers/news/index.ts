import {
  createSlice,
  PayloadAction,
  Draft,
  createAction,
} from '@reduxjs/toolkit'
import initialState from './state'
import { StateType } from './types'
import { HYDRATE } from 'next-redux-wrapper'
import { RssData } from '@/domains/services/feedParser/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { $axios } from '@/config/axios'

const hydrate = createAction(HYDRATE)

export const fetch = createAsyncThunk(
  'api/news',
  async (): Promise<RssData[]> => {
    return await $axios.get('news').then((res) => res.data)
  }
)

export const newsSlice = createSlice({
  name: 'reducers/news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state: Draft<StateType>, action) => {
        return {
          ...state,
          ...(action.payload as any)[newsSlice.name],
        }
      })
      .addCase(
        fetch.fulfilled,
        (state: Draft<StateType>, action: PayloadAction<RssData[]>) => {
          return {
            ...state,
            data: action.payload,
          }
        }
      )
  },
})
