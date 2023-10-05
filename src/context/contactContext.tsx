import api from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";
import { destroyCookie, parseCookies } from "nookies";
import { iContact, iContactCreate, iContactData } from "@/types/contact.interface";
import { iUserProps } from "@/types/user.interface";
import { useToast } from "@chakra-ui/react";
import { useAuthContext } from "./authContext";

export const ContactContext = createContext<iContactData>({} as iContactData);

export const ContactProvider = ({ children }: iUserProps) => {
	const [contacts, setContacts] = useState<iContact[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useUserContext();
	const { auth } = useAuthContext();
	const { token, email, authtoken } = auth();
	const toast = useToast({
		position: "top",
		duration: 3000,
		isClosable: true,
		variant: "left-accent",
	});

	const addContactToList = (contact: iContact) => {
		setContacts([...contacts, contact]);
		getContacts();
	};

	const getContacts = async () => {
		try {
			const response = await api.get(`/contacts/users/${user?.id}`, authtoken);
			setContacts(response.data.contacts);
		} catch (err: any) {
			toast({
				title: "Erro ao obter dados do usuário",
				status: "error",
				description: err.message,
			});
			destroyCookie(null, "KenzieToken", { path: "/" });
		}
	};

	const createContact = async (data: iContactCreate) => {
		await api
			.post<iContact>(`/contacts/`, data, authtoken)
			.then((resp) => {
				toast({ status: "success", title: "Usuário criado com sucesso!" });
				console.log(resp.data);
				addContactToList(resp.data);
			})
			.catch((err) => {
				toast({ status: "error", description: err.response.data.message });
				throw err;
			});
	};

	return (
		<ContactContext.Provider value={{ contacts, setContacts, createContact, getContacts }}>
			{children}
		</ContactContext.Provider>
	);
};

export const useContactContext = () => useContext(ContactContext);
