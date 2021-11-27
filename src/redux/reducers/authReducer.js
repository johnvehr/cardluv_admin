import {createSlice} from '@reduxjs/toolkit'

import Auth from '../../auth'
import Error from '../api/error'

const initialState = {
  user: {},
  loggedIn: false,
  pending: false,
  success: false,
  error_status: false ,
  error_message: ''
}

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state,payload) => {
      state.pending = false;
      state.user = payload.user;
      state.success = true;
    },
    pending: (state) => {
      state.pending = true;
    },
    setErrors: (state, payload) => {
      state.pending = false;
      state.error_status = true;
      state.error_message = Error.setErrorMessage(payload.payload)
    }
  }
})

export const {signIn,pending,setErrors} = authReducer.actions

export const signInAdmin = (user, redirectCallback) => (dispatch, getState) => {
  dispatch(pending())
  async function callApi() {
    const response = await fetch('https://cardluv-api.herokuapp.com/admin/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    })

    if (response.status >= 200 && response.status <= 299) {
      Auth.processHead(response,'SIGN_IN')
      dispatch(signIn(response))
      redirectCallback()
    } else {
      // Handle errors
      dispatch(setErrors(response.status))
      console.log(response.status, response.statusText);
    }


  }
  callApi()
}

export default authReducer.reducer
