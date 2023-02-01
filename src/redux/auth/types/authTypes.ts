import { Status } from '../../../types/types'
import { IUserParams } from '../../users/types/usersTypes'

export interface IAuthResponse {
	accessToken: string
	refreshToken: string
	userData: IMe
}

export interface IMe {
	_id: string
	username: string
	avatar: string
}

export interface AuthState {
	status: Status
	me: IMe | null
	avatarURL: string
}

export interface IUserUpdate {
	id: string
	body: IUserParams
}

export interface ILoginParams {
	username: string
	password: string
}
