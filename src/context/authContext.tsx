import api from "@/services/api";
import { iUserEmail, iUserLogin } from "@/types//user.interface";
import { iAuthContext, iAuthtProps, iToken } from "@/types/auth.interface";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, useContext, useState } from "react";
import { useUserContext } from "./userContext";

export const AuthContext = createContext<iAuthContext>({} as iAuthContext);

export const AuthProvider = ({ children }: iAuthtProps) => {
	const router = useRouter();

	const { setUser, getUser } = useUserContext();
	const toast = useToast({
		position: "top",
		duration: 3000,
		isClosable: true,
	});

	const login = async (userData: iUserLogin) => {
		await api
			.post("login", userData)
			.then(async (response) => {
				toast({
					title: "Login realizado.",
					status: "success",
					description: "Logo você será redirecionado para o site.",
				});

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

				getUser(response.data.email);
				router.push("/home");
			})
			.catch((err) => {
				toast({
					title: "Erro ao fazer login",
					status: "error",
					description: err.message,
				});
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
