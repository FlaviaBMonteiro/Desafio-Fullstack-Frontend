import React from "react";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
} from "@chakra-ui/react";

interface DeleteConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onDelete: (id?: number) => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
	isOpen,
	onClose,
	onDelete,
}) => {
	const cancelRef = React.useRef<HTMLElement | null>(null);

	const handleDelete = () => {
		onDelete();
		onClose();
	};

	return (
		<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						Excluir
					</AlertDialogHeader>
					<AlertDialogBody>
						Tem certeza de que deseja excluir? Esta ação é irreversível.
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button onClick={onClose} colorScheme="blue">
							Cancelar
						</Button>
						<Button onClick={handleDelete} colorScheme="red" ml={3}>
							Excluir
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default DeleteConfirmationModal;
