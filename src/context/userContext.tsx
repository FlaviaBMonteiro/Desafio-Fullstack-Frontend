import { useState, useEffect, createContext, useContext } from "react";
import api from "@/services/api";
import { iUser, iUserData, iUserProps } from "@/types/user.interface";
import { iContactCard } from "@/types/contact.interface";
import { parseCookies } from "nookies";

import { useAuthContext } from "./authContext";

export const UserContext = createContext<iUserData>({} as iUserData);

export const UserProvider = ({ children }: iUserProps) => {
	const [user, setUser] = useState<iUser | undefined>(undefined);
	const [contacts, setContacts] = useState<iContactCard[]>([]);
	const { userMail } = useAuthContext();

	const getClient = async () => {
		const cookies = parseCookies();
		const config = {
			headers: {
				Authorization: `Bearer ${cookies.KenzieToken}`,
			},
		};

		api
			.get(`/users/${userMail}/`, config)
			.then((response) => {
				setUser(response.data);
				setContacts(response.data.contacts);
			})
			.catch((err) => {
				console.log(`User error ${err}`);
			});
	};

	return <UserContext.Provider value={{ user, contacts }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
