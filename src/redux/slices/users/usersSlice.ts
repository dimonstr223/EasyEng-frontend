import { IUser, UsersState } from './types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../axios/axios'
import { Status } from '../auth/types'
import { RootState } from '../../store'

export const fetchUsers = createAsyncThunk<IUser[]>(
	'users/FetchUsers',
	async () => {
		const { data } = await axios.get<IUser[]>('/auth/users')
		return data
	}
)

const initialState: UsersState = {
	users: {
		status: Status.LOADING,
		items: [],
	},
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {},
})

export default usersSlice.reducer
