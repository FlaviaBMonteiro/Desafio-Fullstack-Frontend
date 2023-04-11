import logo from "../../../public/logo.png"
import Image from "next/image"
import { ReactNode } from "react"
import {
	Box,
	Flex,
	Avatar,
	HStack,
	Link,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useDisclosure,
	Stack,
	Text,
	Spacer,
} from "@chakra-ui/react"
import ModalLoginUser from "@/components/modal/modalLoginUser"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router"
import { destroyCookie } from "nookies"
import { useAuth } from "@/context/authContext"

interface IHeaderProps {
	email?: string
	isLogged?: boolean
}

const HeaderMenu = ({ email, isLogged = false }: IHeaderProps) => {
	const { uMail } = useAuth()
	const router = useRouter()
	const logout = () => {
		destroyCookie(null, "kenzieToken")
		destroyCookie(null, "kenzieEmail")

		router.push("/")
	}
	if (!email) {
		isLogged = false
	}
	console.log(`Está logado?: ${isLogged}`)
	return (
		<>
			<Flex boxShadow="md" pr="6" pl="6" pt="2" pb="2" bg="blue.600" alignItems="center">
				<Box ml="10">
					<Image src={logo} alt="logo" />
				</Box>
				<Spacer />
				<Box mr="10">
					<Flex alignItems={"center"}>
						{isLogged ? (
							<>
								{console.log(`Sim, estou logado ${uMail}`)}
								<>
									<Text color={"white"} paddingRight={2}>
										{email}
									</Text>
									<Menu>
										<MenuButton
											as={Button}
											rounded={"full"}
											variant={"link"}
											cursor={"pointer"}
											minW={0}
										>
											<Avatar size={"sm"} src={""} />
										</MenuButton>
										<MenuList bg={"blue.600"}>
											<MenuItem bg={"blue.600"} color={"white"} onClick={() => logout()}>
												Sair
											</MenuItem>
										</MenuList>
									</Menu>
								</>
							</>
						) : (
							<>
								{console.log("Nao")}
								<ModalLoginUser />
							</>
						)}
					</Flex>
				</Box>
			</Flex>
		</>
	)
}

export default HeaderMenu
