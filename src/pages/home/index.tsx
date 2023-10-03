import { Box, Flex } from "@chakra-ui/react";
import { useUserContext } from "@/context/userContext";
import HeaderMenu from "@/components/home/headerMenu";
import Dashboard from "@/components/home/dashboard";
import HomePage from "@/components/home/homepage";
import { parseCookies } from "nookies";

const Main = () => {
	const { user, isLoading } = useUserContext();

	return (
		<Box>
			{isLoading ? (
				<Flex justifyContent="center" gap="5">
					<p>Carregando...</p>
				</Flex>
			) : (
				<>
					<HeaderMenu />
					{user ? (
						<Flex
							mt="5"
							flexDirection="column"
							textAlign="center"
							h="85vh"
							bgGradient="linear(to-b, #ffffff 0%, #f8fcff 21%, #e7f3fe 51%, #75a1de 100%)"
						>
							<Dashboard />
						</Flex>
					) : (
						<HomePage />
					)}
				</>
			)}
		</Box>
	);
};

export default Main;
