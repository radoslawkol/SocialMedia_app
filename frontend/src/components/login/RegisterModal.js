/* eslint-disable react/prop-types */
import { Formik, Form } from "formik";
import React from "react";
import classes from "./RegisterModal.module.scss";
import LoginInput from "./LoginInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line no-unused-vars
export default function RegisterModal({ modalVisible, setModalVisible }) {
	const changeHandler = () => {};
	return (
		<div className={classes.backdrop}>
			<div className={classes.register}>
				<FontAwesomeIcon
					icon={faXmark}
					className={classes.register__close}
					onClick={() => setModalVisible(false)}
				></FontAwesomeIcon>
				<h2 className={classes.register__heading}>Sign Up</h2>
				<Formik className={classes.register__container}>
					<Form className={classes.register__form}>
						<div className={classes.register__inputs}>
							<LoginInput
								type='text'
								name='firstName'
								placeholder='First Name'
							/>
							<LoginInput type='text' name='lastName' placeholder='Last Name' />
							<LoginInput
								type='email'
								name='email'
								placeholder='Email address'
							/>
							<LoginInput
								type='password'
								name='password'
								placeholder='Password'
							/>
							<LoginInput
								type='password'
								name='confirmPassword'
								placeholder='Confirm Password'
							/>
						</div>
						<h3 className={classes["register__title"]}>Date of birth:</h3>
						<div className={classes.register__birthday}>
							<select
								name='day'
								value={15}
								className={classes.register__select}
								onChange={changeHandler}
							>
								<option value={15}>15</option>
							</select>
							<select
								name='month'
								value={6}
								className={classes.register__select}
								onChange={changeHandler}
							>
								<option value={6}>6</option>
							</select>
							<select
								name='year'
								value={2022}
								className={classes.register__select}
								onChange={changeHandler}
							>
								<option value={2022}>2022</option>
							</select>
						</div>
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
								/>
							</label>
						</div>
					</Form>
				</Formik>
				<p className={classes.register__policy}>
					By clicking Sign Up, you agree to our Terms, Data Policy and Cookie
					Policy. You may receive SMS notifications from us and can opt out at
					any time.
				</p>
				<button className={`btn btn--green ${classes.register__btn}`}>
					Sign Up
				</button>
			</div>
		</div>
	);
}
