import { parseCookies } from "nookies";

export const getAuthData = () => {
	const cookies = parseCookies();
	const dataUser = cookies["KenzieToken"];
	return dataUser ? JSON.parse(decodeURIComponent(dataUser)) : null;
};

export const getBearer = () => {
	const authData = getAuthData();
	if (authData) {
		const { token } = authData;
		return {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
	}
	return null;
};
