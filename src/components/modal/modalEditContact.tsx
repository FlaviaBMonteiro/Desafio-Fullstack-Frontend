import React, { useEffect } from "react";
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spacer,
	Checkbox,
	useDisclosure,
	MenuItem,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { iContactUpdate } from "@/types/contact.interface";
import { useContactContext } from "@/context/contactContext";
import { EditIcon, SmallAddIcon } from "@chakra-ui/icons";
import CustomToast from "@/styles/toast";

interface Props {
	id: number;
	contactData: iContactUpdate;
}

const ModalEditContact = ({ contactData, id }: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { updateContact } = useContactContext();
	const customToast = CustomToast();

	const formSchema = yup.object().shape({
		id: yup.number(),
		email: yup.string().email("Por favor, digite um email válido"),
		name: yup.string().min(6, "O nome deve conter pelo menos 6 caracteres"),
		phone: yup
			.string()
			.matches(/^[0-9]{10,11}$/, "O telefone deve conter 10 ou 11 dígitos numéricos"),
		imgURL: yup
			.string()
			.url("a URL digitada não é uma imagem válida")
			.matches(/\.(jpeg|jpg|gif|png)$/i, "a URL da imagem deve terminar em jpeg, jpg, gif ou png")
			.max(300, "A URL deve conter menos de 300 caracteres"),
		isFavorite: yup.boolean(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<iContactUpdate>({
		resolver: yupResolver(formSchema),
		mode: "onChange",
		defaultValues: contactData, // Preencha o formulário com os dados do contato
	});

	useEffect(() => {
		reset(contactData); // Reseta o formulário com os novos dados quando o modal é aberto
	}, [contactData, reset]);

	const onFormSubmit = async (formData: iContactUpdate) => {
		try {
			if (formData.email === contactData.email) {
				delete formData.email;
			}
			await updateContact(formData, id);
			onClose();
		} catch (error) {
			customToast.showToast("Erro", "error", `${error}`);
		}
	};

	return (
		<>
			<MenuItem onClick={onOpen} icon={<EditIcon />}>
				Editar Contato
			</MenuItem>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign="center">Editar Contato</ModalHeader>
					<ModalBody pb={6}>
						<FormControl id="email" isRequired isInvalid={!!errors.email}>
							<FormLabel>E-mail</FormLabel>
							<Input
								required
								focusBorderColor="blue.300"
								errorBorderColor="red.300"
								type="email"
								{...register("email")}
								placeholder="Digite o email do contato"
								margin="-15px 0px 20px 0px"
							/>
							<FormErrorMessage margin="-20px 0px 0px 0px" fontSize="small">
								{errors.email?.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl id="name" isRequired isInvalid={!!errors.name}>
							<FormLabel>Nome</FormLabel>
							<Input
								required
								focusBorderColor="blue.300"
								errorBorderColor="red.300"
								type="text"
								{...register("name")}
								placeholder="Digite o nome do contato"
								margin="-15px 0px 20px 0px"
							/>
							<FormErrorMessage margin="-20px 0px 0px 0px" fontSize="small">
								{errors.name?.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl id="phone" isRequired isInvalid={!!errors.phone}>
							<FormLabel>Telefone</FormLabel>
							<Input
								required
								focusBorderColor="blue.300"
								errorBorderColor="red.300"
								type="tel"
								{...register("phone")}
								placeholder="Digite o telefone do contato"
								margin="-15px 0px 20px 0px"
							/>
							<FormErrorMessage margin="-20px 0px 0px 0px" fontSize="small">
								{errors.phone?.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl id="imgURL" isRequired isInvalid={!!errors.imgURL}>
							<FormLabel>Link da Imagem</FormLabel>
							<Input
								required
								focusBorderColor="blue.300"
								errorBorderColor="red.300"
								type="text"
								{...register("imgURL")}
								placeholder="Cole o endereço da imagem aqui"
								margin="-15px 0px 20px 0px"
							/>
							<FormErrorMessage margin="-20px 0px 0px 0px" fontSize="small">
								{errors.imgURL?.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl id="isFavorite" isInvalid={!!errors.isFavorite}>
							<Checkbox
								colorScheme="blue"
								{...register("isFavorite")}
								defaultChecked={contactData.isFavorite}
							>
								Marcar como favorito
							</Checkbox>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button size="lg" onClick={onClose}>
							Cancelar
						</Button>
						<Spacer />
						<Button
							size="lg"
							variant={"default"}
							onClick={handleSubmit(onFormSubmit)}
							_hover={{
								bg: "blue.700",
							}}
						>
							Salvar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalEditContact;
