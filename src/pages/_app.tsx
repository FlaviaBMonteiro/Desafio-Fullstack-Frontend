import { theme } from "@/styles/globals";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { UserProvider } from "@/context/userContext";
import { AuthProvider } from "@/context/authContext";
import { ContactProvider } from "@/context/contactContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<UserProvider>
				<AuthProvider>
					<ContactProvider>
						<Component {...pageProps} />
					</ContactProvider>
				</AuthProvider>
			</UserProvider>
		</ChakraProvider>
	);
}

export default MyApp;
