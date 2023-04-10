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
} from "@chakra-ui/react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { iUserLogin } from "@/types/user.interface"
import { useAuth } from "@/context/authContext"

const ModalRegisterUser = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { login } = useAuth()
	const formschame = yup.object().shape({
		email: yup.string().email("deve ser um e-mail válido").required("e-mail obrigatório"),
		password: yup.string().required("Senha obrigatória"),
	})
	const [inputEmail, setInputEmail] = useState("")
	const [inputPassword, setInputPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)

	const emailError = inputEmail === ""
	const passwordError = inputPassword === ""

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<iUserLogin>({
		resolver: yupResolver(formschame),
	})

	const onFormSubmit = (formData: iUserLogin) => {
		login(formData)
	}

	return (
		<>
			<Button variant="default" onClick={onOpen}>
				Cadastre-se
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign="center">R E G I S T R A R</ModalHeader>
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
							onClick={handleSubmit(onFormSubmit)}
							_hover={{
								bg: "blue.700",
							}}
						>
							Entrar
						</Button>
						<Button mt="auto" size="lg" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ModalRegisterUser
