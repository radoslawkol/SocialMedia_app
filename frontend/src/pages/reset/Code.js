import React, { useState } from "react";
import classes from "./Code.module.scss";
import LoginInput from "../../components/login/LoginInput";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export default function Code({
	userInfos,
	code,
	setCode,
	setLoading,
	setError,
	setSuccess,
	email,
	error,
	setPopupvisible,
}) {
	const validateCode = Yup.object({
		code: Yup.string()
			.required("Code is required.")
			.min(5, "Code must be 5 charachters.")
			.max(5, "Code must be 5 charachters."),
	});

	const verifyCode = async () => {
		try {
			setLoading(true);

			const { data } = await axios.post(
				// eslint-disable-next-line no-undef
				`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/validateResetCode`,
				{
					email: userInfos.email,
					code,
				}
			);

			setLoading(false);
			setError(false);
			setSuccess(data.status);
			setPopupvisible(3);
		} catch (err) {
			console.log(err);
			setLoading(false);
			setError(err.response.data.message);
		}
	};
	return (
		<div className={classes.code}>
			<h2 className={classes.code__heading}>Code verification</h2>
			<hr />
			<p className={classes.code__text}>
				Please enter the code that had been sent to your email.
			</p>
			<Formik
				enableReinitialize
				initialValues={{
					code,
				}}
				validationSchema={validateCode}
				onSubmit={verifyCode}
			>
				<Form>
					<LoginInput
						name='code'
						type='text'
						placeholder='Code'
						value={code}
						onChange={(e) => setCode(e.target.value)}
					/>
					{error && <div className='errorText'>{error}</div>}
					<div className={classes.code__btns}>
						<Link to='/' className={classes.code__cancel}>
							Cancel
						</Link>
						<button type='submit' className={classes.code__continue}>
							Continue
						</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
}
