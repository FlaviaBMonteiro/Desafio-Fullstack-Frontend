import { ReactNode } from "react";
import { iUserLogin } from "./user.interface";

export interface iAuthContext {
	login: (userData: iUserLogin) => void;
	logout: () => void;
	userMail: string;
}

export interface iAuthtProps {
	children: ReactNode;
}

export interface iToken {
	token: string;
	email: string;
}
