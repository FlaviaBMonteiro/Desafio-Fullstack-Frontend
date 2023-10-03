import { useUserContext } from "@/context/userContext";
import ContactCard from "../dashboard/contactCard";
import { Box, Flex } from "@chakra-ui/react";
import { parseCookies } from "nookies";

const Dashboard = () => {
	const { contacts } = useUserContext();

	return (
		<Flex justifyContent="center" gap="5">
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
				<p>Não há contatos</p>
			)}
		</Flex>
	);
};

export default Dashboard;
