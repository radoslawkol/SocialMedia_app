import React from "react";
import classes from "./ChangePassword.module.scss";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/login/LoginInput";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChangePassword({
	password,
	confirmPassword,
	setPassword,
	setConfirmPassword,
	setError,
	setLoading,
	loading,
	userInfos,
	email,
}) {
	const navigate = useNavigate();
	const validatePassord = Yup.object({
		password: Yup.string()
			.required("Passwor is required.")
			.min(6, "Password must have min. 6 charachters.")
			.max(20, "Password must have min. 20 charachters."),
		confirmPassword: Yup.string()
			.required("Password is required.")
			.min(6, "Password must have min. 6 charachters.")
			.max(20, "Password must have min. 20 charachters.")
			.oneOf([Yup.ref("password")], "Password must match."),
	});
	const changePassword = async () => {
		try {
			setLoading(true);
			const { data } = axios.post(
				`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/changePassword`,
				{
					email: userInfos.email,
					password,
				}
			);
			setLoading(false);
			setError("");
			navigate("/");
		} catch (err) {
			setLoading(false);
			setError(err.response.data.message);
		}
	};
	return (
		<div className={classes.changePassword}>
			<h2 className={classes.changePassword__heading}>Change Password</h2>
			<hr />
			<p className={classes.changePassword__text}>
				Please enter the changePassword that had been sent to your email.
			</p>
			<Formik
				enableReinitialize
				initialValues={{
					password,
					confirmPassword,
				}}
				validationSchema={validatePassord}
				onSubmit={changePassword}
			>
				<Form>
					<LoginInput
						name='password'
						type='password'
						value={password}
						placeholder='New password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<LoginInput
						style={{ marginTop: "1.5rem" }}
						name='confirmPassword'
						type='password'
						value={confirmPassword}
						placeholder='Confirm password'
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<div className={classes.changePassword__btns}>
						<Link to='/' className={classes.changePassword__cancel}>
							Cancel
						</Link>
						<button type='submit' className={classes.changePassword__continue}>
							Continue
						</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
}
