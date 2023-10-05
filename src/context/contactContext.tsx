import api from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";
import { destroyCookie, parseCookies } from "nookies";
import { iContact, iContactCreate, iContactData } from "@/types/contact.interface";
import { iUserProps } from "@/types/user.interface";
import { getBearer, getAuthData } from "../utils/authUtils";
import CustomToast from "@/styles/toast";

export const ContactContext = createContext<iContactData>({} as iContactData);

export const ContactProvider = ({ children }: iUserProps) => {
	const [contacts, setContacts] = useState<iContact[]>([]);
	const { user } = useUserContext();
	const customToast = CustomToast();
	const config = getBearer();

	const addContactToList = (contact: iContact) => {
		setContacts([...contacts, contact]);
		getContacts();
	};

	const getContacts = async () => {
		if (user && config) {
			try {
				const response = await api.get(`/contacts/users/${user.id}`, config);
				setContacts(response.data.contacts);
			} catch (err: any) {
				const errorMessage = err.response.status + " " + err.response.statusText;
				customToast.showToast(errorMessage, "error", err.response.data.message);
				destroyCookie(null, "KenzieToken", { path: "/" });
			}
		}
		customToast.showToast("Erro ao carregar", "error", "Faça login novamente");
		destroyCookie(null, "KenzieToken", { path: "/" });
	};

	const createContact = async (data: iContactCreate) => {
		if (user && config) {
			await api
				.post<iContact>(`/contacts/`, data, config)
				.then((resp) => {
					customToast.showToast("", "sucess", "Contato adicionado");
					console.log(resp.data);
					addContactToList(resp.data);
				})
				.catch((err) => {
					const errorMessage = err.response.status + " " + err.response.statusText;
					customToast.showToast(errorMessage, "error", err.response.data.message);
					throw err;
				});
		}
		customToast.showToast("Erro ao carregar", "error", "Faça login novamente");
	};

	return (
		<ContactContext.Provider value={{ contacts, setContacts, createContact, getContacts }}>
			{children}
		</ContactContext.Provider>
	);
};

export const useContactContext = () => useContext(ContactContext);
