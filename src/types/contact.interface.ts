import { iUser } from "./user.interface"

export interface iContact {
	id: number
	email: string
	name: string
	phone: string
	imgURL: string
	isFavorite: boolean
	createdAt: string
	updatedAt: string
	user: iUser
}

export interface iContactCard {
	id: number
	email: string
	name: string
	phone: string
	imgURL: string
	isFavorite: boolean
}
