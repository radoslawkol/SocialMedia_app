/* eslint-disable react/prop-types */
import { Formik, Form } from "formik";
import { useEffect, useState, useRef } from "react";
import React from "react";
import classes from "./RegisterModal.module.scss";
import LoginInput from "./LoginInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { useLinkClickHandler } from "react-router-dom";
import useclickOutsideClose from "../../functions/useClickOutsideClose";

const initialValues = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
	bDay: new Date().getDate(),
	bMonth: new Date().getMonth() + 1,
	bYear: new Date().getFullYear(),
	gender: "",
};

// eslint-disable-next-line no-unused-vars
export default function RegisterModal({ modalVisible, setModalVisible }) {
	const [register, setRegister] = useState(initialValues);
	const [dataError, setDataError] = useState("");
	const [genderError, setGenderError] = useState("");
	const formRef = useRef();

	useclickOutsideClose(formRef, () => setModalVisible(false));

	const {
		firstName,
		lastName,
		email,
		password,
		confirmPassword,
		bDay,
		bMonth,
		bYear,
		gender,
	} = register;

	const yearTemp = new Date().getFullYear();
	const years = Array.from(new Array(100), (val, i) => yearTemp - i);
	const months = Array.from(new Array(12), (val, i) => i + 1);
	const getDays = () => {
		return new Date(bYear, bMonth, 0).getDate();
	};
	const days = Array.from(new Array(getDays()), (val, i) => i + 1);

	const registerChangeHandler = (e) => {
		const { name, value } = e.target;
		setRegister({ ...register, [name]: value });
	};

	const registerSchema = Yup.object({
		firstName: Yup.string()
			.min(2, "Name must have min. 2 charachters")
			.max(20, "Name must have max. 20 charachters")
			.matches(/^[a-zA-Z]+$/, "Name must contain alphabetic charachters.")
			.required("First Name is required."),
		lastName: Yup.string()
			.min(2, "Surname must have min. 2 charachters")
			.max(20, "Surname must have max. 20 charachters")
			.matches(/^[a-zA-Z]+$/, "Surname must contain alphabetic charachters.")
			.required("Last Name is required."),
		email: Yup.string()
			.max(100, "Email can not be longer than 100 characters.")
			.required("Email is required.")
			.email("Email is invalid"),
		password: Yup.string()
			.min(6, "Password must be at least 6 charachters.")
			.max(20, "Passoword must be at most 20")
			.required("Password is required."),
		confirmPassword: Yup.string()
			.required("Confirm password is required.")
			.test("password-match", "Passwords must match.", function (value) {
				return this.parent.password === value;
			}),
	});
	return (
		<div className={classes.backdrop}>
			<div className={classes.register} ref={formRef}>
				<FontAwesomeIcon
					icon={faXmark}
					className={classes.register__close}
					onClick={() => setModalVisible(false)}
				></FontAwesomeIcon>
				<h2 className={classes.register__heading}>Sign Up</h2>
				<Formik
					className={classes.register__container}
					enableReinitialize
					initialValues={{
						firstName,
						lastName,
						email,
						password,
						confirmPassword,
						bDay,
						bMonth,
						bYear,
						gender,
					}}
					validationSchema={registerSchema}
					onSubmit={() => {
						setDataError("");
						setGenderError("");

						let currentDate = new Date();
						let pickedDate = new Date(bYear, bMonth - 1, bDay);
						let atLeast14 = new Date(1970 + 14, 0, 1);
						let AtMax70 = new Date(1970 + 70, 0, 1);

						if (currentDate - pickedDate < atLeast14) {
							console.log();
							setDataError("Please make sure you use your real date of birth.");
						} else if (currentDate - pickedDate > AtMax70) {
							setDataError("Please make sure you use your real date of birth.");
						} else if (gender === "") {
							setGenderError("Please choose your gender.");
						}
					}}
				>
					{(formik) => (
						<Form className={classes.register__form}>
							<div className={classes.register__inputs}>
								<LoginInput
									type='text'
									name='firstName'
									value={firstName}
									placeholder='First Name'
									onChange={registerChangeHandler}
								/>
								<LoginInput
									type='text'
									name='lastName'
									placeholder='Last Name'
									value={lastName}
									onChange={registerChangeHandler}
								/>
								<LoginInput
									type='email'
									name='email'
									value={email}
									placeholder='Email address'
									onChange={registerChangeHandler}
								/>
								<LoginInput
									type='password'
									name='password'
									value={password}
									placeholder='Password'
									onChange={registerChangeHandler}
								/>
								<LoginInput
									type='password'
									name='confirmPassword'
									value={confirmPassword}
									placeholder='Confirm Password'
									onChange={registerChangeHandler}
								/>
							</div>
							<h3 className={classes["register__title"]}>Date of birth:</h3>
							<div className={classes.register__birthday}>
								<select
									name='bDay'
									value={bDay}
									className={classes.register__select}
									onChange={registerChangeHandler}
								>
									{days.map((day, i) => {
										return (
											<option key={i} value={day}>
												{day}
											</option>
										);
									})}
								</select>
								<select
									name='bMonth'
									value={bMonth}
									className={classes.register__select}
									onChange={registerChangeHandler}
								>
									{months.map((month, i) => {
										return (
											<option key={i} value={month}>
												{month}
											</option>
										);
									})}
								</select>
								<select
									name='bYear'
									value={bYear}
									className={classes.register__select}
									onChange={registerChangeHandler}
								>
									{years.map((year, i) => {
										return (
											<option key={i} value={year}>
												{year}
											</option>
										);
									})}
								</select>
							</div>
							{dataError && (
								<div className={classes.register__error}>
									{dataError} <div className={classes.register__arrow}></div>
								</div>
							)}
							<h3 className={classes["register__title"]}>Gender:</h3>
							<div className={classes.register__gender}>
								<label htmlFor='male' className={classes.register__label}>
									Male
									<input
										type='radio'
										name='gender'
										id='male'
										value='male'
										className={classes.register__genderInput}
										onChange={registerChangeHandler}
									/>
								</label>
								<label htmlFor='female' className={classes.register__label}>
									Female
									<input
										type='radio'
										name='gender'
										id='female'
										value='female'
										className={classes.register__genderInput}
										onChange={registerChangeHandler}
									/>
								</label>
								<label htmlFor='custom' className={classes.register__label}>
									Custom
									<input
										type='radio'
										name='gender'
										id='custom'
										value='custom'
										className={classes.register__genderInput}
										onChange={registerChangeHandler}
									/>
								</label>
							</div>
							{genderError && (
								<div className={classes.register__error}>
									{genderError} <div className={classes.register__arrow}></div>
								</div>
							)}
							<p className={classes.register__policy}>
								By clicking Sign Up, you agree to our Terms, Data Policy and
								Cookie Policy. You may receive SMS notifications from us and can
								opt out at any time.
							</p>
							<button
								type='submit'
								className={`btn btn--green ${classes.register__btn}`}
							>
								Sign Up
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
