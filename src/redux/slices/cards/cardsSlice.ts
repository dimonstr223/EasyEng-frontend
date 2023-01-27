import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	cards: {
		status: 'loading',
		items: [],
	},
}

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {},
	extraReducers: builder => {},
})

export default cardsSlice.reducer
