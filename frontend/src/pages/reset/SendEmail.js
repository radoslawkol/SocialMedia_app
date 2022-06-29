import React from "react";
import classes from "./SendEmail.module.scss";
import axios from "axios";

export default function SendEmail({
	setPopupvisible,
	userInfos,
	error,
	email,
	setError,
	loading,
	setLoading,
	setUserInfos,
}) {
	const sendEmailHandler = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				// eslint-disable-next-line no-undef
				`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/sendResetPasswordCode`,
				{ email }
			);
			setPopupvisible(2);
			setError("");
		} catch (err) {
			setLoading(false);
			setError(err.response.data.message);
		}
	};
	return (
		<div className={classes.sendEmail}>
			<h2 className={classes.sendEmail__heading}>Reset Your Password</h2>
			<hr />
			<div className={classes.sendEmail__content}>
				<div className={classes.sendEmail__left}>
					<p className={classes.sendEmail__text}>
						How do you want to receive the code to reset your password?
					</p>
					<label htmlFor='send' className={classes.sendEmail__label}>
						<input
							type='radio'
							className={classes.sendEmail__input}
							checked
							readOnly
						/>
						{`Send code via email ${userInfos.email}`}
					</label>
				</div>
				<div className={classes.sendEmail__right}>
					<div className={classes.sendEmail__user}>
						<img
							src={userInfos.picture}
							alt='user image'
							className={classes.sendEmail__img}
						/>
						<span className={classes.sendEmail__email}>{userInfos.email}</span>
						<span className={classes.sendEmail__name}>
							{userInfos.firstName} {userInfos.lastName}
						</span>
					</div>
				</div>
			</div>
			{error && <div className='errorText'>{error}</div>}
			<div className={classes.sendEmail__btns}>
				<button
					onClick={() => setPopupvisible(0)}
					className={`${classes.sendEmail__btn} ${classes["sendEmail__btn--grey"]}`}
				>
					Not you?
				</button>
				<button
					onClick={sendEmailHandler}
					className={`${classes.sendEmail__btn} ${classes["sendEmail__btn--confirm"]}`}
				>
					Confirm
				</button>
			</div>
		</div>
	);
}
