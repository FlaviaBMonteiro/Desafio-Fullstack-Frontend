import api from "@/services/api";
import { useState, useEffect, createContext, useContext } from "react";
import { iUser, iUserCreate, iUserData, iUserProps, iUserUpdate } from "@/types/user.interface";
import { iContactCard } from "@/types/contact.interface";
import { destroyCookie, parseCookies } from "nookies";
import { useToast } from "@chakra-ui/react";

export const UserContext = createContext<iUserData>({} as iUserData);

export const UserProvider = ({ children }: iUserProps) => {
	const [user, setUser] = useState<iUser | null>(null);
	const toast = useToast({
		position: "top",
		duration: 3000,
		isClosable: true,
		variant: "left-accent",
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

	const createUser = async (data: iUserCreate) => {
		await api
			.post<iUser>("/users", data)
			.then((resp) => {
				toast({ status: "success", title: "Usuário criado com sucesso!" });
				return true;
			})
			.catch((err) => {
				toast({ status: "error", description: err.response.data.message });
				throw err;
			});
	};

	const updateUser = async (data: iUserUpdate, userId: string) => {
		await api
			.patch<iUser>(`/users/${userId}`, data)
			.then(({ data }) => {
				setUser(data);
				toast({ status: "success", title: "Usuário atualizado com sucesso!" });
			})
			.catch((err) => {
				toast({ status: "error", description: err.response.data.message });
			});
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
