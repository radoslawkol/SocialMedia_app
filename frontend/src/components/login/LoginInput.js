/* eslint-disable react/prop-types */
import React from "react";
import { ErrorMessage, useField } from "formik";
import classes from "./LoginInput.module.scss";

export default function LoginInput({ placeholder, ...props }) {
	const [field, meta] = useField(props);
	return (
		<div className={classes.inputWrap}>
			<input
				className={`${classes.LoginInput} ${
					meta.touched && meta.error ? classes["LoginInput--error"] : ""
				} `}
				name={field.name}
				type={field.type}
				placeholder={placeholder}
				{...field}
				{...props}
			/>
			{meta.touched && meta.error && (
				<div className={classes.error_message}>
					{meta.touched && meta.error && <ErrorMessage name={field.name} />}
					<div className={classes.error_arrow}></div>
				</div>
			)}
		</div>
	);
}
