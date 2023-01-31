import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../axios/axios'

import { FormData as Form } from '../../../pages/LoginPage/types'
import { IUploadResponse } from '../../../types/types'
import { RootState } from '../../store'
import { AuthState, IAuthResponse, Status, IMe } from './types'

export const fetchLogin = createAsyncThunk<IAuthResponse, Form>(
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

const initialState: AuthState = {
	status: Status.LOADING,
	me: null,
	avatarURL: '',
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAvatarURL(state, action) {
			state.avatarURL = action.payload
		},
	},
	extraReducers: builder => {
		builder

			// LOGIN
			.addCase(fetchLogin.pending, state => {
				state.status = Status.LOADING
				state.me = null
			})
			.addCase(fetchLogin.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				localStorage.setItem('token', action.payload.accessToken)
				state.me = action.payload.userData
			})
			.addCase(fetchLogin.rejected, state => {
				state.status = Status.ERROR
				state.me = null
			})

			// SIGNUP
			.addCase(fetchSingUp.pending, (state, action) => {
				state.status = Status.LOADING
			})
			.addCase(fetchSingUp.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				localStorage.setItem('token', action.payload.accessToken)
				state.me = action.payload.userData
			})
			.addCase(fetchSingUp.rejected, (state, action) => {
				state.status = Status.ERROR
			})

			//AVATAR UPLOAD
			.addCase(fetchUploadAva.pending, (state, action) => {
				state.status = Status.LOADING
			})
			.addCase(fetchUploadAva.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.avatarURL = action.payload.url
			})
			.addCase(fetchUploadAva.rejected, (state, action) => {
				state.status = Status.ERROR
				state.avatarURL = ''
			})

			// LOGOUT
			.addCase(fetchLogout.pending, (state, action) => {
				state.status = Status.LOADING
				state.me = null
			})
			.addCase(fetchLogout.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				localStorage.removeItem('token')
				state.me = null
			})
			.addCase(fetchLogout.rejected, (state, action) => {
				state.status = Status.ERROR
				localStorage.removeItem('token')
				state.me = null
			})

			// ME
			.addCase(fetchMe.pending, (state, action) => {
				state.status = Status.LOADING
				state.me = null
			})
			.addCase(fetchMe.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.me = action.payload
			})
			.addCase(fetchMe.rejected, (state, action) => {
				state.status = Status.ERROR
				state.me = null
			})
	},
})

export const isAuthSelector = (state: RootState) => Boolean(state.auth.me)

export const { setAvatarURL } = authSlice.actions

export default authSlice.reducer
