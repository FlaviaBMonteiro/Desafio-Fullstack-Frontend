import React, { useState } from "react";
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	MenuItem,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spacer,
	useDisclosure,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserContext } from "@/context/userContext";
import { useAuthContext } from "@/context/authContext";
import { EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import CustomToast from "@/styles/toast";

const ModalEditPassword = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { updateUser } = useUserContext();
	const { logout } = useAuthContext();
	const [showPassword, setShowPassword] = useState(false);
	const customToast = CustomToast();

	const formSchema = yup.object().shape({
		password: yup
			.string()
			.min(6, "A senha deve conter pelo menos 6 caracteres")
			.required("A senha é obrigatória"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(formSchema),
		mode: "onChange",
	});

	const onFormSubmit = async (formData: any) => {
		try {
			await updateUser(formData);
			customToast.showToast(
				"Senha alterada com sucesso",
				"success",
				"Por favor, faça login novamente"
			);
			logout();
		} catch (error) {
			customToast.showToast("Erro", "error", `${error}`);
		}
	};

	return (
		<>
			<MenuItem bg={"blue.600"} color={"white"} onClick={onOpen} icon={<EditIcon />}>
				Alterar Senha
			</MenuItem>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign="center">Alterar Senha</ModalHeader>
					<ModalBody pb={6}>
						<FormControl id="password" isInvalid={!!errors.password}>
							<FormLabel>Senha</FormLabel>
							<InputGroup>
								<Input
									required
									focusBorderColor="blue.300"
									errorBorderColor="red.300"
									type={showPassword ? "text" : "password"}
									{...register("password")}
									placeholder="Digite uma nova senha para alterar"
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

export default ModalEditPassword;
