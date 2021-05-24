// @flow
import {
  LIST_API_SUBMIT,
  LIST_API_SUBMIT_SUCCESS,
  KEYS_ARRAY_LIST,
  KEYS_ARRAY,
  SELECTED_KEYS,
  UPDATED_RESULTS,
  RESET
} from "./actionTypes"

const INIT_STATE = {
  listData: [],
  keysArrayList:[],
  keysArray:[],
  selectedKeys:[],
  updatedResults:[],
  query: ""
}

const ListPage = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LIST_API_SUBMIT:
      return {
        ...state,
        query: action.query,
      }
    case LIST_API_SUBMIT_SUCCESS:
      return {
        ...state,
        listData: action.payload
      }
    case KEYS_ARRAY_LIST:
      return {
        ...state,
        keysArrayList: action.payload
      }
    case KEYS_ARRAY:
      return {
        ...state,
        keysArray: action.payload
      }
    case SELECTED_KEYS:
      return {
        ...state,
        selectedKeys: [...action.payload]
      }
    case UPDATED_RESULTS:
      return {
        ...state,
        updatedResults: action.payload
      }
    case RESET:
      return INIT_STATE
    
    default:
      return state
  }
}

export default ListPage
