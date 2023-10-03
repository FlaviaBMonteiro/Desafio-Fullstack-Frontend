/* eslint-disable react-hooks/exhaustive-deps */
// userContext.tsx
import { useState, useEffect, createContext, useContext } from "react";
import api from "@/services/api";
import { iUser, iUserData, iUserProps } from "@/types/user.interface";
import { iContactCard } from "@/types/contact.interface";
import { destroyCookie, parseCookies } from "nookies";

import { useAuthContext } from "./authContext";
import { useToast } from "@chakra-ui/react";

export const UserContext = createContext<iUserData>({} as iUserData);

export const UserProvider = ({ children }: iUserProps) => {
	const [user, setUser] = useState<iUser | null>(null);
	const toast = useToast({
		position: "top",
		duration: 3000,
		isClosable: true,
	});
	const [contacts, setContacts] = useState<iContactCard[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Verificar se o token existe e contém um email
	useEffect(() => {
		setIsLoading(true);
		const cookies = parseCookies();
		const dataUser = cookies["KenzieToken"];

		if (dataUser) {
			const authData = JSON.parse(decodeURIComponent(dataUser));
			const { email } = authData;

			if (email) {
				getUser();
			}
		}
		setIsLoading(false);
	}, []);

	const getUser = async () => {
		const cookies = parseCookies();
		const dataUser = cookies["KenzieToken"];
		setIsLoading(true);

		if (dataUser) {
			const authData = JSON.parse(decodeURIComponent(dataUser));
			const { token, email } = authData;
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			try {
				const response = await api.get(`/users/${email}/`, config);
				setUser(response.data);
				setContacts(response.data.contacts);
				setIsLoading(false);
			} catch (err: any) {
				console.error("Erro ao obter dados do usuário:", err);
				toast({
					title: "Erro ao obter dados do usuário",
					status: "error",
					description: err.message,
				});
				destroyCookie(null, "KenzieToken", { path: "/" });
			}
		}
	};

	return (
		<UserContext.Provider value={{ user, setUser, getUser, isLoading, contacts }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
