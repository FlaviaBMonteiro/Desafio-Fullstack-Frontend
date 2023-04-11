import { useState, useEffect, createContext, useContext } from "react"
import api from "@/services/api"
import { iUser } from "@/types/user.interface"
import { iContact, iContactCard } from "@/types/contact.interface"
import { ReactNode } from "react"

interface userProviderData {
	user: iUser
	contacts: iContactCard[]
}

export const UserContext = createContext<userProviderData>({} as userProviderData)

interface IHeaderProps {
	email?: string
	token?: string
	children: ReactNode
}

export const UserProvider = ({ email, token, children }: IHeaderProps) => {
	const [user, setUser] = useState<iUser | null>(null)
	const [contacts, setContacts] = useState<iContactCard[]>([])
	const [isLoading, setLoading] = useState(false)
	console.log(`User Provider Email ${email}`)
	console.log(`User Provider Token ${token}`)

	useEffect(() => {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
		setLoading(true)
		api
			.get(`/users/${email}/`, config)
			.then((response) => {
				setUser(response.data)
				setContacts(response.data.contacts)
				setLoading(false)
			})
			.catch((err) => {
				console.log(`Deu erro no userEffects ${err}`)
				setLoading(false)
			})
	}, [email, token])
	console.log(user)
	console.log(contacts)
	if (isLoading) return <p>Loading...</p>
	if (!user) return <p>Usuário não encontrado</p>

	return <UserContext.Provider value={{ user, contacts }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
