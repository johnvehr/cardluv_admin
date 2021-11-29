import {createSlice} from '@reduxjs/toolkit'

import Auth from '../../auth'
import {currEnv} from '../api/apiConfig'

const initialState = {
  designers: [],
  designer_image: '',
  pending: false,
  success: false
}

export const designerReducer = createSlice({
  name: 'designer',
  initialState,
  reducers: {
    addDesigner: (state,payload) => {
      state.pending = false;
      state.designers.push(payload.payload)
      state.success = true;
    },
    pending: (state) => {
      state.pending = true
    },
    setDesigners: (state,payload) => {
      state.designers = payload.payload
    },
    addImage: (state,payload) => {
      state.designer_image = payload.payload
    },
    removeDesigner: (state,payload) => {
      state.designers = state.designers.filter((d) => d.id != payload.payload)
    }
  }
})

export const {addDesigner,pending,setDesigners,addImage,removeDesigner} = designerReducer.actions

export const retrieveDesigners = () => (dispatch,getState) => {
  dispatch(pending())
  async function callApi() {
    const response = await fetch(`${currEnv}/admin/designers`, {
      method: 'GET',
      headers: Auth.fetchToken()
    })

    const data = await response.json()
    dispatch(setDesigners(data.designers))
  }
  callApi()
}

export const addNewDesigner = (designer) => (dispatch, getState) => {
  dispatch(pending())
  async function callApi() {
    const response = await fetch(`${currEnv}/admin/designers`, {
      method: 'POST',
      headers: Auth.fetchToken(),
      body: JSON.stringify(designer)
    })

    //Auth.processHead(response,'SIGN_IN')
    const data = await response.json()
    dispatch(addDesigner(data.designer))

  }
  callApi()
}

export const addNewImage = (image, cloudinaryCallback) => (dispatch, getState) => {
  dispatch(pending())
  async function callApi() {

    const response = await fetch('https://api.cloudinary.com/v1_1/cardluv/image/upload', {
      method: 'POST',
      body: image
    })

    const data = await response.json()
    console.log(data)
    cloudinaryCallback(data.url)
    //dispatch(addImage(data))

  }
  callApi()
}

export default designerReducer.reducer
