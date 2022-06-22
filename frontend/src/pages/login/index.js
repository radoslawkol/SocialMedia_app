import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import classes from "./login.module.scss";
import LoginInput from "../../components/login/LoginInput";
import wave from "../../images/wave.svg";
import { Link } from "react-router-dom";
import image from "../../images/online_connection.svg";

export default function Login() {
	return (
		<div className={classes.login}>
			<div className={classes["login__left-side"]}>
				<div className={classes["login__content"]}>
					<div>
						<img src='' alt='' className={classes.login__logo}></img>
						<h1 className={classes["login__heading"]}>BeConnected</h1>
					</div>
					<p className={classes["login__text"]}>
						Be in touch with your friends and share your life.
					</p>
				</div>
				<img src={image} alt='connection' className={classes.login__image} />
			</div>
			<div className={classes.formContainer}>
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
				>
					<Form className={classes.form}>
						<LoginInput
							name='email'
							type='email'
							placeholder='Email address'
						></LoginInput>
						<LoginInput
							name='password'
							type='password'
							placeholder='Password'
						></LoginInput>

						<button className={`btn btn--purple`}>Log in</button>
					</Form>
				</Formik>
				<div style={{ textAlign: "center" }}>
					<Link to='/forgot' className={classes.forgot}>
						Forgotten password?
					</Link>
				</div>
				<button className={`btn btn--green ${classes.createBtn}`}>
					Create Acount
				</button>
			</div>
			<img src={wave} alt='purple wave' className={classes.login__wave}></img>
		</div>
	);
}
