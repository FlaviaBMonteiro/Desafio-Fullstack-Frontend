import { Grid, Flex, Box, Center } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import HomePage from "@/components/home/homepage";
import HeaderMenu from "@/components/home/headerMenu";
import nookies from "nookies";
import Dashboard from "@/components/home/dashboard";
import { UserProvider } from "@/context/userContext";
import { iHeaderProps } from "@/types/user.interface";

const Main = ({ email, token }: iHeaderProps) => {
	return (
		<Box>
			<HeaderMenu />

			{email ? (
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
				<>
					<HomePage />
				</>
			)}
		</Box>
	);
};

export default Main;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const cookies = nookies.get(ctx);

	if (!cookies["KenzieToken"]) {
		return { redirect: { destination: "/", permanent: false } };
	}

	return { props: {} };
};
