import {createSlice} from '@reduxjs/toolkit'
import Auth from '../../auth'

const initialState = {
  pending: false,
  complete: false,
  customers: []
}

export const adminReducer = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminInfo: (state,payload) => {
      state.customers = payload.payload
      state.pending = false;
      state.complete = true;
    },
    pending: (state) => {
      state.pending = true
    }
  }
})

export const {adminInfo, pending} = adminReducer.actions

export const retrieveAdminInfo = () => (dispatch,getState) => {
  dispatch(pending())
  async function callProfile(){
  const response = await fetch('https://cardluv-api.herokuapp.com/admin/admins',{
    method: 'GET',
    headers: Auth.fetchToken()
  })

  const data = await response.json()
  dispatch(adminInfo(data.customers))

}
callProfile() //.then(redirectCallback())
}

export default adminReducer.reducer
