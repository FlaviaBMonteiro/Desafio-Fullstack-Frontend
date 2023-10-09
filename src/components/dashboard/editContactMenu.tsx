import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { HamburgerIcon, EditIcon, CopyIcon, StarIcon, DeleteIcon } from "@chakra-ui/icons";
import { useContactContext } from "@/context/contactContext";

interface Props {
	phone: string;
	email: string;
	id: number;
}

const EditContactMenu = ({ id, email, phone }: Props) => {
	const { deleteContact } = useContactContext(); // Obtenha a função deleteContact do contexto

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

	const handleDeleteContact = (id: number) => {
		if (window.confirm("Tem certeza que deseja excluir este contato?")) {
			deleteContact(id);
		}
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
					<MenuItem onClick={() => handleDeleteContact(id)} icon={<DeleteIcon />}>
						Excluir contato
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
};

export default EditContactMenu;
