import {
	Button,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	useDisclosure,
	MenuItem,
} from "@chakra-ui/react";

import { useUserContext } from "@/context/userContext";
import React from "react";

const DeleteUser = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { deleteUser } = useUserContext();
	const cancelRef = React.useRef<HTMLElement | null>(null);

	const onDelete = async () => {
		await deleteUser();
		onClose;
	};

	return (
		<>
			<MenuItem bg={"blue.600"} color={"white"} onClick={onOpen}>
				Deletar Usuário
			</MenuItem>
			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Deletar Usuário
						</AlertDialogHeader>

						<AlertDialogBody>
							Tem certeza de que deseja deletar sua conta? Essa ação é irreversível.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button onClick={onClose} colorScheme="blue">
								Cancelar
							</Button>
							<Button onClick={onDelete} colorScheme="red" ml={3}>
								Deletar
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};

export default DeleteUser;
