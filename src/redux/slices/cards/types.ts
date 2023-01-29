import { ICard } from './../../../types/types'

export enum Status {
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}

export interface CardsState {
	cards: {
		status: Status
		totalCount: number
		items: ICard[]
	}
}
