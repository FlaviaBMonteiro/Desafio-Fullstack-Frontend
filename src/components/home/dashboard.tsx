import { useUser } from "@/context/userContext"
import ContactCard from "../dashboard/contactCard"
import { Grid, Center, Container, Flex } from "@chakra-ui/react"

interface IHeaderProps {
	email?: string
	token?: string
}

const Dashboard = ({ email, token }: IHeaderProps) => {
	const { user } = useUser()
	const { contacts } = useUser()
	return (
		<Flex justifyContent="center" gap="5">
			{contacts.map((contact, index) => (
				<ContactCard
					key={contact.id}
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
