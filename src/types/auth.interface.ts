import { ReactNode } from "react";
import { iUserLogin } from "./user.interface";

export interface iAuthtProps {
	children: ReactNode;
}

export interface iToken {
	token: string;
	email: string;
}
export interface iAuthContext {
	login: (userData: iUserLogin) => void;
	logout: () => void;
	auth: () => iAuthData;
}

export interface iAuthData {
	token: string;
	email: string;
	authtoken: { headers: { Authorization: string } };
}
