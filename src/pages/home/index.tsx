import Landscape from "@/components/home/landscape"
import ModalLoginUser from "@/components/home/modalLoginUser"
import { Flex, Box, Spacer, Button, Grid } from "@chakra-ui/react"
import logo from "../../../public/logo.png"
import Image from "next/image"

const Main = () => {
	return (
		<Grid>
			<Flex boxShadow="md" p="6" bg="blue.600">
				<Box ml="10">
					<Image src={logo} alt="logo" />
				</Box>
				<Spacer />
				<Box mr="10">
					<ModalLoginUser />
				</Box>
			</Flex>

			<Landscape />
		</Grid>
	)
}

export default Main
