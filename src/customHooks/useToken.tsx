import { useState } from 'react';

type Token = {
	token: string;
	email: string;
};

export const useToken = () => {
	const getToken = (): Token | null => {
		const tokenString = sessionStorage.getItem('token');
		if (tokenString) {
			const tokenData = JSON.parse(tokenString);
			return tokenData;
		}
		return null;
	};

	const [token, setToken] = useState(getToken());
	const saveToken = (userToken: Token) => {
		sessionStorage.setItem('token', JSON.stringify(userToken));
		setToken(userToken);
	};
	return {
		token,
		setToken: saveToken,
	};
};
