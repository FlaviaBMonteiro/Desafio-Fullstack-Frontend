import api from "@/services/api";
import { iUserLogin } from "@/types//user.interface";
import { iAuthContext, iAuthData, iAuthtProps, iToken } from "@/types/auth.interface";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useContext, useState } from "react";
import { useUserContext } from "./userContext";
import CustomToast from "@/styles/toast";

export const AuthContext = createContext<iAuthContext>({} as iAuthContext);

export const AuthProvider = ({ children }: iAuthtProps) => {
	const router = useRouter();
	const { user, setUser, getUser } = useUserContext();
	const customToast = CustomToast();

	const login = async (userData: iUserLogin) => {
		await api
			.post("login", userData)
			.then(async (response) => {
				customToast.showToast("Login", "success", "Seja bem vindo");

				// Criar um objeto JSON com o token e o e-mail
				const authData = {
					token: response.data.token,
					email: response.data.email,
				};

				// Converter o objeto JSON em uma string
				const authDataString = JSON.stringify(authData);

				// Armazenar a string no cookie
				setCookie(null, "KenzieToken", authDataString, {
					maxAge: 60 * 60 * 7,
					path: "/",
				});

				getUser();
				router.push("/home");
				return user;
			})
			.catch((err) => {
				const errorMessage = err.response.status + " " + err.response.statusText;
				customToast.showToast(errorMessage, "error", err.response.data.message);
			});
	};
	const logout = () => {
		destroyCookie(null, "KenzieToken");
		setUser(null);
		router.push("/");
	};

	return <AuthContext.Provider value={{ login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
