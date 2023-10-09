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
import DeleteConfirmationModal from "../modal/modalDeleteConfirmation";

const DeleteUser = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { deleteUser } = useUserContext();

	const onDelete = async () => {
		await deleteUser();
		onClose(); // Certifique-se de chamar onClose para fechar o modal após a exclusão.
	};

	return (
		<>
			<MenuItem bg={"blue.600"} color={"white"} onClick={onOpen}>
				Deletar Usuário
			</MenuItem>
			<DeleteConfirmationModal isOpen={isOpen} onClose={onClose} onDelete={onDelete} />
		</>
	);
};

export default DeleteUser;
