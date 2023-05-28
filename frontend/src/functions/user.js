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

		return data;
	} catch (err) {
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

		return data;
	} catch (err) {
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

		return data;
	} catch (err) {
		return err.response.data.message;
	}
};
export const getFriendsInfos = async (slider = false, token) => {
	try {
		const { data } = await axios.get(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/getFriendsInfos?slider=${slider}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return data;
	} catch (err) {
		return err.response.data.message;
	}
};
export const getSavedPosts = async (id, token) => {
	try {
		const { data } = await axios.get(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/getSavedPosts/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return data;
	} catch (err) {
		return err.response.data.message;
	}
};
export const unsavePost = async (postId, userId, token) => {
	try {
		const { data } = await axios.patch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/unsavePost/${userId}`,
			{
				postId,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return data;
	} catch (err) {
		return err.response.data.message;
	}
};
