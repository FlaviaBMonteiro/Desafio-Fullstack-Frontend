import { Grid } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import HomePage from "@/components/home/homepage"
import HeaderMenu from "@/components/home/headerMenu"
import nookies from "nookies"
import { iUserEmail } from "@/types/user.interface"
import { useState } from "react"
import Dashboard from "@/components/home/dashboard"
import UserProvider from "@/context/userContext"

interface IHeaderProps {
	email?: string
	token?: string
}

const Main = ({ email, token }: IHeaderProps) => {
	return (
		<Grid>
			<HeaderMenu email={email} isLogged />
			{email ? (
				<>
					<UserProvider email={email} token={token} />
					<Dashboard email={email} token={token} />
				</>
			) : (
				<>
					<HomePage />
				</>
			)}
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
		props: { email: cookies["kenzieEmail"], token: cookies["kenzieToken"] },
	}
}
