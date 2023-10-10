import { Center, Heading, Flex } from "@chakra-ui/react";
import image from "../../../public/image.png";
import Image from "next/image";
import ModalRegisterUser from "../modal/modalRegisterUser";

const HomePage = () => {
	return (
		<Flex h="90vh">
			<Center
				mt="5"
				flexDirection="column"
				textAlign="center"
				bgGradient="linear(to-b, #ffffff 0%, #f8fcff 21%, #e7f3fe 51%, #75a1de 100%)"
			>
				<Heading as="h1" size="xl" fontWeight="black" mt="1rem" mb="2rem">
					TENHA ACESSO A TODOS OS SEUS CONTATOS DE FORMA RÁPIDA E ORGANIZADA
				</Heading>
				<ModalRegisterUser />
				<Center mt="6rem" mb="0rem" padding="2rem">
					<Image src={image} alt="Pessoas usando computador e celular" />
				</Center>
			</Center>
		</Flex>
	);
};

export default HomePage;
