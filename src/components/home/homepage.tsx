import { Box, Center, Button, Heading } from "@chakra-ui/react";
import image from "../../../public/image.png";
import Image from "next/image";
import ModalRegisterUser from "../modal/modalRegisterUser";

const HomePage = () => {
	return (
		<>
			<Center
				mt="5"
				flexDirection="column"
				textAlign="center"
				h="85vh"
				bgGradient="linear(to-b, #ffffff 0%, #f8fcff 21%, #e7f3fe 51%, #75a1de 100%)"
			>
				<Heading as="h1" size="xl" fontWeight="black" mt="auto" mb="auto">
					TENHA ACESSO A TODOS OS SEUS CONTATOS DE FORMA RÁPIDA E ORGANIZADA
				</Heading>

				<Center mt="auto" mb="auto">
					<Image src={image} alt="Pessoas usando computador e celular" />
				</Center>
			</Center>
		</>
	);
};

export default HomePage;
