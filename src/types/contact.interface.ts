import { Dispatch, SetStateAction } from "react";
import { iUser } from "./user.interface";

export interface iContact {
	id: number;
	email: string;
	name: string;
	phone: string;
	imgURL: string;
	isFavorite: boolean;
	createdAt: string;
	updatedAt: string;
	user: iUser;
}

export interface iContactCard {
	id: number;
	email: string;
	name: string;
	phone: string;
	imgURL: string;
	isFavorite: boolean;
}
export interface iContactCreate {
	id?: number;
	email: string;
	name: string;
	phone: string;
	imgURL: string;
	isFavorite?: boolean;
}
export interface iContactUpdate {
	id: number;
	email?: string;
	name?: string;
	phone?: string;
	imgURL?: string;
	isFavorite?: boolean;
}

export interface iContactData {
	contacts: iContact[];
	createContact: (data: iContactCreate) => Promise<void>;
	setContacts: Dispatch<SetStateAction<iContact[]>>;
	getContacts: () => Promise<void>;
}
