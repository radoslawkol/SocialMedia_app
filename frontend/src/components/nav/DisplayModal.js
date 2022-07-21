import React from "react";
import classes from "./DisplayModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";

export default function DisplayModal({ setDisplayModal }) {
	const dispatch = useDispatch();
	const { theme } = useSelector((state) => ({ ...state }));
	return (
		<div className={classes.modal}>
			<FontAwesomeIcon
				onClick={() => setDisplayModal()}
				icon={faArrowLeft}
				className={classes.modal__icon}
			></FontAwesomeIcon>
			<h2 className={classes.modal__heading}>Display mode</h2>
			<div className={classes.modal__mode}>
				<h3 className={classes.modal__modeText}>Dark Mode</h3>
				<p className={classes.modal__text}>
					Adjust the appearance of BeConnected to reduce glare and give your
					eyes a break.
				</p>
				<div className={classes.modal__options}>
					<label
						htmlFor='off'
						className={classes.modal__label}
						onClick={() => {
							dispatch({ type: "LIGHT" });
							Cookie.set("theme", false);
						}}
					>
						Off
						<input
							type='radio'
							name='display'
							checked={theme ? "" : true}
							id='off'
							className={classes.modal__input}
						/>
					</label>
					<label
						htmlFor='on'
						className={classes.modal__label}
						onClick={() => {
							dispatch({ type: "DARK" });
							Cookie.set("theme", true);
						}}
					>
						On
						<input
							type='radio'
							name='display'
							checked={theme}
							id='on'
							className={classes.modal__input}
						/>
					</label>
				</div>
			</div>
		</div>
	);
}
