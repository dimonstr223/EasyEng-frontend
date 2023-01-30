import { ICard } from './../../../types/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../../axios/axios'
import {
	ICardParams,
	ICardsResponse,
	ICardsState,
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

const initialState: ICardsState = {
	status: Status.LOADING,
	totalCount: 0,
	cards: [],
	imageURL: '',
}

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		removeImageURL: (state, action: PayloadAction) => {
			state.imageURL = ''
		},
	},
	extraReducers: builder => {
		builder
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
			.addCase(fetchCreate.pending, (state, action) => {
				state.status = Status.LOADING
			})
			.addCase(fetchCreate.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.cards = [action.payload, ...state.cards]
			})
			.addCase(fetchCreate.rejected, (state, action) => {
				state.status = Status.ERROR
			})
	},
})

export const { removeImageURL } = cardsSlice.actions

export default cardsSlice.reducer
