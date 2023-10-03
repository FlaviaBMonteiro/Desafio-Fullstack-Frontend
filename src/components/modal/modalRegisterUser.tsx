import {
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Modal,
	ModalBody,
	ModalContent,
	ModalCloseButton,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { iUserLogin } from "@/types/user.interface";
import { useAuthContext } from "@/context/authContext";

const ModalRegisterUser = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { login } = useAuthContext();

	const formSchema = yup.object().shape({
		email: yup.string().email("Deve ser um e-mail válido").required("E-mail obrigatório"),
		password: yup.string().required("Senha obrigatória"),
		name: yup
			.string()
			.min(3, "O nome deve conter pelo menos 3 caracteres")
			.required("Nome obrigatório"),
		phone: yup
			.string()
			.test("is-numeric", "O telefone deve conter apenas números", (value) => {
				if (!value) return true; // Permitir campo vazio
				return /^[0-9]+$/.test(value);
			})
			.test("is-length", "O telefone deve conter 11 caracteres", (value) => {
				if (!value) return true; // Permitir campo vazio
				return value.length === 11;
			})
			.required("Telefone obrigatório"),
		imgURL: yup
			.string()
			.test("is-image", "Apenas imagens são permitidas", (value) => {
				if (!value) return true; // Permitir campo vazio
				const supportedFormats = ["jpg", "jpeg", "png", "gif"]; // Formatos suportados
				const extension = value.split(".").pop(); // Obter extensão do arquivo
				return typeof extension === "string" && supportedFormats.includes(extension.toLowerCase());
			})
			.required("Imagem obrigatória"),
	});

	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");
	const [inputName, setInputName] = useState("");
	const [inputPhone, setInputPhone] = useState("");
	const [inputimgURL, setInputImgURL] = useState("");

	const emailError = inputEmail === "";
	const passwordError = inputPassword === "";
	const nameError = inputName === "";
	const PhoneError = inputPhone === "";
	const imgURLError = inputimgURL === "";

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<iUserLogin>({
		resolver: yupResolver(formSchema),
	});

	const onFormSubmit = (formData: iUserLogin) => {
		login(formData);
	};

	return (
		<>
			<Button variant="default" onClick={onOpen}>
				Login
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>L o g i n</ModalHeader>
					<ModalBody pb={6}>
						<FormControl id="email" isRequired isInvalid={emailError}>
							<FormLabel>E-mail</FormLabel>
							<Input
								required
								focusBorderColor="blue.300"
								errorBorderColor="red.300"
								type="email"
								{...register("email")}
								onChange={(e) => setInputEmail(e.target.value)}
							/>
							{!emailError ? (
								<FormHelperText>Digite seu e-mail</FormHelperText>
							) : (
								<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl id="password" isRequired isInvalid={passwordError}>
							<FormLabel>Senha</FormLabel>
							<InputGroup>
								<Input
									required
									focusBorderColor="blue.300"
									errorBorderColor="red.300"
									type={showPassword ? "text" : "password"}
									{...register("password")}
									onChange={(e) => setInputPassword(e.target.value)}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() => setShowPassword((showPassword) => !showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
							{!passwordError ? (
								<FormHelperText>digite sua senha</FormHelperText>
							) : (
								<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
							)}
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button
							size="lg"
							variant={"default"}
							onClick={handleSubmit(onFormSubmit)}
							_hover={{
								bg: "blue.700",
							}}
						>
							Entrar
						</Button>
						<Button size="lg" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalRegisterUser;
