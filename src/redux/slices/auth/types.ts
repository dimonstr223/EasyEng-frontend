export interface IAuthResponse {
	accessToken: string
	refreshToken: string
	userData: IMe
}

export interface IMe {
	_id: string
	username: string
}

export interface AuthState {
	status: Status
	me: IMe | null
	avatarURL: string
}

export enum Status {
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}
