import {
  SEARCH_API
} from "./actionTypes"

export const addAPI = query => ({
  type: SEARCH_API,
  query:  query ,
})