import ContactCard from "../dashboard/contactCard";
import { Box, Center, Text } from "@chakra-ui/react";
import ModalRegisterContact from "../modal/modalRegisterContact";
import { useEffect } from "react";
import { useContactContext } from "@/context/contactContext";

const Dashboard = () => {
	const { contacts, setContacts, getContacts } = useContactContext();

	useEffect(() => {
		getContacts();
	}, [getContacts, setContacts]);

	return (
		<Box h="90vh" alignContent="center">
			<Box mb="2rem">
				<ModalRegisterContact />
			</Box>
			<Center gap="10" justifyContent="space-evenly">
				{contacts.length > 0 ? (
					contacts.map((contact, index) => (
						<ContactCard
							key={index}
							id={contact.id}
							email={contact.email}
							name={contact.name}
							phone={contact.phone}
							imgURL={contact.imgURL}
							isFavorite={contact.isFavorite}
						/>
					))
				) : (
					<Text mt="3rem">Não há contatos</Text>
				)}
			</Center>
		</Box>
	);
};

export default Dashboard;
