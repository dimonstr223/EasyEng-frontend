import axios from '../../../axios/axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { IUser } from '../types/usersTypes'

export const fetchUsers = createAsyncThunk<IUser[]>(
	'users/FetchUsers',
	async () => {
		const { data } = await axios.get<IUser[]>('/auth/users')
		return data
	}
)
