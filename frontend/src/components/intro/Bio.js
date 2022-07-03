import React from "react";
import classes from "./Bio.module.scss";

export default function Bio({
	handleChange,
	max,
	setShowBio,
	updateDetails,
	placeholder,
	name,
	infos,
	detail,
	setShowTextarea,
	rel,
}) {
	return (
		<div className={classes.bio}>
			{rel ? (
				<select
					name={name}
					value={infos.relationship}
					onChange={handleChange}
					className={classes.bio__select}
				>
					<option value='Single'>Single</option>
					<option value='In relationship'>In relationship</option>
					<option value='Married'>Married</option>
					<option value='Divorced'>Divorced</option>
				</select>
			) : (
				<textarea
					name={name}
					className={classes.bio__textarea}
					placeholder={placeholder}
					value={infos?.[name]}
					onChange={handleChange}
					maxLength={100}
				></textarea>
			)}
			{!detail && (
				<span
					className={classes.bio__max}
				>{`${max} characters remaining`}</span>
			)}
			<div className={classes.bio__btns}>
				<button
					className={classes.bio__btn}
					onClick={() => (!detail ? setShowBio(false) : setShowTextarea(false))}
				>
					Cancel
				</button>
				<button
					className={classes.bio__btn}
					onClick={() => {
						updateDetails();
						setShowTextarea(false);
					}}
				>
					Save
				</button>
			</div>
		</div>
	);
}
