import {createSlice} from '@reduxjs/toolkit'

import Auth from '../../auth'

const initialState = {
  cards: [],
  card_image: '',
  pending: false,
  success: false
}

export const cardReducer = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCard: (state,payload) => {
      state.pending = false;
      state.cards.push(payload.payload);
      state.success = true;
    },
    pending: (state) => {
      state.pending = true;
    },
    setCards: (state,payload) => {
      state.cards = payload.payload
    },
    setCard: (state,payload) => {
      state.card = payload.payload
    },
    addImage: (state,payload) => {
      state.card_image = payload.payload
    },
    removeCard: (state,payload) => {
      state.cards = state.cards.filter((c) => c.id != payload.payload)
    }
  }
})

export const {addCard,pending,setCards, setCard, addImage, removeCard} = cardReducer.actions

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

export const addNewCard = (card) => (dispatch, getState) => {
  dispatch(pending())
  async function callApi() {

    const response = await fetch('http://localhost:3001/admin/cards', {
      method: 'POST',
      headers: Auth.fetchToken(),
      body: JSON.stringify(card)
    })

    //Auth.processHead(response,'SIGN_IN')
    const data = await response.json()
    dispatch(addCard(data.card))

  }
  callApi()
}

export const retrieveCards = () => (dispatch, getState) => {
  dispatch(pending())
  async function callApi() {
    const response = await fetch('http://localhost:3001/admin/cards', {
      method: 'GET',
      headers: Auth.fetchToken()
    })

    const data = await response.json()
    dispatch(setCards(data.cards))
  }
  callApi()
}

export const retrieveCard = (id) => (dispatch, getState) => {
  dispatch(pending())
  async function callApi() {
    const response = await fetch(`http://localhost:3001/admin/cards/${id}`, {
      method: 'GET',
      headers: Auth.fetchToken()
    })

    const data = await response.json()
    dispatch(setCard(data.card))
  }
  callApi()
}


export const deleteCard = (id) => (dispatch, getState) => {
  dispatch(pending)
  async function callApi(id){
  const response = await fetch(`http://localhost:3001/admin/cards/${id}`, {
    method: 'DELETE',
    headers: Auth.fetchToken()
  })

  const data = await response.json()
  dispatch(removeCard(id))
  }
  callApi(id)
}

export default cardReducer.reducer
