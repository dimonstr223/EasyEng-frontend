export interface IUser {
	_id: string
	username: string
}

export interface ICard {
	_id: string
	word: string
	translation: string
	imageURL?: string
	user: IUser
}

export interface IUploadResponse {
	url: string
}

export enum Status {
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}
