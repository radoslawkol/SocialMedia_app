import Cookie from "js-cookie";

const themeReducer = (
	state = Cookie.get("theme") ? JSON.parse(Cookie.get("theme")) : false,
	action
) => {
	switch (action.type) {
		case "DARK":
			return true;
		case "LIGHT":
			return false;

		default:
			return state;
	}
};

export default themeReducer;
