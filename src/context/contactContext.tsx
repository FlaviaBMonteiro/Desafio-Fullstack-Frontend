import api from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";
import { destroyCookie } from "nookies";
import { iContact, iContactCreate, iContactData, iContactUpdate } from "@/types/contact.interface";
import { iUserProps } from "@/types/user.interface";
import { getBearer } from "../utils/authUtils";
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
	};

	const createContact = async (data: iContactCreate) => {
		if (user && config) {
			await api
				.post<iContact>(`/contacts/`, data, config)
				.then((resp) => {
					customToast.showToast("Contato", "success", "Criado com sucesso.");
					addContactToList(resp.data);
				})
				.catch((err) => {
					const errorMessage = err.response.status + " " + err.response.statusText;
					customToast.showToast(errorMessage, "error", err.response.data.message);
					throw err;
				});
		}
	};

	const updateContact = async (data: iContactUpdate, contactId: number) => {
		if (contacts && config) {
			try {
				await api.patch<iContact>(`/contacts/${contactId}`, data, config);
				// Crie uma cópia dos contatos existentes
				const updatedContacts = [...contacts];
				// Encontre o índice do contato que está sendo atualizado
				const contactIndex = updatedContacts.findIndex((contact) => contact.id === contactId);
				if (contactIndex !== -1) {
					// Atualize os dados do contato na cópia
					updatedContacts[contactIndex] = {
						...updatedContacts[contactIndex],
						...data, // Aplicar as alterações do novo dado
					};
					// Atualize o estado com a nova cópia dos contatos
					setContacts(updatedContacts);
					customToast.showToast("Contato", "success", "Dados atualizados");
				}
			} catch (err: any) {
				const errorMessage = err.response.status + " " + err.response.statusText;
				customToast.showToast(errorMessage, "error", err.response.data.message);
				throw err;
			}
		}
	};

	const deleteContact = async (contactId: number) => {
		if (user && config) {
			try {
				await api.delete(`/contacts/${contactId}`, config);
				customToast.showToast("Contato", "success", "Contato excluído");
				setContacts(contacts.filter((contact) => contact.id !== contactId));
			} catch (err: any) {
				const errorMessage = err.response.status + " " + err.response.statusText;
				customToast.showToast(errorMessage, "error", err.response.data.message);
				throw err;
			}
		}
	};

	return (
		<ContactContext.Provider
			value={{ contacts, setContacts, getContacts, createContact, updateContact, deleteContact }}
		>
			{children}
		</ContactContext.Provider>
	);
};

export const useContactContext = () => useContext(ContactContext);
