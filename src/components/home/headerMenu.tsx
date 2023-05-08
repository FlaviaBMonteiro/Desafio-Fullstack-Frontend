import logo from "../../../public/logo.png";
import Image from "next/image";
import {
	Box,
	Flex,
	Avatar,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Text,
	Spacer,
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import ModalLoginUser from "@/components/modal/modalLoginUser";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/authContext";

const HeaderMenu = () => {
	const router = useRouter();
	const cookies = parseCookies();
	const { logout } = useAuthContext();
	return (
		<>
			<Flex boxShadow="md" pr="6" pl="6" pt="2" pb="2" bg="blue.600" alignItems="center">
				<Box ml="10">
					<Image src={logo} alt="logo" />
				</Box>
				<Spacer />
				<Box mr="10">
					<Flex alignItems={"center"}>
						{cookies.KenzieToken ? (
							<>
								<>
									<Text color={"white"} paddingRight={2}>
										{}
									</Text>
									<Menu>
										<MenuButton
											as={Button}
											rounded={"full"}
											variant={"link"}
											cursor={"pointer"}
											minW={0}
										>
											<Avatar size={"sm"} src="" />
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
	);
};

export default HeaderMenu;
