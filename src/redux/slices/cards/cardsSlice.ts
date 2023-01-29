import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../axios/axios'
import { ICardsResponse, ICardsState, Status } from './types'

export const fetchCards = createAsyncThunk<ICardsResponse>(
	'cards/fetchCards',
	async () => {
		const { data } = await axios.get<ICardsResponse>('/api/cards')
		return data
	}
)

const initialState: ICardsState = {
	status: Status.LOADING,
	totalCount: 0,
	cards: [],
}

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCards.pending, (state, action) => {
				state.status = Status.LOADING
				state.cards = null
			})
			.addCase(fetchCards.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.cards = action.payload.cards
				state.totalCount = action.payload.totalCount
			})
			.addCase(fetchCards.rejected, (state, action) => {
				state.status = Status.ERROR
				state.cards = null
			})
	},
})

export default cardsSlice.reducer
