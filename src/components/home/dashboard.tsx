interface IHeaderProps {
	email?: string
	token?: string
}

const Dashboard = ({ email, token }: IHeaderProps) => {
	return (
		<>
			<div>{token}</div>
			<div>{email}</div>
		</>
	)
}

export default Dashboard
