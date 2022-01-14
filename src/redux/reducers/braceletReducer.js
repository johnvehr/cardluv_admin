import {createSlice} from '@reduxjs/toolkit'

import Auth from '../../auth'
import {currEnv} from '../api/apiConfig'

const initialState = {
  bracelets: [],
  bracelet_image: '',
  pending: false,
  success: false
}

export const braceletReducer = createSlice({
  name: 'bracelet',
  initialState,
  reducers: {
    addBracelet: (state,payload) => {
      state.pending = false;
      state.bracelets.push(payload.payload);
      state.success = true;
    },
    pending: (state) => {
      state.pending = true;
    },
    setBracelets: (state,payload) => {
      state.bracelets = payload.payload
    },
    setBracelet: (state,payload) => {
      state.bracelet = payload.payload
    },
    addImage: (state,payload) => {
      state.bracelet_image = payload.payload
    },
    removeBracelet: (state,payload) => {
      state.bracelets = state.bracelets.filter((c) => c.id != payload.payload)
    }
  }
})

export const {addBracelet,pending,setBracelets, setBracelet, addImage, removeBracelet} = braceletReducer.actions

export const addNewImage = (image, cloudinaryCallback) => (dispatch, getState) => {
  dispatch(pending())
  async function callApi() {

    const response = await fetch('https://api.cloudinary.com/v1_1/cardluv/image/upload', {
      method: 'POST',
      body: image
    })

    //Auth.processHead(response,'SIGN_IN')
    const data = await response.json()
    console.log(data)
    cloudinaryCallback(data.url)
    //dispatch(addImage(data))

  }
  callApi()
}

export const addNewBracelet = (bracelet) => (dispatch, getState) => {
  dispatch(pending())
  async function callApi() {

    const response = await fetch(`${currEnv}/admin/bracelets`, {
      method: 'POST',
      headers: Auth.fetchToken(),
      body: JSON.stringify(bracelet)
    })

    //Auth.processHead(response,'SIGN_IN')
    const data = await response.json()
    dispatch(addBracelet(data.bracelet))

  }
  callApi()
}

export const retrieveBracelets = () => (dispatch, getState) => {
  dispatch(pending())
  async function callApi() {
    const response = await fetch(`${currEnv}/admin/bracelets`, {
      method: 'GET',
      headers: Auth.fetchToken()
    })

    const data = await response.json()
    dispatch(setBracelets(data.bracelets))
  }
  callApi()
}

export const retrieveBracelet = (id) => (dispatch, getState) => {
  dispatch(pending())
  async function callApi() {
    const response = await fetch(`${currEnv}/admin/bracelets/${id}`, {
      method: 'GET',
      headers: Auth.fetchToken()
    })

    const data = await response.json()
    dispatch(setBracelet(data.bracelet))
  }
  callApi()
}


export const deleteBracelet = (id) => (dispatch, getState) => {
  dispatch(pending)
  async function callApi(id){
  const response = await fetch(`${currEnv}/admin/bracelets/${id}`, {
    method: 'DELETE',
    headers: Auth.fetchToken()
  })

  const data = await response.json()
  dispatch(removeBracelet(id))
  }
  callApi(id)
}

export default braceletReducer.reducer
