import { Flex } from "@chakra-ui/react";
import { useUserContext } from "@/context/userContext";
import HeaderMenu from "@/components/home/headerMenu";
import Dashboard from "@/components/home/dashboard";
import HomePage from "@/components/home/homepage";

const Main = () => {
	const { user, isLoading } = useUserContext();

	return (
		<Flex h="100vh" w="100hw" direction="column">
			{isLoading ? (
				<Flex justifyContent="center" gap="5">
					<p>Carregando...</p>
				</Flex>
			) : (
				<>
					<HeaderMenu />
					{user ? (
						<Flex
							flexDirection="column"
							textAlign="center"
							bgGradient="linear(to-b, #ffffff 0%, #f8fcff 21%, #e7f3fe 51%, #75a1de 100%)"
						>
							<Dashboard />
						</Flex>
					) : (
						<HomePage />
					)}
				</>
			)}
		</Flex>
	);
};

export default Main;
