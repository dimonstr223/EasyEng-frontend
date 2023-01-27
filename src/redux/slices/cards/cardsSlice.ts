import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../axios/axios'
import { ICard } from '../../../types/types'
import { CardsState, Status } from './types'

export const fetchCards = createAsyncThunk<ICard[]>(
	'cards/fetchCards',
	async () => {
		const { data } = await axios.get('/api/cards')
		return data
	}
)

const initialState: CardsState = {
	cards: {
		status: Status.LOADING,
		items: [],
	},
}

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCards.pending, state => {
				state.cards.status = Status.LOADING
				state.cards.items = []
			})
			.addCase(fetchCards.fulfilled, (state, action) => {
				state.cards.items = action.payload
				state.cards.status = Status.SUCCESS
			})
			.addCase(fetchCards.rejected, state => {
				state.cards.items = []
				state.cards.status = Status.ERROR
			})
	},
})

export default cardsSlice.reducer
