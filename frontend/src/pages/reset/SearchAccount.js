import React from "react";
import classes from "./SearchAccount.module.scss";
import LoginInput from "../../components/login/LoginInput";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function SearchAccount({
	setEmail,
	email,
	error,
	setError,
	setLoading,
	setSuccess,
	setPopupvisible,
	setUserInfos,
}) {
	const validateEmail = Yup.object({
		email: Yup.string()
			.required("Email address is required.")
			.email("Invalid email address.")
			.max(100, "Email address can be above 100 charachters"),
	});
	const handleSearch = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/findUser`,
				{
					email,
				}
			);

			setUserInfos(data);
			setSuccess(data.message);
			setLoading(false);
			setPopupvisible(1);
			setError("");
		} catch (err) {
			setLoading(false);
			setError(err.response.data.message);
		}
	};
	return (
		<div className={classes.findModal}>
			<h2 className={classes.findModal__heading}>Find Your Account</h2>
			<hr />
			<p className={classes.findModal__text}>
				Please enter your email address to search for your account.
			</p>
			<Formik
				enableReinitialize
				initialValues={{
					email,
				}}
				validationSchema={validateEmail}
				onSubmit={handleSearch}
			>
				<Form className={classes.findModal__form}>
					<LoginInput
						placeholder='Email address'
						name='email'
						type='text'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<div className={classes.findModal__btns}>
						<Link to='/' className={classes.findModal__cancel}>
							Cancel
						</Link>
						<button type='submit' className={classes.findModal__search}>
							Search
						</button>
					</div>
				</Form>
			</Formik>
			{error && <div className='errorText'>{error}</div>}
		</div>
	);
}
