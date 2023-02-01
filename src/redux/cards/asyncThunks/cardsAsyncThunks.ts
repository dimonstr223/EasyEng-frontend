import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../axios/axios'
import { ICard, IUploadResponse } from '../../../types/types'
import { ICardParams, ICardsResponse, IUpdateParams } from '../types/cardsTypes'

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
