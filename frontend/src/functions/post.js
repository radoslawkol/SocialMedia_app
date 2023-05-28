import axios from "axios";

export const createPost = async (
	type,
	background,
	text,
	photos,
	user,
	sharedFrom,
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
				sharedFrom,
				token,
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
export const reactPost = async (postId, react, token) => {
	try {
		const { data } = await axios.patch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/reacts`,
			{
				postId,
				react,
			},
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
export const getReacts = async (postId, token) => {
	try {
		const { data } = await axios.get(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/reacts/${postId}`,
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

export const comment = async (postId, comment, image, token) => {
	try {
		const commentAt = new Date();
		const { data } = await axios.patch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/posts/comment`,
			{ postId, comment, image, commentAt },
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
export const savePost = async (postId, token) => {
	try {
		const { data } = await axios.patch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/posts/save`,
			{ postId },
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
export const deletePost = async (postId, token) => {
	try {
		const { data } = await axios.delete(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/posts/${postId}`,
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
