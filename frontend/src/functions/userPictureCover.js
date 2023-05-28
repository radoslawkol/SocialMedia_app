import axios from "axios";

export const updatePicture = async (url, token) => {
	try {
		const { data } = await axios.patch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/updateProfilePicture`,
			{ url },
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

export const updateCover = async (url, token) => {
	try {
		const { data } = await axios.patch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/updateCover`,
			{ url },
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
