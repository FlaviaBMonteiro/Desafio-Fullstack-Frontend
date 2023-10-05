import api from "@/services/api";
import { useState, useEffect, createContext, useContext } from "react";
import { iUser, iUserCreate, iUserData, iUserProps, iUserUpdate } from "@/types/user.interface";
import { iContactCard } from "@/types/contact.interface";
import { destroyCookie, parseCookies } from "nookies";

import { getBearer, getAuthData } from "../utils/authUtils";
import CustomToast from "@/styles/toast";

export const UserContext = createContext<iUserData>({} as iUserData);

export const UserProvider = ({ children }: iUserProps) => {
	const [user, setUser] = useState<iUser | null>(null);
	const customToast = CustomToast();
	const [contacts, setContacts] = useState<iContactCard[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Verificar se o token existe e contém um email
	useEffect(() => {
		setIsLoading(true);
		const authData = getAuthData();
		if (authData) {
			const { email } = authData;
			if (email) {
				getUser();
			}
		}
		setIsLoading(false);
	}, []);

	const getUser = async () => {
		const authData = getAuthData();
		const config = getBearer();

		if (authData && config) {
			try {
				const { email } = authData;
				const response = await api.get(`/users/${email}/`, config);
				setUser(response.data);
				setIsLoading(false);
			} catch (err: any) {
				handleError(err);
			}
		} else {
			setIsLoading(false);
		}
	};

	const handleError = (err: any) => {
		const errorMessage = `${err.response.status} ${err.response.statusText}`;
		customToast.showToast(errorMessage, "error", err.response.data.message);
		destroyCookie(null, "KenzieToken", { path: "/" });
	};

	const createUser = async (data: iUserCreate) => {
		await api
			.post<iUser>("/users", data)
			.then((resp) => {
				customToast.showToast(
					`Usuário ${resp.data.name} criado`,
					"success",
					"Por favor, faça login."
				);
				return true;
			})
			.catch((err) => {
				handleError(err);
				throw err;
			});
	};

	const updateUser = async (data: iUserUpdate, userId: string) => {
		const authData = getAuthData();
		const config = getBearer();

		if (authData && config) {
			await api
				.patch<iUser>(`/users/${user?.id}`, data, config)
				.then(({ data }) => {
					setUser(data);
					customToast.showToast("", "success", "Dados atualizados");
				})
				.catch((err) => {
					handleError(err);
				});
		}
	};

	return (
		<UserContext.Provider
			value={{ isLoading, user, setUser, getUser, createUser, updateUser, contacts }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
