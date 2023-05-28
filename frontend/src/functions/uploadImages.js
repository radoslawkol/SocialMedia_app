import axios from "axios";

export const uploadImages = async (formData, path, token) => {
	try {
		const { data } = await axios.post(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BACKEND_URL}/api/v1/images`,
			formData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"content-type": "multipart/form-data",
				},
			}
		);
		return data;
	} catch (err) {
		return err.response.data.message;
	}
};
