import { useState, useEffect, createContext, useContext } from "react"
import api from "@/services/api"
import { iUser } from "@/types/user.interface"
import { iContact, iContactCard } from "@/types/contact.interface"
import { setCookie } from "nookies"
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
	const [userID, setuserID] = useState("")
	const [userName, setuserName] = useState("")
	const [userAvatar, setAvatar] = useState("")

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
				setuserID(response.data.id)
				setuserName(response.data.name)
				setAvatar(response.data.imgURL)
				setCookie(null, "kenzieTeste", response.data)
				setCookie(null, "kenzieUserID", userID)
				setCookie(null, "kenzieUserName", userName)
				setCookie(null, "kenzieUserAvatar", userAvatar)
			})
			.catch((err) => {
				console.log(`userEffects error ${err}`)
			})
		setLoading(false)
	}, [email, token, userAvatar, userID, userName])

	if (isLoading) return <p>Loading...</p>
	if (!user) return <p>Usuário não encontrado</p>

	return <UserContext.Provider value={{ user, contacts }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
