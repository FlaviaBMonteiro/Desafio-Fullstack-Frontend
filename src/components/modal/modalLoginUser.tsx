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
import { iUserLogin } from "@/types/user.interface";
import { useAuthContext } from "@/context/authContext";
import { useState } from "react";

const ModalLoginUser = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { login } = useAuthContext();
	const [showPassword, setShowPassword] = useState(false);

	const formSchema = yup.object().shape({
		email: yup
			.string()
			.email("Por favor, digite um email válido")
			.required("Por favor, digite seu email"),
		password: yup.string().required("Por favor, digite sua senha"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<iUserLogin>({
		resolver: yupResolver(formSchema),
		mode: "onChange",
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
									type="password"
									{...register("password")}
									placeholder="Digite sua senha"
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

							<FormErrorMessage margin="-20px 0px 0px 0px">
								{errors.password?.message}
							</FormErrorMessage>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button size="lg" onClick={onClose}>
							Cancel
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
							Entrar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalLoginUser;
