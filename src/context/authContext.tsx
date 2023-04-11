import api from "@/services/api"
import { iUser, iUserLogin, iProviderProps } from "@/types//user.interface"
import { Box, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { setCookie } from "nookies"
import { createContext, useContext, useState } from "react"

interface AuthProviderData {
	login: (userData: iUserLogin) => void
	uMail: string
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData)

export const AuthProvider = ({ children }: iProviderProps) => {
	const [uMail, setuMail] = useState("")
	const toast = useToast()
	const router = useRouter()
	const login = (userData: iUserLogin) => {
		api
			.post("login", userData)
			.then((response) => {
				setCookie(null, "kenzieToken", response.data.token)
				setCookie(null, "kenzieEmail", response.data.email)
				console.log(`Auth Response?: ${response.data.email}`)
				setuMail(response.data.email)
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
				})
				router.push("/home")
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
				})
			})
	}
	return <AuthContext.Provider value={{ login, uMail }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
