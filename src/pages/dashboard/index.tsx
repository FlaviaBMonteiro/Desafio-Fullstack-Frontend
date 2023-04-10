import { GetServerSideProps, NextPage } from "next"
import api from "@/services/api"
import { Grid, GridItem } from "@chakra-ui/react"
import { iContact } from "@/types/contact.interface"
import { iUser } from "@/types/user.interface"
import ContactCard from "@/components/dashboard/contactCard"

interface Props {
	contacts: iContact[]
}

const Dashboard: NextPage<Props> = ({ contacts }) => {
	return (
		<Grid templateColumns="repeat(5, 1fr)" gap={5}>
			{contacts.map((contact, index) => {
				return (
					<GridItem key={index}>
						<ContactCard
							id={contact.id}
							email={contact.email}
							name={contact.name}
							phone={contact.phone}
							imgURL={contact.imgURL}
							isFavorite={contact.isFavorite}
						/>
					</GridItem>
				)
			})}
		</Grid>
	)
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async () => {
	const response = await api.get("/contacts/users/1")
	const user: iUser = response.data
	const contacts: iContact[] = user.contacts
	console.log(contacts)

	return { props: { contacts } }
}
