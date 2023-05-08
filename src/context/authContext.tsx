import api from "@/services/api";
import { iUserEmail, iUserLogin } from "@/types//user.interface";
import { iAuthContext, iAuthtProps, iToken } from "@/types/auth.interface";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext<iAuthContext>({} as iAuthContext);

export const AuthProvider = ({ children }: iAuthtProps) => {
	const toast = useToast();
	const router = useRouter();
	const [userMail, setUserMail] = useState("");
	const login = (userData: iUserLogin) => {
		api
			.post("login", userData)
			.then((response) => {
				const responseData = response.data as iToken;
				setUserMail(responseData.email);
				setCookie(null, "KenzieToken", responseData.token, {
					maxAge: 60 * 60 * 7,
					path: "/",
				});

				toast({
					title: "sucess",
					variant: "solid",
					position: "top-right",
					isClosable: true,
					render: () => (
						<Box color={"gray.50"} p={3} bg={"green.600"} fontWeight={"bold"} borderRadius={"md"}>
							Login realizado com sucesso !
						</Box>
					),
				});
				router.push("/home");
			})
			.catch((err) => {
				toast({
					title: "error",
					variant: "solid",
					position: "top-right",
					isClosable: true,
					render: () => (
						<Box color={"gray.50"} p={3} bg={"red.600"} fontWeight={"bold"} borderRadius={"md"}>
							Erro ao logar, verifique se o e-mail e senha estão corretos
						</Box>
					),
				});
			});
	};
	const logout = () => {
		destroyCookie(null, "KenzieToken");
		console;
		router.push("/");
	};
	return (
		<AuthContext.Provider value={{ userMail, login, logout }}>{children}</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
