import { theme } from "@/styles/globals";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/context/authContext";
import type { AppProps } from "next/app";
import { UserProvider } from "@/context/userContext";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<AuthProvider>
				<UserProvider>
					<Component {...pageProps} />
				</UserProvider>
			</AuthProvider>
		</ChakraProvider>
	);
}
