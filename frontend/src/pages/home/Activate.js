import React, { useState, useEffect } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import classes from "./Activate.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Activate() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { token } = useParams();
	const { user } = useSelector((state) => ({ ...state }));

	const activateAccount = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/activate`,
				{ token },
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			setSuccess(data.message);
			setLoading(false);
			dispatch({ type: "VERIFY", payload: true });
			Cookie.set("user", JSON.stringify({ ...user, verified: true }));
			setTimeout(() => {
				navigate("/");
			}, 2000);
		} catch (err) {
			setLoading(false);
			setError(err.response.data.message);
		}
	};

	useEffect(() => {
		activateAccount();
	}, []);
	return (
		<div className={classes.backdrop}>
			<div className={classes.popup}>
				{success && <p className='success'>Account verification succeeded!</p>}
				{error && <p className='errorText'>Account verification failed!</p>}
				{loading && (
					<PropagateLoader
						color='#8F00FF'
						size={30}
						css={{ transform: "translate(-1rem, -1rem)" }}
					/>
				)}
			</div>
		</div>
	);
}
