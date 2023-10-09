import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, IconButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, EditIcon, CopyIcon, StarIcon, DeleteIcon } from "@chakra-ui/icons";
import { useContactContext } from "@/context/contactContext";
import DeleteConfirmationModal from "../modal/modalDeleteConfirmation";

interface Props {
	phone: string;
	email: string;
	id: number;
}

const EditContactMenu = ({ id, email, phone }: Props) => {
	const { deleteContact } = useContactContext(); // Obtenha a função deleteContact do contexto
	const { isOpen, onOpen, onClose } = useDisclosure();

	const copyText = (text: string) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				console.log("Texto copiado:", text);
			})
			.catch((error) => {
				console.error("Erro ao copiar o texto:", error);
			});
	};
	const onDelete = async (id: number) => {
		deleteContact(id);
		onClose(); // Certifique-se de chamar onClose para fechar o modal após a exclusão.
	};

	return (
		<>
			<Menu>
				<MenuButton
					as={IconButton}
					aria-label="Options"
					icon={<HamburgerIcon />}
					variant="outline"
				/>
				<MenuList>
					<MenuItem onClick={() => alert("Kagebunshin")} icon={<EditIcon />}>
						Editar Contato
					</MenuItem>
					<MenuItem onClick={() => copyText(email)} icon={<CopyIcon />}>
						Copiar Email
					</MenuItem>
					<MenuItem onClick={() => copyText(phone)} icon={<CopyIcon />}>
						Copiar Telefone
					</MenuItem>
					<MenuItem icon={<StarIcon />}>Adicionar aos favoritos</MenuItem>
					<MenuItem onClick={onOpen}>Deletar Usuário</MenuItem>
					<DeleteConfirmationModal
						isOpen={isOpen}
						onClose={onClose}
						onDelete={() => onDelete(id)}
					/>
				</MenuList>
			</Menu>
		</>
	);
};

export default EditContactMenu;
