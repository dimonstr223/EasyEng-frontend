import { fetchSearch } from './../asyncThunks/cardsAsyncThunks'
import { createSlice } from '@reduxjs/toolkit'

import {
	fetchCards,
	fetchDelete,
	fetchOneCard,
	fetchUpload,
	fetchUpdate,
	fetchCreate,
} from '../asyncThunks/cardsAsyncThunks'

import { ICardsState, Status } from '../types/cardsTypes'

const initialState: ICardsState = {
	status: Status.LOADING,
	totalCount: 0,
	cards: [],
	imageURL: '',
	card: null,
	searchValue: '',
	currentPage: 1,
	limit: 0,
}

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		setImageURL: (state, action) => {
			state.imageURL = action.payload
		},
		setSearchValue: (state, action) => {
			state.searchValue = action.payload
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload
		},
	},
	extraReducers: builder => {
		builder
			// FETCH CARDS
			.addCase(fetchCards.pending, (state, action) => {
				state.status = Status.LOADING
				state.cards = []
			})
			.addCase(fetchCards.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.cards = action.payload.items
				state.totalCount = action.payload.totalCount
				state.currentPage = action.payload.currentPage
				state.limit = action.payload.limit
			})
			.addCase(fetchCards.rejected, (state, action) => {
				state.status = Status.ERROR
				state.cards = []
			})

			// FETCH ONE CARD
			.addCase(fetchOneCard.pending, (state, action) => {
				state.status = Status.LOADING
				state.card = null
			})
			.addCase(fetchOneCard.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.card = action.payload
			})
			.addCase(fetchOneCard.rejected, (state, action) => {
				state.status = Status.ERROR
				state.card = null
			})

			// UPLOAD IMAGE
			.addCase(fetchUpload.pending, (state, action) => {
				state.status = Status.LOADING
				state.imageURL = ''
			})
			.addCase(fetchUpload.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.imageURL = action.payload.url
			})
			.addCase(fetchUpload.rejected, (state, action) => {
				state.status = Status.ERROR
				state.imageURL = ''
			})

			// CREATE CARD
			.addCase(fetchCreate.pending, (state, action) => {
				state.status = Status.LOADING
			})
			.addCase(fetchCreate.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				if (state.cards) {
					state.cards = [...state.cards, action.payload]
				}
				state.imageURL = ''
			})
			.addCase(fetchCreate.rejected, (state, action) => {
				state.status = Status.ERROR
			})

			// UPDATE CARD
			.addCase(fetchUpdate.pending, (state, action) => {
				state.status = Status.LOADING
			})
			.addCase(fetchUpdate.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.imageURL = ''
			})
			.addCase(fetchUpdate.rejected, (state, action) => {
				state.status = Status.ERROR
			})

			// DELTE CARD
			.addCase(fetchDelete.pending, (state, action) => {
				state.status = Status.LOADING
			})
			.addCase(fetchDelete.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				if (state.cards) {
					state.cards = state.cards.filter(item => item._id !== action.meta.arg)
				}
			})
			.addCase(fetchDelete.rejected, (state, action) => {
				state.status = Status.ERROR
			})

			// SEARCH CARDS
			.addCase(fetchSearch.pending, (state, action) => {
				state.status = Status.LOADING
				state.cards = []
			})
			.addCase(fetchSearch.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.totalCount = action.payload.totalCount
				state.cards = action.payload.items
				state.currentPage = action.payload.currentPage
				state.limit = action.payload.limit
			})
			.addCase(fetchSearch.rejected, (state, action) => {
				state.status = Status.ERROR
				state.cards = []
			})
	},
})

export const { setImageURL, setSearchValue, setCurrentPage } =
	cardsSlice.actions

export default cardsSlice.reducer
