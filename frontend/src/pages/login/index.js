import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import classes from "./login.module.scss";
import LoginInput from "../../components/login/LoginInput";
import wave from "../../images/wave.svg";
import { Link } from "react-router-dom";
import image from "../../images/online_connection.svg";
import RegisterModal from "../../components/login/RegisterModal";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie";

const loginInfos = {
	email: "",
	password: "",
};

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [modalVisible, setModalVisible] = useState(false);
	const [login, setLogin] = useState(loginInfos);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const { email, password } = login;

	const showModalHandler = () => {
		setModalVisible(true);
	};

	const loginChangeHandler = (e) => {
		const { name, value } = e.target;
		setLogin({ ...login, [name]: value });
	};

	const loginSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email.")
			.required("Email is required.")
			.max(100, "Email can't be longer than 100 characters."),
		password: Yup.string().min(6).max(20).required("Password is required."),
	});

	const loginSubmit = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				// eslint-disable-next-line no-undef
				`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/login`,
				{
					email,
					password,
				}
			);
			if (data.status === "success") {
				dispatch({ type: "LOGIN", payload: { user: data.user } });
				Cookie.set("user", JSON.stringify({ user: data.user }));
				setTimeout(() => {
					navigate("/");
				}, 2000);
			}
		} catch (err) {
			setLoading(false);
			setError(err.response.data.message);
			setSuccess("");
		}
	};
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
					enableReinitialize
					initialValues={{
						email,
						password,
					}}
					validationSchema={loginSchema}
					onSubmit={() => {
						loginSubmit();
					}}
				>
					<Form className={classes.form}>
						<LoginInput
							name='email'
							type='email'
							value={email}
							placeholder='Email address'
							onChange={loginChangeHandler}
						></LoginInput>
						<LoginInput
							name='password'
							type='password'
							value={password}
							placeholder='Password'
							onChange={loginChangeHandler}
						></LoginInput>

						<button type='submit' className={`btn btn--purple`}>
							Log in
						</button>
					</Form>
				</Formik>
				<div style={{ textAlign: "center" }}>
					<Link to='/reset' className={classes.forgot}>
						Forgotten password?
					</Link>
				</div>
				<button
					className={`btn btn--green ${classes.createBtn}`}
					onClick={showModalHandler}
				>
					Create Acount
				</button>
				<div className='loader'>
					<BeatLoader size={10} color='#8f00ff' loading={loading}></BeatLoader>
				</div>
				{error && <div className='errorText'>{error}</div>}
				{success && <div className='success'>{success}</div>}
			</div>
			<img src={wave} alt='purple wave' className={classes.login__wave}></img>

			{modalVisible && (
				<RegisterModal
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
				/>
			)}
		</div>
	);
}
