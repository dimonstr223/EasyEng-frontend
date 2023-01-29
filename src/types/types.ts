export interface IUser {
	_id: string
	username: string
}

export interface ICard {
	id: string
	word: string
	translation: string
	imageURL?: string
	user: IUser
}
