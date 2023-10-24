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

import ModalLoginUser from "@/components/modal/modalLoginUser";
import { useAuthContext } from "@/context/authContext";
import { useUserContext } from "@/context/userContext";
import DeleteUser from "../dashboard/deleteUser";
import { SmallCloseIcon } from "@chakra-ui/icons";
import ModalEditUser from "../modal/modalEditUser";
import ModalEditPassword from "../modal/modalEditPassword";

const HeaderMenu = () => {
	const { logout } = useAuthContext();
	const { user } = useUserContext();

	return (
		<>
			<Flex boxShadow="md" pr="6" pl="6" pt="2" pb="2" bg="blue.600" alignItems="center" h="10vh">
				<Box ml={{ base: "0", md: "10" }}>
					<Image src={logo} alt="logo" />
				</Box>
				<Spacer />
				<Box mr={{ base: "0", md: "10" }}>
					<Flex alignItems={"center"}>
						{user ? (
							<>
								<Text color={"white"} paddingRight={2}>
									{user.name}
								</Text>
								<Menu>
									<MenuButton
										as={Button}
										rounded={"full"}
										variant={"link"}
										cursor={"pointer"}
										minW={0}
									>
										<Avatar size={"sm"} src={user.imgURL} />
									</MenuButton>
									<MenuList bg={"blue.600"}>
										<ModalEditUser user={user} />
										<ModalEditPassword /> <DeleteUser />
										<MenuItem
											bg={"blue.600"}
											color={"white"}
											icon={<SmallCloseIcon />}
											onClick={() => logout()}
										>
											Sair
										</MenuItem>
									</MenuList>
								</Menu>
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
