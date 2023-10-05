import api from "@/services/api";
import { iUserEmail, iUserLogin } from "@/types//user.interface";
import { iAuthContext, iAuthData, iAuthtProps, iToken } from "@/types/auth.interface";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useContext, useState } from "react";
import { useUserContext } from "./userContext";

export const AuthContext = createContext<iAuthContext>({} as iAuthContext);

export const AuthProvider = ({ children }: iAuthtProps) => {
	const router = useRouter();

	const { user, setUser, getUser } = useUserContext();
	const toast = useToast({
		position: "top",
		duration: 3000,
		isClosable: true,
		variant: "left-accent",
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

				getUser();
				router.push("/home");
				return user;
			})
			.catch((err) => {
				toast({
					title: "Erro ao fazer login",
					status: "error",
					description: "email ou senha inválidos",
				});
			});
	};
	const logout = () => {
		destroyCookie(null, "KenzieToken");
		setUser(null);
		router.push("/");
	};

	const auth = (): iAuthData => {
		const cookies = parseCookies();
		const dataUser = cookies["KenzieToken"];

		if (dataUser) {
			const authData = JSON.parse(decodeURIComponent(dataUser));
			const { token, email } = authData;
			const authtoken = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			return { token, email, authtoken };
		} else {
			const token = "";
			const email = "";
			const authtoken = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			return { token, email, authtoken };
		}
	};

	return <AuthContext.Provider value={{ login, logout, auth }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
