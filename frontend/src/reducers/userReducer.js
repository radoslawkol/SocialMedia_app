import Cookie from "js-cookie";

const userReducer = (
	state = Cookie.get("user") ? JSON.parse(Cookie.get("user")) : null,
	action
) => {
	switch (action.type) {
		case "LOGIN":
			return action.payload;
		default:
			return state;
	}
};

export default userReducer;
