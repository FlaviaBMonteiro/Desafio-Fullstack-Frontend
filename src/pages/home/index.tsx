import { Grid, Flex, Box, Center } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import HomePage from "@/components/home/homepage"
import HeaderMenu from "@/components/home/headerMenu"
import nookies from "nookies"
import Dashboard from "@/components/home/dashboard"
import { UserProvider } from "@/context/userContext"

interface IHeaderProps {
	email?: string
	token?: string
}

const Main = ({ email, token }: IHeaderProps) => {
	return (
		<Box>
			<HeaderMenu email={email} isLogged />
			{email ? (
				<Flex
					mt="5"
					flexDirection="column"
					textAlign="center"
					h="85vh"
					bgGradient="linear(to-b, #ffffff 0%, #f8fcff 21%, #e7f3fe 51%, #75a1de 100%)"
				>
					<UserProvider email={email} token={token}>
						<Dashboard email={email} token={token} />
					</UserProvider>
				</Flex>
			) : (
				<>
					<HomePage />
				</>
			)}
		</Box>
	)
}

export default Main

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const cookies = nookies.get(ctx)
	if (!cookies["kenzieToken"]) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		}
	}
	return {
		props: { email: cookies["kenzieEmail"], token: cookies["kenzieToken"] },
	}
}
