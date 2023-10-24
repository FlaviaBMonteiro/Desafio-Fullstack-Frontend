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
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteUser = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { deleteUser } = useUserContext();

	const onDelete = async () => {
		await deleteUser();
		onClose();
	};

	return (
		<>
			<MenuItem bg={"blue.600"} color={"white"} onClick={onOpen} icon={<DeleteIcon />}>
				Excluir Usuário
			</MenuItem>
			<DeleteConfirmationModal isOpen={isOpen} onClose={onClose} onDelete={onDelete} />
		</>
	);
};

export default DeleteUser;
