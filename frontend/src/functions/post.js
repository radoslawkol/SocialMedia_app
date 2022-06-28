import axios from "axios";

export const createPost = async (
	type,
	background,
	text,
	photos,
	user,
	token
) => {
	try {
		const { data } = await axios.post(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/posts`,
			{
				type,
				background,
				text,
				photos,
				user,
				token,
			},
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
