import logo from "../../../public/logo.png"
import Image from "next/image"
import { ReactNode } from "react"
import nookies from "nookies"
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
import { parseCookies } from "nookies"
import ModalLoginUser from "@/components/modal/modalLoginUser"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import React, { useContext } from "react"
import { useRouter } from "next/router"
import { destroyCookie } from "nookies"
import { iHeaderProps, iUser } from "@/types/user.interface"
import { UserContext, useUser } from "@/context/userContext"

const HeaderMenu = ({ id, name, email, avatar, token }: iHeaderProps) => {
	const router = useRouter()
	const cookies = parseCookies()
	const logout = () => {
		destroyCookie(null, "kenzieUserID")
		destroyCookie(null, "kenzieUserName")
		destroyCookie(null, "kenzieEmail")
		destroyCookie(null, "kenzieUserAvatar")
		destroyCookie(null, "kenzieToken")
		console
		router.push("/")
	}
	return (
		<>
			<Flex boxShadow="md" pr="6" pl="6" pt="2" pb="2" bg="blue.600" alignItems="center">
				<Box ml="10">
					<Image src={logo} alt="logo" />
				</Box>
				<Spacer />
				<Box mr="10">
					<Flex alignItems={"center"}>
						{token ? (
							<>
								<>
									<Text color={"white"} paddingRight={2}>
										{cookies.kenzieUserName}
									</Text>
									<Menu>
										<MenuButton
											as={Button}
											rounded={"full"}
											variant={"link"}
											cursor={"pointer"}
											minW={0}
										>
											<Avatar size={"sm"} src={cookies.kenzieUserAvatar} />
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
