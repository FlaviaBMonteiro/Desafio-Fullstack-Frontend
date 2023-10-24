import { theme } from "@/styles/globals";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { UserProvider } from "@/context/userContext";
import { AuthProvider } from "@/context/authContext";
import { ContactProvider } from "@/context/contactContext";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<UserProvider>
				<AuthProvider>
					<ContactProvider>
						<Head>
							<title>Contatos Digitais</title> {/* Defina o título globalmente aqui */}
						</Head>
						<Component {...pageProps} />
					</ContactProvider>
				</AuthProvider>
			</UserProvider>
		</ChakraProvider>
	);
}

export default MyApp;
