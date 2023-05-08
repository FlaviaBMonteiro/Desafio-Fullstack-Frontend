import { ReactNode } from "react";
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

export interface iHeaderProps {
	email?: string;
	token?: string;
	id?: string;
	avatar?: string;
	name?: string;
}

export interface iUserEmail {
	email: string;
}

export interface iUserProps {
	children: ReactNode;
}

export interface iUserData {
	user?: iUser;
	contacts: iContactCard[];
}
