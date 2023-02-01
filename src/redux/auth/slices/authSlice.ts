import { createSlice } from '@reduxjs/toolkit'

import {
	fetchLogin,
	fetchSingUp,
	fetchUploadAva,
	fetchLogout,
	fetchMe,
	fetchUpdateUser,
} from './../asyncThunks/authAsyncThunks'

import { RootState } from '../../store'
import { AuthState } from '../types/authTypes'
import { Status } from '../../../types/types'

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
				// state.avatarURL = ''
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

			// UPDATE USER
			.addCase(fetchUpdateUser.pending, (state, action) => {
				state.status = Status.LOADING
			})
			.addCase(fetchUpdateUser.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				if (state.me) {
					state.me = action.payload
				}
			})
			.addCase(fetchUpdateUser.rejected, (state, action) => {
				state.status = Status.ERROR
			})
	},
})

export const isAuthSelector = (state: RootState) => Boolean(state.auth.me)

export const { setAvatarURL } = authSlice.actions

export default authSlice.reducer
