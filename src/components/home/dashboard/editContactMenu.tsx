import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuItemOption,
	MenuGroup,
	MenuOptionGroup,
	MenuDivider,
	IconButton,
} from "@chakra-ui/react"

interface Props {
	phone: string
	email: string
}

import { HamburgerIcon, EditIcon, CopyIcon, StarIcon, DeleteIcon } from "@chakra-ui/icons"

const EditContactMenu = ({ email, phone }: Props) => {
	const copyText = (text: string) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				console.log("Texto copiado:", text)
			})
			.catch((error) => {
				console.error("Erro ao copiar o texto:", error)
			})
	}
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
					<MenuItem icon={<DeleteIcon />}>Excluir contato</MenuItem>
				</MenuList>
			</Menu>
		</>
	)
}

export default EditContactMenu
