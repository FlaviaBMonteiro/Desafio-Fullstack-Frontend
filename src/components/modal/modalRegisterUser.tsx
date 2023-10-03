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
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { iUserCreate } from "@/types/user.interface";
import { useUserContext } from "@/context/userContext";
import { useState } from "react";

const ModalRegisterUser = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { createUser } = useUserContext();
	const [showPassword, setShowPassword] = useState(false);

	const formSchema = yup.object().shape({
		email: yup
			.string()
			.email("Por favor, digite um email válido")
			.required("Por favor, digite um email válido"),
		password: yup.string().required("Por favor, digite uma senha válida"),
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
			.url("a URL digitada não é uma imagem valida")
			.matches(/\.(jpeg|jpg|gif|png)$/i, "a URL da imagem deve terminar em jpeg, jpg, gif ou png")
			.max(300, "A URL deve conter menos de 300 caracteres"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<iUserCreate>({
		resolver: yupResolver(formSchema),
		mode: "onChange", // Ative o modo onChange para validação em tempo real
	});

	const onFormSubmit = async (formData: iUserCreate) => {
		try {
			await createUser(formData);
			onClose();
		} catch (error) {
			// Lida com erros de registro, se necessário
		}
	};

	return (
		<>
			<Button variant="default" onClick={onOpen}>
				Registre-se
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign="center">R e g i s t r o</ModalHeader>
					<ModalBody pb={6}>
						<FormControl id="email" isRequired isInvalid={!!errors.email}>
							<FormLabel>E-mail</FormLabel>
							<Input
								required
								focusBorderColor="blue.300"
								errorBorderColor="red.300"
								type="email"
								{...register("email")}
								placeholder="Digite seu email"
								margin="-15px 0px 20px 0px"
							/>
							<FormErrorMessage margin="-20px 0px 0px 0px" fontSize="small">
								{errors.email?.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl id="password" isRequired isInvalid={!!errors.password}>
							<FormLabel>Senha</FormLabel>
							<InputGroup>
								<Input
									required
									focusBorderColor="blue.300"
									errorBorderColor="red.300"
									type={showPassword ? "text" : "password"}
									{...register("password")}
									placeholder="Crie uma senha"
									margin="-8px 0px 20px 0px"
								/>
								<InputRightElement h={"full"}>
									<Button
										margin="-8px 0px 20px 0px"
										variant={"ghost"}
										onClick={() => setShowPassword((showPassword) => !showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
							<FormErrorMessage margin="-20px 0px 0px 0px" fontSize="small">
								{errors.password?.message}
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
								placeholder="Digite seu nome"
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
								placeholder="Digite seu telefone"
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
							Registrar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalRegisterUser;
