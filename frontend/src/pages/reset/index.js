import React, { useState } from "react";
import classes from "./Reset.module.scss";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import Code from "./Code";
import ChangePassword from "./ChangePassword";

export default function Reset() {
	const [email, setEmail] = useState("");
	const [code, setCode] = useState();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassoword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState("");
	const [popupVisible, setPopupvisible] = useState(0);
	const [userInfos, setUserInfos] = useState();
	return (
		<div className={classes.reset}>
			<nav className={classes.reset__nav}>
				<div className={classes.reset__logo}>
					<img src={logo} alt='logo' className={classes.reset__logoImg} />
					<span className={classes.reset__logoName}>BeConnected</span>
				</div>
				<Link to='/login' className={classes.reset__login}>
					Login
				</Link>
			</nav>
			{popupVisible === 0 && (
				<SearchAccount
					setUserInfos={setUserInfos}
					setPopupvisible={setPopupvisible}
					email={email}
					setEmail={setEmail}
					error={error}
					setError={setError}
					loading={loading}
					setLoading={setLoading}
					setSuccess={setSuccess}
				/>
			)}
			{popupVisible === 1 && userInfos && (
				<SendEmail
					userInfos={userInfos}
					setPopupvisible={setPopupvisible}
					email={email}
					setEmail={setEmail}
					error={error}
					setError={setError}
					loading={loading}
					setLoading={setLoading}
				/>
			)}
			{popupVisible === 2 && (
				<Code
					userInfos={userInfos}
					setPopupvisible={setPopupvisible}
					email={email}
					setCode={setCode}
					code={code}
					setSuccess={setSuccess}
					error={error}
					setError={setError}
					loading={loading}
					setLoading={setLoading}
				/>
			)}
			{popupVisible === 3 && (
				<ChangePassword
					userInfos={userInfos}
					setPopupvisible={setPopupvisible}
					password={password}
					setPassword={setPassword}
					confirmPassword={confirmPassword}
					setConfirmPassword={setConfirmPassoword}
					error={error}
					setError={setError}
					loading={loading}
					setLoading={setLoading}
					setSuccess={setSuccess}
				/>
			)}
		</div>
	);
}
