import axios from "axios";

export const search = async (searchTerm, token) => {
	try {
		const { data } = await axios.post(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/search/${searchTerm}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return data;
	} catch (err) {
		console.log(err);
		return err.response.data.message;
	}
};

export const addToSearchHistory = async (searchUser, token) => {
	try {
		const { data } = await axios.patch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/addToSearchHistory`,
			{ searchUser },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log(data);
		return data;
	} catch (err) {
		console.log(err);
		return err.response.data.message;
	}
};

export const getSearchHistory = async (token) => {
	try {
		const { data } = await axios.get(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/getSearchHistory`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log(data);
		return data;
	} catch (err) {
		console.log(err);
		return err.response.data.message;
	}
};
export const deleteFromHistory = async (searchUser, token) => {
	try {
		const { data } = await axios.patch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/deleteFromHistory`,
			{ searchUser },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log(data);
		return data;
	} catch (err) {
		console.log(err);
		return err.response.data.message;
	}
};
