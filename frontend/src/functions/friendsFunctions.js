import axios from "axios";

export const addFriend = async (id, token) => {
	try {
		const { data } = await axios.patch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/addFriend/${id}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return "ok";
	} catch (err) {
		return err.response.data.message;
	}
};
export const cancelRequest = async (id, token) => {
	try {
		const { data } = await axios.patch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/cancelRequest/${id}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return "ok";
	} catch (err) {
		console.log(err);
		return err.response.data.message;
	}
};
export const follow = async (id, token) => {
	try {
		const { data } = await axios.patch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/follow/${id}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return "ok";
	} catch (err) {
		return err.response.data.message;
	}
};
export const unfollow = async (id, token) => {
	try {
		const { data } = await axios.patch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/unfollow/${id}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return "ok";
	} catch (err) {
		return err.response.data.message;
	}
};
export const acceptRequest = async (id, token) => {
	try {
		const { data } = await axios.patch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/acceptRequest/${id}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return "ok";
	} catch (err) {
		console.log(err);
		return err.response.data.message;
	}
};
export const unfriend = async (id, token) => {
	try {
		const { data } = await axios.patch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/unfriend/${id}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return "ok";
	} catch (err) {
		console.log(err);
		return err.response.data.message;
	}
};

export const deleteRequest = async (id, token) => {
	try {
		const { data } = await axios.patch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/deleteRequest/${id}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return "ok";
	} catch (err) {
		return err.response.data.message;
	}
};
