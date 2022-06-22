/* eslint-disable react/prop-types */
import React from "react";

import classes from "./LoginInput.module.scss";

export default function LoginInput({ name, type, placeholder }) {
	return (
		<input
			className={classes.LoginInput}
			name={name}
			type={type}
			placeholder={placeholder}
		/>
	);
}
