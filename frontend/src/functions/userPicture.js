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
		console.log(err);
		return err.response.data.message;
	}
};
