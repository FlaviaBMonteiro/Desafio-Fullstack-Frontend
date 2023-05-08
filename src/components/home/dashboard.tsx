import { useUserContext } from "@/context/userContext";
import ContactCard from "../dashboard/contactCard";
import { Grid, Center, Container, Flex } from "@chakra-ui/react";
import { iHeaderProps } from "@/types/user.interface";

const Dashboard = () => {
	const { contacts } = useUserContext();
	return (
		<Flex justifyContent="center" gap="5">
			{contacts.map((contact, index) => (
				<ContactCard
					key={index}
					id={contact.id}
					email={contact.email}
					name={contact.name}
					phone={contact.phone}
					imgURL={contact.imgURL}
					isFavorite={contact.isFavorite}
				/>
			))}
		</Flex>
	);
};

export default Dashboard;
