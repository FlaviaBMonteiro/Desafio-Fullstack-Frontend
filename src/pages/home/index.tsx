import { Grid } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import HomePage from "@/components/home/homepage"
import HeaderMenu from "@/components/home/headerMenu"
import nookies from "nookies"
import { iUserEmail } from "@/types/user.interface"

const Main = ({ email }: iUserEmail) => {
	return (
		<Grid>
			<HeaderMenu email={email} isLogged />
			<HomePage />
		</Grid>
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
		props: { email: cookies["kenzieEmail"] },
	}
}
