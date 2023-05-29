import axios from "axios";

export const createNotification = async (type, sender, receiver, token) => {
	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/notifications`,
			{
				type,
				sender,
				receiver,
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

export const getNotifications = async (token) => {
	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/notifications`,
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
export const updateNotification = async (id, token) => {
	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/notifications/${id}`,
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
