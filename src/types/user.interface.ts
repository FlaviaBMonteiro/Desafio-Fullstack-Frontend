import { Dispatch, ReactNode, SetStateAction } from "react";
import { iContact, iContactCard } from "./contact.interface";

export interface iUser {
	id: number;
	email: string;
	name: string;
	phone: string;
	imgURL: string;
	contacts: iContact[];
	createdAt: string;
	updatedAt: string;
}

export interface iUserCard {
	id: number;
	email: string;
	name: string;
	phone: string;
	imgURL: string;
}

export interface iUserLogged {
	email?: string;
	token?: string;
}

export interface iUserLogin {
	email: string;
	password: string;
}
export interface iUserCreate {
	email: string;
	password: string;
	name: string;
	phone: string;
	imgURL: string;
}
export interface iUserUpdate {
	email?: string;
	password?: string;
	name?: string;
	phone?: string;
	imgURL?: string;
}

export interface iUserEmail {
	email: string;
}

export interface iUserProps {
	children: ReactNode;
}
export interface iUserData {
	isLoading: boolean;
	user: iUser | null;
	setUser: Dispatch<SetStateAction<iUser | null>>;
	getUser: () => Promise<void>;
	createUser: (data: iUserCreate) => Promise<void>;
	updateUser: (data: iUserUpdate, userId: string) => Promise<void>;
	contacts: iContactCard[];
}
