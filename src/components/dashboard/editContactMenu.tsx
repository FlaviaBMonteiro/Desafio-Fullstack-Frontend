import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, IconButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, EditIcon, CopyIcon, StarIcon, DeleteIcon } from "@chakra-ui/icons";
import { useContactContext } from "@/context/contactContext";
import DeleteConfirmationModal from "../modal/modalDeleteConfirmation";
import CustomToast from "@/styles/toast";
import FavoriteButton from "./favoriteButton";
import ModalEditContact from "../modal/modalEditContact";
import { iContactCard } from "@/types/contact.interface";

const EditContactMenu = ({ id, email, name, phone, imgURL, isFavorite }: iContactCard) => {
	const data = { id, email, name, phone, imgURL, isFavorite };
	const { updateContact, deleteContact } = useContactContext(); // Obtenha a função deleteContact do contexto
	const { isOpen, onOpen, onClose } = useDisclosure();
	const customToast = CustomToast();

	const copyText = (text: string) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				customToast.showToast("Sucesso", "success", `${text} copiado`);
			})
			.catch((error) => {
				customToast.showToast("Erro", "error", error);
			});
	};
	const onDelete = async (id: number) => {
		deleteContact(id);
		onClose(); // Certifique-se de chamar onClose para fechar o modal após a exclusão.
	};

	const toggleFavorite = () => {
		// Determine a ação com base no estado atual de isFavorite
		const action = isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos";

		// Crie um objeto com a propriedade isFavorite atualizada
		const updatedData = {
			isFavorite: !isFavorite,
		};

		// Chame a função de contexto para atualizar apenas a propriedade isFavorite
		updateContact(updatedData, id);
	};

	return (
		<>
			<MenuButton
				as={IconButton}
				aria-label="Options"
				icon={<HamburgerIcon />}
				background="transparent"
				color="blue.50"
				border="transparent"
				_hover={{
					// Define o estilo quando o mouse estiver sobre o botão
					background: "transparent",
					color: "blue.500", // Altera a cor do ícone para blue.500 quando o mouse estiver sobre ele
				}}
			/>
			<MenuList>
				<ModalEditContact contactData={data} id={id} />
				<MenuItem onClick={() => copyText(email)} icon={<CopyIcon />}>
					Copiar Email
				</MenuItem>
				<MenuItem onClick={() => copyText(phone)} icon={<CopyIcon />}>
					Copiar Telefone
				</MenuItem>

				<FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />

				<MenuItem onClick={onOpen} icon={<DeleteIcon />}>
					Excluir Contato
				</MenuItem>
				<DeleteConfirmationModal isOpen={isOpen} onClose={onClose} onDelete={() => onDelete(id)} />
			</MenuList>
		</>
	);
};

export default EditContactMenu;
