import { iContact } from "./contact.interface"

interface iUser {
	id: number
	email: string
	password: string
	name: string
	phone: string
	imgURL: string
	contacts: iContact[]
	createdAt: string
	updatedAt: string
}
export default iUser
