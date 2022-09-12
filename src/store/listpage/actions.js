import {
  LIST_API_SUBMIT,
  LIST_API_SUBMIT_SUCCESS,
  KEYS_ARRAY_LIST,
  KEYS_ARRAY,
  SELECTED_KEYS,
  UPDATED_RESULTS,
  START_LOADING,
  STOP_LOADING,
  RESET
} from "./actionTypes"

export const addAPI = query => ({
  type: LIST_API_SUBMIT,
  query:  query ,
})

export const addAPISuccess = data => ({
  type: LIST_API_SUBMIT_SUCCESS,
  payload: data,
})

export const getKeysArrayList = keysArrayList => ({
  type: KEYS_ARRAY_LIST,
  payload: keysArrayList,
})

export const getKeysArray = keysArray => ({
  type: KEYS_ARRAY,
  payload: keysArray,
})

export const setSelectedKeys = selectedkeys => ({
  type: SELECTED_KEYS,
  payload: selectedkeys,
})
export const setUpdatedResults = data => ({
  type: UPDATED_RESULTS,
  payload: data,
})

export const startLoading = () => ({
  type: START_LOADING
})

export const stopLoading = () => ({
  type: STOP_LOADING
})

export const resetStore = () => ({
  type: RESET
})



