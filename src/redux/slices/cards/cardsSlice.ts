import { ICard } from './../../../types/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../../axios/axios'
import {
	ICardParams,
	ICardsResponse,
	ICardsState,
	IUpdateParams,
	IUploadResponse,
	Status,
} from './types'

export const fetchCards = createAsyncThunk<ICardsResponse>(
	'cards/fetchCards',
	async () => {
		const { data } = await axios.get<ICardsResponse>('/api/cards')
		return data
	}
)
export const fetchOneCard = createAsyncThunk<ICard, string>(
	'cards/fetchOneCard',
	async id => {
		const { data } = await axios.get<ICard>(`/api/cards/${id}`)
		return data
	}
)
export const fetchUpload = createAsyncThunk<IUploadResponse, FormData>(
	'cards/fetchUpload',
	async formData => {
		const { data } = await axios.post<IUploadResponse>('/api/upload', formData)
		return data
	}
)
export const fetchCreate = createAsyncThunk<ICard, ICardParams>(
	'cards/fetchCreate',
	async params => {
		const { data } = await axios.post<ICard>('/api/cards', params)
		return data
	}
)
export const fetchUpdate = createAsyncThunk<ICard, IUpdateParams>(
	'cards/fetchUpdate',
	async ({ id, body }) => {
		const { data } = await axios.put<ICard>(`/api/cards/${id}`, body)
		return data
	}
)
export const fetchDelete = createAsyncThunk<void, string>(
	'cards/fetchDelete',
	async id => {
		const { data } = await axios.delete(`/api/cards/${id}`)
		return data
	}
)

const initialState: ICardsState = {
	status: Status.LOADING,
	totalCount: 0,
	cards: [],
	imageURL: '',
	card: null,
}

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		setImageURL: (state, { payload }) => {
			state.imageURL = payload
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
				state.cards = action.payload.cards
				state.totalCount = action.payload.totalCount
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
				state.cards = [...state.cards, action.payload]
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
				state.cards = state.cards.filter(item => item._id !== action.meta.arg)
			})
			.addCase(fetchDelete.rejected, (state, action) => {
				state.status = Status.ERROR
			})
	},
})

export const { setImageURL } = cardsSlice.actions

export default cardsSlice.reducer
