import { theme } from "@/styles/globals";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { UserProvider } from "@/context/userContext";
import { useUserContext } from "@/context/userContext";
import { AuthProvider } from "@/context/authContext";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const cookies = parseCookies();
	const userToken = cookies["KenzieToken"];

	return (
		<ChakraProvider theme={theme}>
			<UserProvider>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</UserProvider>
		</ChakraProvider>
	);
}

export default MyApp;
