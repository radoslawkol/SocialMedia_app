import axios from "axios";

export const getConversations = async (userId, token) => {
	try {
		const { data } = await axios.get(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/conversations/${userId}`,

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
export const createConversation = async (senderId, receiverId, token) => {
	try {
		const { data } = await axios.post(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/conversations`,
			{ senderId, receiverId },
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

export const getMessages = async (conversationId, token) => {
	try {
		const { data } = await axios.get(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/messages/${conversationId}`,

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
export const createMessage = async (conversationId, text, sender, token) => {
	try {
		const { data } = await axios.post(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/messages`,
			{ conversationId, sender, text },
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
