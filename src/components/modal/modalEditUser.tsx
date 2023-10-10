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
	useDisclosure,
	Spacer,
	MenuItem,
	Checkbox,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditIcon } from "@chakra-ui/icons";
import { iUserUpdate } from "@/types/user.interface";
import { useUserContext } from "@/context/userContext";
import { useEffect, useState } from "react";
import CustomToast from "@/styles/toast";

const ModalEditUser = ({ user }: { user: iUserUpdate }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { updateUser } = useUserContext();
	const customToast = CustomToast();
	const [useImage, setUseImage] = useState(false);

	const formSchema = yup.object().shape({
		email: yup.string().email("Por favor, digite um email válido"),
		name: yup.string().min(3, "O nome deve conter pelo menos 3 caracteres"),
		phone: yup
			.string()
			.matches(/^[0-9]{10,11}$/, "O telefone deve conter 10 ou 11 dígitos numéricos"),
		imgURL: yup
			.string()
			.url("a URL digitada não é uma imagem valida")
			.matches(/\.(jpeg|jpg|gif|png)$/i, "a URL da imagem deve terminar em jpeg, jpg, gif ou png")
			.max(300, "A URL deve conter menos de 300 caracteres"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<iUserUpdate>({
		resolver: yupResolver(formSchema),
		mode: "onChange",
		defaultValues: user,
	});

	useEffect(() => {
		if (isOpen) {
			reset(user);
		}
	}, [isOpen, reset, user]);

	const onImageCheckboxChange = () => {
		setUseImage(!useImage);
		if (!useImage) {
			reset({ ...user, imgURL: "" });
		}
	};

	const onFormSubmit = async (formData: iUserUpdate) => {
		try {
			if (formData.email === (user.email || "")) {
				delete formData.email;
			}
			await updateUser(formData);
			onClose();
		} catch (error) {
			customToast.showToast("Erro", "error", `${error}`);
		}
	};

	return (
		<>
			<MenuItem bg={"blue.600"} color={"white"} onClick={onOpen} icon={<EditIcon />}>
				Editar Usuário
			</MenuItem>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign="center">Editar Usuário</ModalHeader>
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
						<FormControl id="imgURL" isDisabled={useImage} isInvalid={!!errors.imgURL}>
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
						<FormControl display="flex" alignItems="center">
							<Checkbox isChecked={useImage} onChange={onImageCheckboxChange} size="lg">
								Não Usar Imagem
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

export default ModalEditUser;
