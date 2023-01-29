export interface IAuthResponse {
	accessToken: string
	refreshToken: string
}

export interface AuthState {
	status: Status
	isAuth: boolean
	tokens: IAuthResponse | null
}

export enum Status {
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}
