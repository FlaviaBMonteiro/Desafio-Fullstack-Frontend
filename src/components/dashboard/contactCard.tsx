import { iContactCard } from "@/types/contact.interface";
import EditContactMenu from "./editContactMenu";
import {
	Card,
	CardHeader,
	Flex,
	Spacer,
	Container,
	IconButton,
	CardBody,
	Avatar,
	CardFooter,
	Heading,
	Text,
	Menu,
} from "@chakra-ui/react";
import { StarIcon, PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { useState } from "react";

const ContactCard = ({ id, email, name, phone, imgURL, isFavorite }: iContactCard) => {
	const [viewContact, setviewContact] = useState(phone);

	const changePhone = () => {
		setviewContact(phone);
	};
	const changeEmail = () => {
		setviewContact(email);
	};
	return (
		<Card h="400px" gap="1">
			<CardHeader>
				<Flex>
					<IconButton
						colorScheme="blue"
						aria-label="Favorito"
						variant="outline"
						bgColor="white"
						color={isFavorite ? "blue.400" : "blue.50"}
						border="0px"
						icon={<StarIcon />}
					/>
					<Spacer />
					<Menu>
						<EditContactMenu
							id={id}
							name={name}
							phone={phone}
							email={email}
							imgURL={imgURL}
							isFavorite={isFavorite}
						/>
					</Menu>
				</Flex>
			</CardHeader>
			<CardBody>
				<Container overflow="hidden" centerContent>
					<Avatar src={imgURL} name={name} size="2xl" mb={5} />
					<Heading size="md" mt={1} mb={1}>
						{name}
					</Heading>
					<Text fontSize="sm" mt={1}>
						{viewContact}
					</Text>
				</Container>
			</CardBody>
			<CardFooter
				justify="space-between"
				flexWrap="nowrap"
				sx={{
					"& > button": {
						minW: "136px",
					},
				}}
			>
				<IconButton
					colorScheme="blue"
					aria-label="Telefone"
					variant="outline"
					border="0px"
					icon={<PhoneIcon />}
					onClick={changePhone}
				/>
				<IconButton
					colorScheme="blue"
					aria-label="Telefone"
					variant="outline"
					border="0px"
					icon={<EmailIcon />}
					onClick={changeEmail}
				/>
			</CardFooter>
		</Card>
	);
};

export default ContactCard;
