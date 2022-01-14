import {createSlice} from '@reduxjs/toolkit'
import Auth from '../../auth'
import {currEnv} from '../api/apiConfig'

const initialState = {
  pending: false,
  complete: false,
  orders: []
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
    pending: (state) => {
      state.pending = true
    }
  }
})

export const {setOrders, pending} = orderReducer.actions

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

export default orderReducer.reducer
