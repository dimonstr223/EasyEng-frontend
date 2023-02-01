import { ILoginParams, IMe, IUserUpdate } from './../types/authTypes'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../axios/axios'

import { Form } from '../../../pages/SignUpPage/types'
import { IAuthResponse } from '../types/authTypes'
import { IUploadResponse } from '../../../types/types'

export const fetchLogin = createAsyncThunk<IAuthResponse, ILoginParams>(
	'auth/fethchAuth',
	async params => {
		const { data } = await axios.post<IAuthResponse>('/auth/login', params)
		return data
	}
)
export const fetchSingUp = createAsyncThunk<IAuthResponse, Form>(
	'auth/fetchSignUp',
	async params => {
		const { data } = await axios.post<IAuthResponse>('/auth/signup', params)
		return data
	}
)
export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
	const { data } = await axios.delete('/auth/logout')
	return data
})
export const fetchMe = createAsyncThunk<IMe>('auth/fetchMe', async () => {
	const { data } = await axios.get<IMe>('/auth/me')
	return data
})
export const fetchUploadAva = createAsyncThunk<IUploadResponse, FormData>(
	'auth/fetchUploadAva',
	async formData => {
		const { data } = await axios.post<IUploadResponse>('/auth/upload', formData)
		return data
	}
)
export const fetchUpdateUser = createAsyncThunk<IMe, IUserUpdate>(
	'auth/fetchUpdateUser',
	async ({ id, body }) => {
		const { data } = await axios.patch<IMe>(`/users/${id}`, body)
		return data
	}
)
