export interface IAuthResponse {
	accessToken: string
	refreshToken: string
}

export interface AuthState {
	status: string
	data: IAuthResponse | null
	me: IMe | null
}

export interface IMe {
	_id: string
	username: string
	password: string
	roles: string[]
}

export enum Status {
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}
