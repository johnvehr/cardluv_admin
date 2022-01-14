import {createSlice} from '@reduxjs/toolkit'

import Auth from '../../auth'
import {currEnv} from '../api/apiConfig'

const initialState = {
  giftcards: [],
  giftcard_image: '',
  pending: false,
  success: false
}

export const giftcardReducer = createSlice({
  name: 'giftcard',
  initialState,
  reducers: {
    addGiftCard: (state,payload) => {
      state.pending = false;
      state.giftcards.push(payload.payload);
      state.success = true;
    },
    pending: (state) => {
      state.pending = true;
    },
    setGiftCards: (state,payload) => {
      state.giftcards = payload.payload
    },
    setGiftCard: (state,payload) => {
      state.giftcard = payload.payload
    },
    addImage: (state,payload) => {
      state.giftcard_image = payload.payload
    },
    removeGiftCard: (state,payload) => {
      state.giftcards = state.giftcards.filter((c) => c.id != payload.payload)
    }
  }
})

export const {addGiftCard,pending,setGiftCards, setGiftCard, addImage, removeGiftCard} = giftcardReducer.actions

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

export const addNewGiftCard = (giftcard) => (dispatch, getState) => {
  dispatch(pending())
  async function callApi() {

    const response = await fetch(`${currEnv}/admin/gift_cards`, {
      method: 'POST',
      headers: Auth.fetchToken(),
      body: JSON.stringify(giftcard)
    })

    //Auth.processHead(response,'SIGN_IN')
    const data = await response.json()
    dispatch(addGiftCard(data.giftcard))

  }
  callApi()
}

export const retrieveGiftCards = () => (dispatch, getState) => {
  dispatch(pending())
  async function callApi() {
    const response = await fetch(`${currEnv}/admin/gift_cards`, {
      method: 'GET',
      headers: Auth.fetchToken()
    })

    const data = await response.json()
    dispatch(setGiftCards(data.giftcards))
  }
  callApi()
}

export const retrieveGiftCard = (id) => (dispatch, getState) => {
  dispatch(pending())
  async function callApi() {
    const response = await fetch(`${currEnv}/admin/gift_cards/${id}`, {
      method: 'GET',
      headers: Auth.fetchToken()
    })

    const data = await response.json()
    dispatch(setGiftCard(data.giftcard))
  }
  callApi()
}


export const deleteGiftCard = (id) => (dispatch, getState) => {
  dispatch(pending)
  async function callApi(id){
  const response = await fetch(`${currEnv}/admin/gift_cards/${id}`, {
    method: 'DELETE',
    headers: Auth.fetchToken()
  })

  const data = await response.json()
  dispatch(removeGiftCard(id))
  }
  callApi(id)
}

export default giftcardReducer.reducer
