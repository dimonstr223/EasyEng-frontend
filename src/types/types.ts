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
