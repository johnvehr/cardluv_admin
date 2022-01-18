import {createSlice} from '@reduxjs/toolkit'
import Auth from '../../auth'
import {currEnv} from '../api/apiConfig'

const initialState = {
  pending: false,
  complete: false,
  orders: [],
  order: {}
}

export const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state,payload) => {
      state.orders = payload.payload
      state.pending = false;
      state.complete = true;
    },
    setOrder: (state,payload) => {
      state.order = {
        order: payload.payload.order,
        order_line_items: payload.payload.order_line_items
      }
    },
    pending: (state) => {
      state.pending = true
    }
  }
})

export const {setOrders, pending, setOrder} = orderReducer.actions

export const retrieveOrders = () => (dispatch,getState) => {
  dispatch(pending())
  async function callOrder(){
  const response = await fetch(`${currEnv}/admin/orders`,{
    method: 'GET',
    headers: Auth.fetchToken()
  })

  const data = await response.json()
  dispatch(setOrders(data.orders))

}
callOrder() //.then(redirectCallback())
}

export const retrieveOrder = (id) => (dispatch,getState) => {
  dispatch(pending())
  async function callOrder(){
  const response = await fetch(`${currEnv}/admin/orders/${id}`,{
    method: 'GET',
    headers: Auth.fetchToken()
  })

  const data = await response.json()
  dispatch(setOrder(data))

}
callOrder() //.then(redirectCallback())
}

export const markFulfilled = (id, redirectCallback) => (dispatch,getState) => {
  //dispatch(pending())
  async function callOrder(){
  const response = await fetch(`${currEnv}/admin/mark_fulfilled/${id}`,{
    method: 'PUT',
    headers: Auth.fetchToken()
  })

  const data = await response.json()
  dispatch(setOrder(data))
  redirectCallback()
}
callOrder() //.then(redirectCallback())
}


export default orderReducer.reducer
