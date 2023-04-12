import { useUser } from "@/context/userContext"
import ContactCard from "../dashboard/contactCard"
import { Grid, Center, Container, Flex } from "@chakra-ui/react"
import { iHeaderProps } from "@/types/user.interface"

const Dashboard = ({ email, token }: iHeaderProps) => {
	const { contacts } = useUser()
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
	)
}

export default Dashboard
