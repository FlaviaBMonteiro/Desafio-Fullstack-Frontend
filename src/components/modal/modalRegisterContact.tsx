import React, { useState } from "react";
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	Spacer,
	Checkbox,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { iContactCreate } from "@/types/contact.interface";
import { useContactContext } from "@/context/contactContext";

// Importe o contexto de contato

const ModalRegisterContact = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { createContact } = useContactContext(); // Use o contexto de contato

	const formSchema = yup.object().shape({
		email: yup
			.string()
			.email("Por favor, digite um email válido")
			.required("Por favor, digite um email válido"),
		name: yup
			.string()
			.required("Por favor, digite um nome válido")
			.min(3, "O nome deve conter pelo menos 3 caracteres"),
		phone: yup
			.string()
			.required("Por favor, digite um telefone válido")
			.matches(/^[0-9]{10,11}$/, "O telefone deve conter 10 ou 11 dígitos numéricos"),
		imgURL: yup
			.string()
			.required("Por favor, digite a URL da imagem")
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
	} = useForm<iContactCreate>({
		resolver: yupResolver(formSchema),
		mode: "onChange",
	});

	const onFormSubmit = async (formData: iContactCreate) => {
		try {
			await createContact(formData);
			reset();
			onClose();
		} catch (error) {
			console.log("Erro", error);
		}
	};

	return (
		<>
			<Button variant="default" onClick={onOpen} mt="5vh">
				Novo Contato
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign="center">Adicionar Contato</ModalHeader>
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
							<Checkbox colorScheme="blue" {...register("isFavorite")}>
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
							Adicionar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalRegisterContact;
