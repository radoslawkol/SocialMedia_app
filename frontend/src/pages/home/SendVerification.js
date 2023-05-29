import React, { useState } from "react";
import classes from "./SendVerification.module.scss";
import axios from "axios";

export default function SendVerification({ user }) {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const sendVerificationLink = async () => {
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/sendVerification`,
				{},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			setSuccess(data.message);
		} catch (err) {
			setError(err.response.data.message);
		}
	};
	return (
		<div className={classes.send}>
			<span className={classes.send__text}>
				Your account is not verified, verify your account before it gets deleted
				after a month from creating.
			</span>
			<a className={classes.send__link} onClick={sendVerificationLink}>
				Click here to resend verification link
			</a>
			{success && (
				<div
					className='success'
					style={{ fontSize: "1.2rem", margin: ".5rem 0" }}
				>
					{success}
				</div>
			)}
			{error && (
				<div
					className='errorText'
					style={{ fontSize: "1.2rem", margin: ".5rem 0" }}
				>
					{error}
				</div>
			)}
		</div>
	);
}
